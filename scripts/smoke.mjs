/**
 * Teste de fumaça: abre o jogo num Chrome headless e joga as 12 missões de
 * ponta a ponta com a solução de referência de cada uma (comprando os upgrades
 * que ela exige), além de visitar loja, avatar, conquistas, cartas e lentes.
 * Salva capturas em ./screenshots e falha se houver erro no console.
 *
 * Uso: npm run build && npx vite preview --port 4173 &  node scripts/smoke.mjs
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const URL = process.env.URL ?? 'http://localhost:4173/';
const OUT = process.env.OUT ?? 'screenshots';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch({ executablePath: process.env.CHROME ?? '/usr/bin/google-chrome', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });
const errors = [];

async function open(width, height) {
  const page = await browser.newPage({ viewport: { width, height }, locale: 'pt-BR' });
  page.on('console', (m) => m.type() === 'error' && !/firebase|googleapis|ERR_/i.test(m.text()) && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL);
  await page.waitForFunction(() => window.__game?.scene.isActive('Menu'));
  await page.waitForTimeout(700);
  return page;
}
const active = (page, key) => page.waitForFunction((k) => window.__game.scene.isActive(k), key);
const shot = (page, name) => page.screenshot({ path: `${OUT}/${name}.png` });
/** Troca de cena a partir de qualquer cena ativa. */
const goto = async (page, key, data) => {
  await page.evaluate(([k, d]) => { const g = window.__game; g.scene.getScenes(true)[0].scene.start(k, d); }, [key, data]);
  await active(page, key);
  await page.waitForTimeout(450);
};

const page = await open(1280, 720);
await shot(page, '01-menu');

// Edição manual no Design (arrastar cabo, criar neurônio, toque-toque, borracha).
await goto(page, 'Design', { missionId: 'bercario' });
{
  const info = () => page.evaluate(() => { const s = window.__game.scene.getScene('Design'); return { a: s.view.posOf('cantos'), b: s.view.posOf('buraco_b'), h: s.view.posOf('h0_0'), links: s.board.links.length, neuron: s.board.hidden[0][0] }; });
  const p = await info();
  await page.mouse.move(p.a.x, p.a.y); await page.mouse.down(); await page.mouse.move((p.a.x + p.b.x) / 2, p.a.y + 40, { steps: 4 }); await page.mouse.move(p.b.x, p.b.y, { steps: 4 }); await page.mouse.up();
  await page.mouse.click(p.h.x, p.h.y);
  let q = await info();
  if (q.links !== 1 || !q.neuron) throw new Error('arrastar cabo / criar neurônio falhou: ' + JSON.stringify(q));
  await page.mouse.click(p.h.x, p.h.y); await page.mouse.click(p.b.x, p.b.y);
  q = await info();
  if (q.links !== 2) throw new Error('toque-toque falhou');
  await page.waitForTimeout(600);
  await shot(page, '02-design-dicas');
  await page.keyboard.press('3'); await page.mouse.click(p.h.x, p.h.y); await page.keyboard.press('1');
  q = await info();
  if (q.links !== 1 || q.neuron) throw new Error('borracha falhou: ' + JSON.stringify(q));
  console.log('edição manual ok');
}

const ids = await page.evaluate(() => window.__neuro.MISSIONS.map((m) => m.id));
for (const id of ids) {
  // Monta a solução de referência direto no save (compra os upgrades que ela pede).
  const need = await page.evaluate((id) => {
    const { state, MISSIONS } = window.__neuro;
    const m = MISSIONS.find((x) => x.id === id);
    const missing = (m.reference.needs ?? []).filter((u) => !state.upgrades.includes(u) && !state.buy(u));
    const d = state.design(id);
    const t = m.reference.topology;
    d.board.hidden = d.board.hidden.map((col, c) => col.map((_, r) => !!t.hidden[c]?.[r]));
    d.board.links = t.links.map((l) => [...l]);
    state.saveDesign(id, { board: d.board, params: null, seed: 1, hyper: { ...m.defaults, ...m.reference.hyper }, earlyStop: !!m.reference.earlyStop });
    return missing;
  }, id);
  if (need.length) throw new Error(`${id}: sem estrelas para ${need}`);
  let stars = 0;
  for (let attempt = 1; attempt <= 8 && stars < 2; attempt++) {
    await goto(page, 'Design', { missionId: id });
    if (attempt === 1) await shot(page, `03-design-${id}`);
    await goto(page, 'Train', { missionId: id });
    await page.mouse.click(640, 668); // TREINAR
    await page.waitForFunction(() => { const s = window.__game.scene.getScene('Train'); return !s.running && s.trainer.epoch > 0; }, null, { timeout: 180000 });
    await page.waitForTimeout(400);
    if (attempt === 1) await shot(page, `04-train-${id}`);
    if (id === 'quadrantes' && attempt === 1) {
      await page.evaluate(() => window.__game.scene.getScene('Train').setLens('boundary'));
      await page.waitForTimeout(500); await shot(page, '04b-lente-fronteira');
      await page.evaluate(() => window.__game.scene.getScene('Train').setLens('space'));
      await page.waitForTimeout(500); await shot(page, '04c-lente-espaco');
      await page.evaluate(() => window.__game.scene.getScene('Train').openCards());
      await page.waitForTimeout(500); await shot(page, '04d-cartas');
    }
    await goto(page, 'Simulation', { missionId: id });
    await page.waitForTimeout(1800);
    if (attempt === 1) await shot(page, `05-sim-${id}`);
    await page.mouse.click(1200, 677); // PULAR
    await page.waitForFunction(() => window.__game.scene.getScene('Simulation').children.list.some((o) => o.depth === 2000), null, { timeout: 240000 });
    await page.waitForTimeout(1600);
    stars = await page.evaluate((id) => window.__neuro.state.stars(id), id);
    if (stars < 2) await page.evaluate((id) => { const s = window.__neuro.state; s.saveDesign(id, { seed: s.design(id).seed + 1, params: null }); }, id);
    else await shot(page, `06-result-${id}`);
  }
  console.log(id.padEnd(11), 'estrelas:', stars);
  if (!stars) throw new Error(`${id}: não venceu em 8 tentativas`);
}

await goto(page, 'Menu'); await page.waitForTimeout(600); await shot(page, '07-menu-final');
await goto(page, 'Shop'); await shot(page, '08-loja');
await goto(page, 'Avatar'); await shot(page, '09-avatar');
await goto(page, 'Achievements'); await shot(page, '10-conquistas');
await goto(page, 'Ending'); await page.waitForTimeout(2500); await shot(page, '11-final');
await page.close();

// Celular deitado (844x390) e retrato.
const phone = await open(844, 390);
await shot(phone, '12-celular-menu');
await goto(phone, 'Design', { missionId: 'bercario' });
await shot(phone, '13-celular-design');
await phone.setViewportSize({ width: 390, height: 844 });
await phone.waitForTimeout(900);
await shot(phone, '14-celular-retrato');
await phone.close();

await browser.close();
console.log(errors.length ? `ERROS:\n${errors.join('\n')}` : 'sem erros de console');
process.exit(errors.length ? 1 : 0);
