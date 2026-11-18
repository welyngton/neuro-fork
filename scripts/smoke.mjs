/**
 * Teste de fumaça: abre o jogo num Chrome headless, joga o tour guiado da
 * missão-tutorial como um jogador e depois as 12 missões de
 * ponta a ponta com a solução de referência de cada uma (comprando os upgrades
 * que ela exige), além de visitar loja, avatar, conquistas, o sorteio de cartas
 * do meio do treino, a sonda do Design e as lentes do treino.
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
/** Fecha a legenda/sonda que o Design abre sozinho na primeira visita. */
const closePopup = (page) => page.evaluate(() => { const s = window.__game.scene.getScene('Design'); s.popup?.destroy(); s.popup = null; });
const active = (page, key) => page.waitForFunction((k) => window.__game.scene.isActive(k), key);
const shot = (page, name) => page.screenshot({ path: `${OUT}/${name}.png` });
/** Troca de cena a partir de qualquer cena ativa. */
const goto = async (page, key, data) => {
  await page.evaluate(([k, d]) => { const g = window.__game; g.scene.getScenes(true)[0].scene.start(k, d); }, [key, data]);
  await active(page, key);
  await page.waitForTimeout(450);
};

const page = await open(1280, 720);
// Primeiro acesso: a missão-tutorial (Berçário com tour guiado) abre sozinha.
// Joga o tour inteiro clicando como um jogador: CONTINUAR/ENTENDI e as ações pedidas.
await page.waitForFunction(() => window.__game.scene.isActive('Design'), null, { timeout: 8000 });
{
  const TOUR = await page.evaluate(() => window.__neuro.TOUR);
  const tourShots = { 0: '00a-tour-licao1', 3: '00b-tour-sensores', 8: '00c-tour-encaixe', 11: '00d-tour-ligar', 17: '00e-tour-recursos', 20: '00f-tour-treinar', 24: '00g-tour-estrelas', 26: '00h-tour-ultima-licao' };
  const cur = () => page.evaluate(() => { const g = window.__game; const s = g.scene.getScenes(true)[0]; return { step: window.__neuro.state.tourStep, active: window.__neuro.state.tourActive, scene: s.scene.key, ok: s.data.get('tourOk') }; });
  const center = (r) => ({ x: r.x + r.w / 2, y: r.y + r.h / 2 });
  let guard = 0;
  for (;;) {
    if (++guard > 600) throw new Error('tour não terminou: ' + JSON.stringify(await cur()) + ' ' + errors.join(' | '));
    let c = await cur();
    if (!c.active) break;
    const step = TOUR[c.step];
    if (step.scene !== c.scene) { await page.waitForTimeout(400); continue; }
    // Espera o balão/lição aparecer (o runner entra 250 ms depois da cena).
    if (!('event' in step)) {
      await page.waitForFunction(() => { const s = window.__game.scene.getScenes(true)[0]; return !!(s.data.get('tourOk') || s.data.get('tourHole')); }, null, { timeout: 15000 });
    }
    await page.waitForTimeout(500);
    c = await cur();
    if (tourShots[c.step]) await shot(page, tourShots[c.step]);
    const before = c.step;
    if ('event' in step) {
      await page.mouse.click(1200, 677); // PULAR a simulação
      await page.waitForFunction((b) => window.__neuro.state.tourStep !== b, before, { timeout: 120000 });
      continue;
    }
    if (!step.wait) {
      if (!c.ok) throw new Error('tour sem botão de avançar no passo ' + c.step);
      await page.mouse.click(c.ok.x, c.ok.y);
    } else {
      const w = step.wait;
      if (w === 'tool_neuron' || w === 'tool_cable') {
        const r = await page.evaluate((k) => window.__game.scene.getScene('Design').toolButtons[k].rect(), w.slice(5));
        const p = center(r); await page.mouse.click(p.x, p.y);
      } else if (w === 'neuron') {
        const h = await page.evaluate(() => window.__game.scene.getScene('Design').view.posOf('h0_0'));
        await page.mouse.click(h.x, h.y);
      } else if (w === 'valid') {
        const q = await page.evaluate(() => { const v = window.__game.scene.getScene('Design').view; return { a: v.posOf('cantos'), h: v.posOf('h0_0'), b: v.posOf('buraco_b') }; });
        await page.mouse.move(q.a.x, q.a.y); await page.mouse.down(); await page.mouse.move(q.h.x, q.h.y, { steps: 6 }); await page.mouse.up();
        await page.mouse.click(q.h.x, q.h.y); await page.mouse.click(q.b.x, q.b.y);
      } else if (w === 'train') {
        const p = center(await page.evaluate(() => window.__game.scene.getScene('Design').nextBtn.rect())); await page.mouse.click(p.x, p.y);
      } else if (w === 'trained') {
        const p = center(await page.evaluate(() => window.__game.scene.getScene('Train').trainBtn.rect())); await page.mouse.click(p.x, p.y);
      } else if (w === 'sim') {
        const p = center(await page.evaluate(() => window.__game.scene.getScene('Train').simBtn.rect())); await page.mouse.click(p.x, p.y);
      }
    }
    await page.waitForFunction((b) => window.__neuro.state.tourStep !== b || !window.__neuro.state.tourActive, before, { timeout: 60000 }).catch(async () => {
      await shot(page, 'erro-tour');
      throw new Error(`tour travou no passo ${before} (${JSON.stringify(step)})`);
    });
  }
  const b = await page.evaluate(() => ({ stars: window.__neuro.state.stars('bercario'), links: window.__neuro.state.design('bercario').board.links.length }));
  console.log('tour concluído · berçário:', JSON.stringify(b));
  if (b.links !== 2) throw new Error('o tour deveria terminar com cantos → neurônio → buraco B');
  await page.waitForTimeout(800); await shot(page, '00i-tour-fim');
}
await goto(page, 'Tutorial');
await page.waitForTimeout(800); await shot(page, '00j-academia-1');
for (let i = 0; i < 4; i++) await page.evaluate(() => window.__game.scene.getScene('Tutorial').show(window.__game.scene.getScene('Tutorial').index + 1));
await page.waitForTimeout(700); await shot(page, '00k-academia-5');
await goto(page, 'Menu');
await page.waitForTimeout(700);
await shot(page, '01-menu');
// Glossário com busca.
await page.evaluate(() => window.__game.scene.getScene('Menu').go('Glossary'));
await page.waitForFunction(() => window.__game.scene.isActive('Glossary'));
await page.waitForTimeout(600);
await page.fill('input[type=search]', 'over');
await page.waitForTimeout(400);
await page.evaluate(() => window.__game.scene.getScene('Glossary').show('overfitting'));
await page.waitForTimeout(300); await shot(page, '01b-glossario');
const found = await page.evaluate(() => window.__game.scene.getScene('Glossary').items.map((e) => e.id));
if (!found.includes('overfitting')) throw new Error('busca do glossário falhou: ' + found);

// Edição manual no Design: neurônio, cabo arrastado, toque-toque, cabo direto
// sensor->ação (proibido) e borracha.
await page.evaluate(() => { const st = window.__neuro.state; const d = st.design('bercario'); d.board.hidden = d.board.hidden.map((c) => c.map(() => false)); d.board.links = []; st.saveDesign('bercario', { board: d.board }); });
await goto(page, 'Design', { missionId: 'bercario' });
await page.evaluate(() => window.__game.scene.getScene('Design').openLegend());
await page.waitForTimeout(700); await shot(page, '02a-legenda');
await closePopup(page);
{
  const info = () => page.evaluate(() => { const s = window.__game.scene.getScene('Design'); return { a: s.view.posOf('cantos'), b: s.view.posOf('buraco_b'), h: s.view.posOf('h0_0'), links: s.board.links.length, neuron: s.board.hidden[0][0] }; });
  const p = await info();
  await page.mouse.click(p.h.x, p.h.y);
  await page.mouse.move(p.a.x, p.a.y); await page.mouse.down(); await page.mouse.move((p.a.x + p.h.x) / 2, p.a.y + 40, { steps: 4 }); await page.mouse.move(p.h.x, p.h.y, { steps: 4 }); await page.mouse.up();
  let q = await info();
  if (q.links !== 1 || !q.neuron) throw new Error('criar neurônio / arrastar cabo falhou: ' + JSON.stringify(q));
  await page.mouse.click(p.h.x, p.h.y); await page.mouse.click(p.b.x, p.b.y);
  q = await info();
  if (q.links !== 2) throw new Error('toque-toque falhou');
  await page.mouse.move(p.a.x, p.a.y); await page.mouse.down(); await page.mouse.move(p.b.x, p.b.y, { steps: 6 }); await page.mouse.up();
  q = await info();
  if (q.links !== 2) throw new Error('cabo direto sensor->ação deveria ser recusado');
  await page.waitForTimeout(600);
  await shot(page, '02-design-dicas');
  await page.keyboard.press('3'); await page.mouse.click(p.h.x, p.h.y); await page.keyboard.press('1');
  q = await info();
  if (q.links !== 0 || q.neuron) throw new Error('borracha falhou: ' + JSON.stringify(q));
  console.log('edição manual ok (cabo direto recusado)');
}

const shots = {};
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
    state.saveDesign(id, { board: d.board, params: null, seed: 1, epochs: 0, trainSpent: 0, water: undefined, hyper: { ...m.defaults, ...m.reference.hyper }, earlyStop: !!m.reference.earlyStop });
    return missing;
  }, id);
  if (need.length) throw new Error(`${id}: sem estrelas para ${need}`);
  let stars = 0;
  for (let attempt = 1; attempt <= 8 && stars < 2; attempt++) {
    await goto(page, 'Design', { missionId: id });
    await page.waitForTimeout(400);
    await closePopup(page);
    if (attempt === 1) await shot(page, `03-design-${id}`);
    await goto(page, 'Train', { missionId: id });
    await page.mouse.click(640, 668); // TREINAR
    // A rodada para na metade (loja de táticas) e às vezes surge a carta do destino.
    // Na 1ª missão compra a 1ª tática; nas outras segue sem carta (referência pura).
    for (;;) {
      await page.waitForFunction(() => { const g = window.__game; const s = g.scene.getScene('Train'); return g.registry.get('drawOpen') || (!s.running && s.trainer.epoch > 0); }, null, { timeout: 180000 });
      const kind = await page.evaluate(() => window.__game.registry.get('drawOpen') && window.__game.registry.get('drawKind'));
      if (!kind) break;
      await page.waitForTimeout(900);
      const pick = id === 'bercario' ? 0 : -1;
      if (kind === 'cards.shopTitle' && !shots.shop) { shots.shop = true; await shot(page, '04a-loja-taticas'); }
      if (kind === 'cards.fateTitle' && !shots.fate) { shots.fate = true; await shot(page, '04b-carta-destino'); }
      await page.evaluate((p) => window.__game.scene.getScene('Train').resolveDraw(p), pick);
      await page.waitForTimeout(pick === 0 ? 2800 : 400);
      // Pode abrir outra carta logo em seguida (destino perto da loja): o laço trata.
    }
    await page.waitForTimeout(400);
    if (attempt === 1) await shot(page, `04-train-${id}`);
    if (id === 'fronteira' && attempt === 1) {
      await page.evaluate(() => window.__game.scene.getScene('Train').setLens('boundary'));
      await page.waitForTimeout(500); await shot(page, '04f-lente-fronteira');
      await page.evaluate(() => window.__game.scene.getScene('Train').setLens('space'));
      await page.waitForTimeout(500); await shot(page, '04c-lente-espaco');
    }
    if (id === 'tangram' && attempt === 1) {
      await goto(page, 'Design', { missionId: id });
      await page.waitForTimeout(1200); await shot(page, '04d-design-ferramentas');
      await page.evaluate(() => window.__game.scene.getScene('Design').openProbe('h0_0'));
      await page.waitForTimeout(500); await shot(page, '04e-sonda');
    }
    await goto(page, 'Simulation', { missionId: id });
    await page.waitForTimeout(1800);
    if (attempt === 1) await shot(page, `05-sim-${id}`);
    await page.mouse.click(1200, 677); // PULAR
    await page.waitForFunction(() => window.__game.scene.getScene('Simulation').children.list.some((o) => o.depth === 2000), null, { timeout: 240000 });
    await page.waitForTimeout(1600);
    stars = await page.evaluate((id) => window.__neuro.state.stars(id), id);
    if (stars < 2) await page.evaluate((id) => { const s = window.__neuro.state; s.saveDesign(id, { seed: s.design(id).seed + 1, params: null, epochs: 0, trainSpent: 0, water: undefined }); }, id);
    else {
      await shot(page, `06-result-${id}`);
      if (id === 'quebracabeca') {
        await page.evaluate(() => window.__game.scene.getScene('Simulation').openRecap(true, 40));
        await page.waitForTimeout(500); await shot(page, '06b-recapitular');
      }
    }
  }
  console.log(id.padEnd(11), 'estrelas:', stars);
  if (!stars) throw new Error(`${id}: não venceu em 8 tentativas`);
}

// Assistente AUTO: monta a rede, explica, e a missão deixa de contar para conquistas.
await goto(page, 'Design', { missionId: 'triagem' });
await closePopup(page);
await page.evaluate(() => window.__game.scene.getScene('Design').applyAssist());
await page.waitForTimeout(3500); await shot(page, '02b-assistente');
const assisted = await page.evaluate(() => window.__neuro.state.design('triagem').assisted && window.__neuro.state.assisted);
if (!assisted) throw new Error('assistente não marcou a missão');
await goto(page, 'Design', { missionId: 'xor' });
await closePopup(page);
await page.evaluate(() => { const s = window.__game.scene.getScene('Design'); const id = s.view.bp ? 'h0_0' : 'h0_0'; s.setTool('activation'); s.cycleActivation(id); });
await page.waitForTimeout(600); await shot(page, '02c-toast-ativacao');

// Superaquecimento: tanque quase vazio e treina.
await page.evaluate(() => window.__neuro.state.saveDesign('bercario', { water: 0.3, trainSpent: 0, epochs: 0 }));
await goto(page, 'Train', { missionId: 'bercario' });
await page.mouse.click(640, 668);
await page.waitForTimeout(1300); await shot(page, '04g-superaqueceu');
const melted = await page.evaluate(() => window.__neuro.state.stats ?? window.__neuro.state.snapshot().stats.overheats);
console.log('superaquecimentos:', JSON.stringify(melted));

await goto(page, 'Menu'); await page.waitForTimeout(600); await shot(page, '07-menu-final');
await goto(page, 'Shop'); await shot(page, '08-loja');
await goto(page, 'Avatar'); await shot(page, '09-avatar');
await goto(page, 'Achievements'); await shot(page, '10-conquistas');
await goto(page, 'Ending'); await page.waitForTimeout(2500); await shot(page, '11-final');
await page.close();

// Celular deitado (844x390) e retrato.
const phone = await open(844, 390);
await active(phone, 'Design');
await phone.waitForTimeout(1200); await shot(phone, '12a-celular-tour');
await phone.evaluate(() => window.__neuro.state.endTour());
await goto(phone, 'Menu');
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
