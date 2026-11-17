# Arquitetura

## Visão em camadas

```
src/
├── index.html           HTML do jogo (entrada do Vite; o index.html da RAIZ só redireciona para dist/)
├── main.ts              entrada: fontes, serviços, Phaser.Game
├── app/
│   ├── services.ts      monta os serviços globais (state, audio, cloud, analytics)
│   └── viewport.ts      responsividade (largura lógica variável)
├── core/                LÓGICA PURA — sem Phaser, DOM ou rede; 100% testável em Node
│   ├── nn/              network.ts (forward, backprop, validação) · Trainer.ts
│   ├── simulation/      classification.ts · maze.ts
│   ├── missions/        types.ts · catalog.ts (as 7 missões) · board.ts · runMission.ts
│   └── scoring.ts       regra das estrelas
├── state/GameState.ts   progresso + opções + desenho salvo; persiste em localStorage
├── services/
│   ├── i18n.ts          textos pt-BR / en
│   ├── FirebaseService.ts   login Google, Firestore (usuarios/{uid}), Firebase Analytics
│   ├── googleTag.ts         gtag.js (GA4) e Google Tag Manager
│   ├── AnalyticsService.ts  fachada de eventos
│   └── audio/           AudioEngine.ts (sintetizador) · themes.ts (músicas como dados)
├── ui/                  COMPONENTES REUTILIZÁVEIS de Phaser
│   ├── theme.ts         paleta, fontes, formas base (chanfro, polígono regular)
│   ├── NeonButton.ts    botão
│   ├── widgets.ts       painel, StepSlider, LineChart, StarRow, chip
│   ├── NetworkView.ts   desenho + hit-test da rede (Design e Treino)
│   ├── background.ts    fundo low-poly
│   └── fx.ts            texturas procedurais, partículas, brilho
├── entities/Robot.ts    o mascote
└── scenes/
    ├── BaseScene.ts     base comum (fade, barra superior, wait/tween com await)
    ├── BootScene · MenuScene · DesignScene · TrainScene · SimulationScene · EndingScene
    └── skins/           como cada simulação é ENCENADA: sorter · maze · captcha · turing
```

### Regra de dependência

`core` não importa nada de fora de `core`. `state` e `services` podem importar `core`.
`ui`, `entities` e `scenes` podem importar tudo. Nunca o contrário — é isso que mantém
a lógica do jogo testável sem navegador.

### Quem decide vs. quem desenha

A simulação é calculada **inteira e de uma vez** por `runMission()` (determinística).
A `SimulationScene` entrega o resultado a uma *skin*, que só anima passo a passo.
Consequência: bug de regra se conserta e se testa em `core/`; bug visual, em `scenes/skins/`.

## Fluxo de dados de uma missão

1. **Design** edita um `Board` (encaixes ocupados + cabos) guardado em `GameState.design(id)`.
2. **Treino** converte `Board → Topology` (`boardToTopology`), reaproveita pesos antigos
   (`reconcileParams`) e roda o `Trainer` algumas épocas por frame; salva `params` e `loss`.
3. **Simulação** chama `runMission`, encena, calcula estrelas (`calculateStars`),
   grava com `GameState.recordResult` e dispara `analytics.track('sim_result')`.

## Responsividade

Tela lógica de **altura fixa 720** e **largura entre 1100 e 1600**, conforme a proporção da
janela (`app/viewport.ts`); o Phaser escala com `Scale.FIT`. As cenas posicionam tudo a
partir de `this.W` / `this.H`. Ao girar o aparelho ou redimensionar, a largura lógica é
recalculada e as cenas ativas reiniciam — por isso **`build()` sempre reconstrói a cena a
partir do `GameState`** e nenhuma cena guarda estado importante só em memória.
Em retrato num celular aparece o aviso "gire o aparelho" (`index.html` + `styles.css`).

Regras de toque: nada depende de hover, botão direito ou roda do mouse; alvos ≥ 56 px
lógicos; texto ≥ 16 px lógicos.

## Receitas

### Criar uma missão
1. Adicione um `MissionDef` em `core/missions/catalog.ts` (sensores, ações, dataset, casos
   ou labirinto, posição no mapa, `requires`).
2. Adicione os textos `mission.<id>.*` e `io.<sensor/ação>` em `services/i18n.ts`.
3. Rode `npm test`: os testes de `core.test.ts` verificam automaticamente que a rede de
   referência treina e vence — e que uma rede zerada não vence.

### Criar uma skin de simulação
1. Escreva uma `SkinFactory` em `scenes/skins/<nome>.ts` (veja `sorter.ts` como modelo):
   desenhe o palco e devolva `{ steps, play(i) }`, usando `await scene.tween(...)` / `scene.wait(...)`.
2. Registre em `scenes/skins/index.ts` e acrescente o id em `SkinId` (`core/missions/types.ts`).

### Adicionar um sensor ao labirinto
Calcule-o em `readSensors()` (`core/simulation/maze.ts`) e liste o id em `inputs` da missão.

### Adicionar som ou música
- Efeito: novo `case` em `AudioEngine.sfx()` e o nome em `SfxName`.
- Música: novo objeto em `services/audio/themes.ts` e o id em `ThemeId`; use `protected music = '<id>'` na cena.

### Adicionar um evento de analytics
Inclua o nome em `AnalyticsEvent`, documente no cabeçalho de `AnalyticsService.ts` e chame
`analytics.track(...)`.

### Trocar o backend de nuvem
Implemente `CloudBackend` (`services/FirebaseService.ts`) e troque a instância em `app/services.ts`.

### Adicionar um idioma
Novo dicionário em `services/i18n.ts`, registrado em `DICTS` e `LOCALES`.

## Testes

- `npm test` — Vitest, só `core/` e `state/` (rápido, sem navegador).
- `npm run smoke` — Chrome headless joga as 7 missões (AUTO → treinar → simular), testa a
  edição manual no Design e tira capturas em desktop e celular. Falha se houver erro no console.

## Decisões e limites conhecidos

- **Phaser 3.90** (linha estável) em vez da 4.x.
- Paisagem obrigatória no celular; retrato mostra aviso em vez de um layout próprio.
- O canvas é renderizado na resolução lógica e ampliado; em telas de altíssima densidade o
  texto fica levemente suave.
- A rede de saída usa sempre sigmoide; a ativação escolhida vale para os neurônios ocultos.
