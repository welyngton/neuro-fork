/**
 * Teste de fumaça: abre o jogo num Chrome headless, percorre as 7 missões
 * (AUTO -> treinar -> simular) e salva capturas em ./screenshots.
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
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(URL);
  await page.waitForFunction(() => window.__game?.scene.isActive('Menu'));
  await page.waitForTimeout(700);
  return page;
}
const sceneActive = (page, key) => page.waitForFunction((k) => window.__game.scene.isActive(k), key);
const shot = (page, name) => page.screenshot({ path: `${OUT}/${name}.png` });

const page = await open(1280, 720);
await shot(page, '01-menu');
const ids = ['bercario', 'triagem', 'corredor', 'xor', 'labirinto', 'captcha', 'turing'];
for (const [n, id] of ids.entries()) {
  await page.evaluate((id) => window.__game.scene.getScene('Menu').scene.start('Design', { missionId: id }), id);
  await sceneActive(page, 'Design');
  await page.waitForTimeout(500);
  if (n === 0) {
    await shot(page, '02-design-vazio');
    // Edição manual: arrastar cabo, criar neurônio, apagar, desfazer.
    const info = () => page.evaluate(() => { const s = window.__game.scene.getScene('Design'); return { a: s.view.posOf('cantos'), b: s.view.posOf('buraco_b'), h: s.view.posOf('h0_0'), links: s.board.links.length, neuron: s.board.hidden[0][0] }; });
    const p = await info();
    await page.mouse.move(p.a.x, p.a.y); await page.mouse.down(); await page.mouse.move((p.a.x + p.b.x) / 2, p.a.y + 40, { steps: 4 }); await page.mouse.move(p.b.x, p.b.y, { steps: 4 }); await page.mouse.up();
    await page.mouse.click(p.h.x, p.h.y);
    let q = await info();
    if (q.links !== 1 || !q.neuron) throw new Error('arrastar cabo / criar neurônio falhou: ' + JSON.stringify(q));
    await page.mouse.click(p.h.x, p.h.y); await page.mouse.click(p.b.x, p.b.y); // modo toque-toque
    q = await info();
    if (q.links !== 2) throw new Error('toque-toque falhou');
    await page.keyboard.press('3'); await page.mouse.click(p.h.x, p.h.y); await page.keyboard.press('1');
    q = await info();
    if (q.links !== 1 || q.neuron) throw new Error('borracha falhou: ' + JSON.stringify(q));
    console.log('edição manual ok');
  }
  await page.mouse.click(492, 666); // AUTO
  await page.waitForTimeout(500);
  await shot(page, `03-design-${id}`);
  await page.mouse.click(1150, 666); // TREINAR ▶
  await sceneActive(page, 'Train');
  await page.waitForTimeout(500);
  await page.mouse.click(640, 668); // TREINAR
  await page.waitForTimeout(2000);
  if (n === 3) await shot(page, '04-train-meio');
  await page.waitForFunction(() => { const s = window.__game.scene.getScene('Train'); return !s.running && s.trainer.epoch > 0; }, null, { timeout: 120000 });
  await page.waitForTimeout(600);
  await shot(page, `04-train-${id}`);
  await page.mouse.click(1160, 668); // SIMULAR ▶
  await sceneActive(page, 'Simulation');
  await page.waitForTimeout(2600);
  await shot(page, `05-sim-${id}`);
  await page.mouse.click(1200, 677); // PULAR
  await page.waitForFunction(() => window.__game.scene.getScene('Simulation').children.list.some((o) => o.depth === 2000), null, { timeout: 240000 });
  await page.waitForTimeout(2000);
  await shot(page, `06-result-${id}`);
  const stars = await page.evaluate((id) => JSON.parse(localStorage.getItem('neurobot.save.v2')).missions[id].stars, id);
  console.log(id, 'estrelas:', stars);
  await page.evaluate(() => window.__game.scene.getScene('Simulation').scene.start('Menu'));
  await sceneActive(page, 'Menu');
}
await page.waitForTimeout(600);
await shot(page, '07-menu-final');
await page.evaluate(() => window.__game.scene.getScene('Menu').scene.start('Ending'));
await page.waitForTimeout(3500);
await shot(page, '08-ending');
await page.close();

// Celular deitado (iPhone 12: 844x390) e retrato.
const phone = await open(844, 390);
await shot(phone, '09-celular-menu');
await phone.evaluate(() => window.__game.scene.getScene('Menu').scene.start('Design', { missionId: 'labirinto' }));
await phone.waitForTimeout(900);
await shot(phone, '10-celular-design');
await phone.setViewportSize({ width: 390, height: 844 });
await phone.waitForTimeout(900);
await shot(phone, '11-celular-retrato');
await phone.close();

await browser.close();
console.log(errors.length ? `ERROS:\n${errors.join('\n')}` : 'sem erros de console');
process.exit(errors.length ? 1 : 0);
