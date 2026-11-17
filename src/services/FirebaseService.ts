/**
 * @module services/FirebaseService
 *
 * Integração OPCIONAL com Firebase (Auth anônimo + Firestore + Analytics).
 *
 * - Só liga se as variáveis `VITE_FIREBASE_*` estiverem definidas (ver `.env.example`).
 *   Sem elas, `enabled` é `false` e o jogo roda 100% offline com localStorage.
 * - O SDK é carregado por `import()` dinâmico: quem joga offline não baixa o Firebase.
 * - Estrutura no Firestore: `users/{uid}/saves/main` (coberta por `firestore.rules`).
 *
 * Para trocar de backend, implemente a interface {@link CloudBackend} e injete
 * a nova classe em `app/services.ts`.
 */
import type { Analytics } from 'firebase/analytics';
import type { Firestore } from 'firebase/firestore';
import type { SaveData } from '../state/GameState';

/** Contrato mínimo de um backend de nuvem para o jogo. */
export interface CloudBackend {
  readonly enabled: boolean;
  /** Inicializa e autentica. Resolve `true` se a nuvem ficou disponível. */
  init(): Promise<boolean>;
  loadSave(): Promise<SaveData | null>;
  pushSave(save: SaveData): Promise<void>;
  /** Envia um evento de analytics (no-op se indisponível). */
  logEvent(name: string, params: Record<string, string | number | boolean>): void;
}

const env = import.meta.env;

/** Lê a configuração do `.env`. Retorna `null` se não houver chave real. */
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

export class FirebaseService implements CloudBackend {
  private config = readFirebaseConfig();
  private db: Firestore | null = null;
  private analytics: Analytics | null = null;
  private uid: string | null = null;
  private logFn: ((a: Analytics, name: string, params: Record<string, unknown>) => void) | null = null;

  get enabled(): boolean {
    return this.config !== null;
  }

  async init(): Promise<boolean> {
    if (!this.config) return false;
    try {
      const [{ initializeApp }, auth, fs] = await Promise.all([
        import('firebase/app'),
        import('firebase/auth'),
        import('firebase/firestore'),
      ]);
      const app = initializeApp(this.config);
      const a = auth.getAuth(app);
      this.db = fs.getFirestore(app);
      if (env.VITE_USE_FIREBASE_EMULATOR === 'true' && env.DEV) {
        auth.connectAuthEmulator(a, `http://${env.VITE_FIREBASE_AUTH_EMULATOR_HOST ?? 'localhost:9099'}`, { disableWarnings: true });
        const [host, port] = String(env.VITE_FIRESTORE_EMULATOR_HOST ?? 'localhost:8080').split(':');
        fs.connectFirestoreEmulator(this.db, host, Number(port));
      }
      this.uid = (await auth.signInAnonymously(a)).user.uid;

      // Google Analytics 4 — só em produção e se o navegador suportar.
      if (this.config.measurementId && env.PROD) {
        const ga = await import('firebase/analytics');
        if (await ga.isSupported()) {
          this.analytics = ga.getAnalytics(app);
          this.logFn = ga.logEvent as typeof this.logFn;
        }
      }
      return true;
    } catch (err) {
      console.warn('[firebase] indisponível, seguindo offline:', err);
      this.db = null;
      return false;
    }
  }

  private async ref() {
    if (!this.db || !this.uid) return null;
    const { doc } = await import('firebase/firestore');
    return doc(this.db, 'users', this.uid, 'saves', 'main');
  }

  async loadSave(): Promise<SaveData | null> {
    const ref = await this.ref();
    if (!ref) return null;
    const { getDoc } = await import('firebase/firestore');
    const snap = await getDoc(ref);
    return snap.exists() ? (snap.data() as SaveData) : null;
  }

  async pushSave(save: SaveData): Promise<void> {
    const ref = await this.ref();
    if (!ref) return;
    const { setDoc } = await import('firebase/firestore');
    await setDoc(ref, save);
  }

  logEvent(name: string, params: Record<string, string | number | boolean>): void {
    if (this.analytics && this.logFn) this.logFn(this.analytics, name, params);
  }
}
