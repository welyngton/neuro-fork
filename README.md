# NeuroBot — jogo web de redes neurais (Phaser)

> Fork gamificado do **NeuroBot**, idealizado e construído por **Alexsander D. Cruz**
> (disciplina FPO — PPCA/UnB, 2026.2). Esta versão reescreve o jogo em **Phaser 3**.

Você desenha o cérebro de um robô, treina a rede neural e assiste ao robô enfrentar
simulações cada vez mais difíceis — de um brinquedo de encaixar formas até passar por
humano num Teste de Turing.

**Roda só no navegador**, em celular (deitado) e desktop. Não há assets: toda a arte é
desenhada por código (polígonos) e todo o som é sintetizado (Web Audio).

## Fluxo do jogo

```
MENU (opções + mapa de missões)
   └─► 1. DESIGN ──► 2. TREINO ──► 3. SIMULAÇÃO ──► resultado (0–3 ★) ──► mapa
            ▲            │               │
            └────────────┴───────────────┘   (pode voltar a qualquer momento)
```

| # | Missão | Simulação | Conceito | Rede de referência |
|---|--------|-----------|----------|--------------------|
| 1 | Berçário | encaixar formas redondas/pontudas | neurônio único | 1 → 1 |
| 2 | Triagem | só quadrado grande vai no buraco B | bias, porta E | 2 → 1 |
| 3 | Corredor de Dados | atravessar um corredor sem bater | várias saídas (argmax) | 3 → 3 |
| 4 | Paradoxo XOR | ativar o chip com exatamente uma luz | camada oculta | 2 → 2 → 1 |
| 5 | Labirinto Neon | seguir o farol e hackear firewalls | política sensores → ações | 4 → 4 |
| 6 | CAPTCHA | marcar os quadros com triângulos | fronteira não linear, sensor inútil | 2 → 2 → 1 |
| 7 | Teste de Turing | responder à juíza como um humano | multiclasse — zera o jogo | 3 → 4 |

Estrelas: ★ venceu · ★★ perda final abaixo da meta · ★★★ rede enxuta (neurônios ocultos ≤ ideal).

## Rodando

Requer Node.js ≥ 20.

```bash
npm install
npm run dev          # http://localhost:5173 (também acessível pelo celular na mesma rede)
```

| Comando | O que faz |
|---------|-----------|
| `npm run build` | checa tipos e gera `dist/` (que é versionado) |
| `npm run preview` | serve o `dist/` |
| `npm test` | testes do núcleo (rede, treino, simulações, estado) |
| `npm run lint` | ESLint sem avisos |
| `npm run smoke` | teste de fumaça no Chrome headless (precisa do `preview` rodando na porta 4173) |

## Publicação (GitHub Pages na `main`)

O GitHub Pages serve a branch `main`. O jogo compilado fica **versionado em `dist/`** e o
`index.html` da raiz só redireciona para `./dist/`. Para publicar uma versão:

```bash
npm run build        # regenera dist/
git add -A && git commit -m "..." && git push
```

O workflow `.github/workflows/ci.yml` roda lint, testes e build e falha se `dist/` estiver
desatualizado em relação ao código. O HTML de verdade do jogo é `src/index.html`.

## Firebase e Google Analytics

A configuração de produção está em `.env.production` (projeto Firebase `neuro-fork`).
Em `npm run dev` nada disso liga, a menos que você crie um `.env.local` (veja `.env.example`).

- **Login com Google** (botão no menu): ao entrar, o jogador é cadastrado em
  `usuarios/{uid}` (`nome`, `email`, `fotoUrl`, `atualizadoEm`) e o progresso é
  sincronizado no campo `progresso` do mesmo documento. Sem login, o save é local.
- **Regras do Firestore**: `firestore.rules` — publique com
  `npx firebase-tools deploy --only firestore:rules`.
- **Analytics**: gtag.js no fluxo GA4 `G-BNYB6G6MKG`, contêiner `GTM-K4LDJ39L` e Firebase
  Analytics (`G-XQPS182BFC`). Os eventos estão listados em `src/services/AnalyticsService.ts`.
  Nada é enviado a partir de `localhost`.

No console do Firebase é preciso: ativar o provedor **Google** em Authentication, incluir
`welyngton.github.io` nos **domínios autorizados** e criar o banco **Firestore**.

## Para quem vai manter

Leia **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** — mapa das pastas, regras de dependência
e receitas ("como criar uma missão", "como criar uma skin", "como adicionar um som").
Cada arquivo começa com um bloco `@module` explicando seu papel.

## O que mudou em relação ao original

- React, Pixi, React Flow, Recharts e TensorFlow.js saíram; o treino é backpropagation em TypeScript puro.
- As 5 fases viraram 7 missões novas; ajuste manual de pesos, quiz/glossário, replay e
  vínculo com conta Google **não** foram portados.
- O emulador de Firestore embutido deu lugar ao SDK real; o login anônimo deu lugar ao login com Google.
