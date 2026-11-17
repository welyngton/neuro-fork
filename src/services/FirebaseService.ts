/**
 * @module services/FirebaseService
 *
 * Integração com Firebase: login com Google, progresso no Firestore e Analytics.
 *
 * - Só liga se as variáveis `VITE_FIREBASE_*` existirem (produção: `.env.production`;
 *   desenvolvimento: `.env.local`). Sem elas, `enabled` é `false` e o jogo roda
 *   offline com localStorage.
 * - O SDK é carregado por `import()` dinâmico logo na abertura ({@link init}),
 *   para que o clique em "Entrar com Google" já encontre tudo pronto — navegadores
 *   bloqueiam o popup se houver demora entre o clique e a abertura.
 * - Firestore: um documento por jogador em `usuarios/{uid}` com
 *   `nome`, `email`, `fotoUrl`, `atualizadoEm` e `progresso` (o save do jogo).
 *   As regras estão em `firestore.rules`.
 *
 * Para trocar de backend, implemente {@link CloudBackend} e injete em `app/services.ts`.
 */
import type { Analytics } from 'firebase/analytics';
import type { Auth, User } from 'firebase/auth';
import type { Firestore } from 'firebase/firestore';
import type { SaveData } from '../state/GameState';

/** Jogador autenticado, no formato que a UI precisa. */
export interface CloudUser {
  uid: string;
  name: string;
}

/** Contrato mínimo de um backend de nuvem para o jogo. */
export interface CloudBackend {
  readonly enabled: boolean;
  /** Jogador logado (null = ninguém). */
  readonly user: CloudUser | null;
  /** Carrega o SDK e passa a observar o login. `onUser` é chamado a cada entrada/saída. */
  init(onUser: (user: CloudUser | null) => void): Promise<boolean>;
  /** Abre o login. Deve ser chamado a partir de um clique/toque. */
  signIn(): Promise<void>;
  signOut(): Promise<void>;
  loadSave(): Promise<SaveData | null>;
  pushSave(save: SaveData): Promise<void>;
  /** Envia um evento de analytics (no-op se indisponível). */
  logEvent(name: string, params: Record<string, string | number | boolean>): void;
}

const env = import.meta.env;

/** Lê a configuração do ambiente. Retorna `null` se não houver chave real. */
export function readFirebaseConfig() {
  const apiKey = env?.VITE_FIREBASE_API_KEY as string | undefined;
  if (!apiKey || apiKey.startsWith('your-')) return null;
  return {
    apiKey,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN as string,
    projectId: env.VITE_FIREBASE_PROJECT_ID as string,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID as string,
    appId: env.VITE_FIREBASE_APP_ID as string,
    measurementId: env.VITE_FIREBASE_MEASUREMENT_ID as string | undefined,
  };
}

/** Não coletamos analytics nem abrimos a nuvem de produção a partir de localhost. */
export const isLocalhost = () => typeof location !== 'undefined' && /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);

export class FirebaseService implements CloudBackend {
  private config = readFirebaseConfig();
  private auth: Auth | null = null;
  private db: Firestore | null = null;
  private analytics: Analytics | null = null;
  private authMod: typeof import('firebase/auth') | null = null;
  private fsMod: typeof import('firebase/firestore') | null = null;
  private logFn: ((a: Analytics, name: string, params: Record<string, unknown>) => void) | null = null;
  private current: User | null = null;

  get enabled(): boolean {
    return this.config !== null;
  }

  get user(): CloudUser | null {
    return this.current ? { uid: this.current.uid, name: this.current.displayName ?? this.current.email ?? 'Jogador' } : null;
  }

  async init(onUser: (user: CloudUser | null) => void): Promise<boolean> {
    if (!this.config) return false;
    try {
      const [{ initializeApp }, auth, fs] = await Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
        import('firebase/firestore'),
      ]);
      const app = initializeApp(this.config);
      this.authMod = auth;
      this.fsMod = fs;
      this.auth = auth.getAuth(app);
      this.db = fs.getFirestore(app);
      if (env.VITE_USE_FIREBASE_EMULATOR === 'true' && env.DEV) {
        auth.connectAuthEmulator(this.auth, `http://${env.VITE_FIREBASE_AUTH_EMULATOR_HOST ?? 'localhost:9099'}`, { disableWarnings: true });
        const [host, port] = String(env.VITE_FIRESTORE_EMULATOR_HOST ?? 'localhost:8080').split(':');
        fs.connectFirestoreEmulator(this.db, host, Number(port));
      }
      auth.onAuthStateChanged(this.auth, (u) => {
        this.current = u;
        if (u) void this.registerUser(u).catch((err) => console.warn('[firebase] cadastro falhou:', err));
        onUser(this.user);
      });

      // Firebase Analytics (GA4) — fora de localhost e se o navegador suportar.
      if (this.config.measurementId && !isLocalhost()) {
        const ga = await import('firebase/analytics');
        if (await ga.isSupported()) {
          this.analytics = ga.getAnalytics(app);
          this.logFn = ga.logEvent as typeof this.logFn;
        }
      }
      return true;
    } catch (err) {
      console.warn('[firebase] indisponível, seguindo offline:', err);
      this.auth = this.db = null;
      return false;
    }
  }

  async signIn(): Promise<void> {
    if (!this.auth || !this.authMod) throw new Error('Firebase indisponível');
    await this.authMod.signInWithPopup(this.auth, new this.authMod.GoogleAuthProvider());
  }

  async signOut(): Promise<void> {
    if (this.auth && this.authMod) await this.authMod.signOut(this.auth);
  }

  private ref() {
    if (!this.db || !this.fsMod || !this.current) return null;
    return this.fsMod.doc(this.db, 'usuarios', this.current.uid);
  }

  /** Cria/atualiza o cadastro do jogador (merge: não apaga o progresso já salvo). */
  private async registerUser(user: User): Promise<void> {
    const ref = this.ref();
    if (!ref || !this.fsMod) return;
    await this.fsMod.setDoc(
      ref,
      { nome: user.displayName, email: user.email, fotoUrl: user.photoURL, atualizadoEm: new Date() },
      { merge: true },
    );
  }

  async loadSave(): Promise<SaveData | null> {
    const ref = this.ref();
    if (!ref || !this.fsMod) return null;
    const snap = await this.fsMod.getDoc(ref);
    return (snap.data()?.progresso as SaveData | undefined) ?? null;
  }

  async pushSave(save: SaveData): Promise<void> {
    const ref = this.ref();
    if (!ref || !this.fsMod) return;
    await this.fsMod.setDoc(ref, { progresso: save, atualizadoEm: new Date() }, { merge: true });
  }

  logEvent(name: string, params: Record<string, string | number | boolean>): void {
    if (this.analytics && this.logFn) this.logFn(this.analytics, name, params);
  }
}
