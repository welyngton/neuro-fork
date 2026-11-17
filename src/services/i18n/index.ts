/**
 * @module services/i18n
 *
 * Traduções do jogo. Uso: `t('menu.start')` ou `t('opt.music', { v: 50 })`.
 *
 * Os dicionários ficam em `pt.ts` e `en.ts`. Para adicionar um idioma: crie um
 * arquivo com as mesmas chaves de `pt.ts`, registre em `DICTS` e inclua o
 * código em {@link LOCALES}. Chaves ausentes num idioma caem para pt-BR;
 * ausentes em ambos mostram a própria chave.
 */
import { EN } from './en';
import { PT } from './pt';

export type Locale = 'pt-BR' | 'en';
export const LOCALES: Locale[] = ['pt-BR', 'en'];

export type Dict = Record<string, string>;

const DICTS: Record<Locale, Dict> = { 'pt-BR': PT, en: EN };

let current: Locale = 'pt-BR';

/** Define o idioma ativo (as cenas devem ser recriadas para refletir a troca). */
export function setLocale(l: Locale): void {
  current = l;
  if (typeof document !== 'undefined') document.documentElement.lang = l;
}

export function getLocale(): Locale {
  return current;
}

/** Traduz uma chave, substituindo `{nome}` pelos valores de `vars`. */
export function t(key: string, vars?: Record<string, string | number>): string {
  let s = DICTS[current][key] ?? PT[key] ?? key;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
}
