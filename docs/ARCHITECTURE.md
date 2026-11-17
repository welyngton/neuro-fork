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
│   ├── missions/        types.ts · catalog.ts (as 12 missões) · datasets.ts (campos 2D)
│   │                    board.ts (tabuleiro + planta) · runMission.ts
│   ├── progression/     upgrades.ts (loja) · tools.ts (ferramentas do mapa) · cards.ts
│   │                    resources.ts (energia e água do treino)
│   │                    achievements.ts · avatars.ts
│   └── scoring.ts       regra das estrelas
├── state/GameState.ts   progresso + opções + desenho salvo; persiste em localStorage
├── services/
│   ├── i18n/            index.ts (t, setLocale) · pt.ts · en.ts
│   ├── FirebaseService.ts   login Google, Firestore (usuarios/{uid}), Firebase Analytics
│   ├── googleTag.ts         gtag.js (GA4) e Google Tag Manager
│   ├── AnalyticsService.ts  fachada de eventos
│   └── audio/           AudioEngine.ts (sintetizador) · themes.ts (músicas como dados)
├── ui/                  COMPONENTES REUTILIZÁVEIS de Phaser
│   ├── theme.ts         paleta, fontes, formas base (chanfro, polígono regular)
│   ├── NeonButton.ts    botão
│   ├── widgets.ts       painel, StepSlider, LineChart, StarRow, chip
│   ├── NetworkView.ts   desenho + hit-test da rede (Design e Treino)
│   ├── Toast.ts         avisos: dicas de conceito (tip) e conquistas (celebrate)
│   ├── background.ts    fundo low-poly
│   └── fx.ts            texturas procedurais, partículas, brilho
├── entities/Robot.ts    o mascote
└── scenes/
    ├── BaseScene.ts     base comum (fade, barra superior, wait/tween com await)
    ├── BootScene · MenuScene · ShopScene · AvatarScene · AchievementsScene
    ├── DesignScene · TrainScene · SimulationScene · EndingScene
    └── skins/           como cada simulação é ENCENADA: sorter · maze · field · captcha · turing
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
   O tamanho do tabuleiro vem da `Blueprint` = missão + upgrades (`state.blueprint(id)`).
2. **Treino** converte `Board → Topology` (`boardToTopology`), reaproveita pesos antigos
   (`reconcileParams`) e roda o `Trainer` (Adam, com L2/dropout opcionais) algumas épocas por
   frame, medindo perda de treino e de validação; a carta escolhida vira `RunMods`.
3. **Simulação** chama `runMission`, encena, calcula estrelas (`calculateStars`: vitória, perda,
   custo x orçamento), grava com `GameState.recordResult`, soma os contadores das conquistas
   (`state.bump`) e dispara `analytics.track('sim_result')`.

## Dificuldade — o contrato de cada missão

Cada `MissionDef` declara `energy` (bateria visível), `budget` (limiar oculto da 3ª estrela),
`reference` (uma solução dentro do limiar) e `minHidden`. No catálogo esses números cobrem só a
rede; `withTraining` acrescenta o custo de treinar a referência e calcula o tanque `water`, com as
fórmulas de `core/progression/resources.ts`. A regra de fiação
(`isAllowedLink` em `board.ts`) proíbe sensor → ação. A energia é `energyCost` (`network.ts`).
`core.test.ts` garante que: a referência vence com 2★ na maioria das sementes e nunca liga sensor
em ação; redes zeradas não vencem; com menos neurônios que `minHidden` não vence; nas missões com
sensor inútil, ligar todos os sensores estoura o limiar.

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

### Criar um upgrade, uma carta, uma conquista ou um avatar
- Upgrade: `core/progression/upgrades.ts` (`UPGRADES` + `capsFor`) e textos `upg.<id>.*`.
- Carta: `core/progression/cards.ts` (`CARDS`, efeitos em `RunMods`) e textos `card.<id>.*`.
  Táticas (com `price`) aparecem na loja do meio da rodada; sorte/azar surgem sozinhas como carta
  do destino. Efeito novo = campo em `RunMods` + tratamento em `TrainScene.applyCard`.
- Ferramenta de Design: `core/progression/tools.ts` (missão que a libera), textos `tool.<id>.*` e
  `design.tool.<id>`, ícone em `ICONS` e o comportamento em `DesignScene.onDown` (modo) ou no botão (ação).
- Conquista: `core/progression/achievements.ts` e textos `ach.<id>.*`; se precisar de um contador
  novo, chame `state.bump('nome')` na cena certa e liste a chave em `SaveData.stats`.
- Avatar: `core/progression/avatars.ts` e o desenho em `entities/Robot.ts`.

### Criar uma dica de conceito
Textos `tip.<id>.t` / `tip.<id>.d` no i18n e `tip(this, '<id>')` no ponto da cena em que o
conceito aparece (`true` no 3º argumento = repetir a cada visita).

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
- `npm run smoke` — Chrome headless joga as 12 missões com a solução de referência (comprando os
  upgrades necessários), testa a edição manual no Design, visita loja, avatar, conquistas, cartas
  e lentes, e tira capturas em desktop e celular. Falha se houver erro no console.

## Decisões e limites conhecidos

- **Phaser 3.90** (linha estável) em vez da 4.x.
- Paisagem obrigatória no celular; retrato mostra aviso em vez de um layout próprio.
- O canvas é renderizado na resolução lógica e ampliado; em telas de altíssima densidade o
  texto fica levemente suave.
- A rede de saída usa sempre sigmoide; a ativação escolhida vale para os neurônios ocultos.
