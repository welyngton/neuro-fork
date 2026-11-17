/**
 * @module services/googleTag
 *
 * Google Analytics 4 (gtag.js) e Google Tag Manager, carregados por código.
 *
 * Ids vêm do ambiente (`.env.production`):
 *  - `VITE_GA_MEASUREMENT_ID` — fluxo web do GA4 (ex.: G-BNYB6G6MKG);
 *  - `VITE_GTM_ID`            — contêiner do Tag Manager (ex.: GTM-K4LDJ39L).
 *
 * Nada é carregado em localhost nem quando os ids não existem, então o
 * desenvolvimento não suja as métricas. Bloqueadores de anúncio podem impedir
 * o carregamento — o jogo segue normalmente.
 */
import { isLocalhost } from './FirebaseService';

type Gtag = (...args: unknown[]) => void;
type TagWindow = Window & { dataLayer?: unknown[]; gtag?: Gtag };

function loadScript(src: string): void {
  const s = document.createElement('script');
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Instala as tags. Chamar uma vez, na inicialização. */
export function installGoogleTag(): void {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  const gtmId = import.meta.env.VITE_GTM_ID as string | undefined;
  if (isLocalhost() || (!gaId && !gtmId)) return;

  const w = window as TagWindow;
  w.dataLayer = w.dataLayer || [];
  // O gtag precisa empilhar o objeto `arguments` (não um array) para o Google reconhecer.
  w.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  };
  w.gtag('js', new Date());

  if (gtmId) {
    w.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    loadScript(`https://www.googletagmanager.com/gtm.js?id=${gtmId}`);
  }
  if (gaId) {
    w.gtag('config', gaId);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${gaId}`);
  }
}

/** Envia um evento ao GA4 (no-op se a tag não foi instalada). */
export function gtagEvent(name: string, params: Record<string, string | number | boolean>): void {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  const w = window as TagWindow;
  if (typeof window !== 'undefined' && w.gtag && gaId) w.gtag('event', name, { ...params, send_to: gaId });
}
