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
ACADEMIA (tutorial, abre sozinha no 1º acesso) · GLOSSÁRIO pesquisável
MENU (opções + mapa de missões)
   └─► 1. DESIGN ──► 2. TREINO ──► 3. SIMULAÇÃO ──► resultado (0–3 ★) ──► mapa
            ▲            │               │
            └────────────┴───────────────┘   (pode voltar a qualquer momento)
```

| # | Missão | Simulação | Conceito | Camadas |
|---|--------|-----------|----------|---------|
| 1 | Berçário (tutorial) | encaixar formas redondas/pontudas | neurônio único, sensores inúteis | 1 |
| 2 | Triagem | só quadrado grande vai no buraco B | porta E, seleção de atributos | 1 |
| 3 | Fronteira | campo 2D: abater invasores | fronteira de decisão, ruído, validação | 1 |
| 4 | Corredor de Dados | atravessar um corredor sem bater | várias ações (argmax) | 1 |
| 5 | Paradoxo dos Gêmeos | duas formas iguais vão para um cesto; qualquer outra combinação, para o outro | camada oculta ("ser igual" não é uma reta), 2 neurônios | 1 |
| 6 | Contagem | figuras giradas correm pela esteira e um contador digital soma +1 na forma reconhecida | várias ações (uma por contador), sensor inútil (tamanho, giro) | 2 |
| 7 | Labirinto Neon | seguir o farol e hackear firewalls | política sensores → ações | 2 |
| 8 | Tangram | montar o barco: vela, bandeira, casco, proa | multiclasse com 4 ações | 2 |
| 9 | CAPTCHA | marcar os quadros com triângulos | faixa de valores, sensor de ruído | 2 |
| 10 | Origami | separar dobraduras de tsuru, sapo, borboleta e peixe pelas asas, pescoço e patas | conjunto de traços, generalização (validação) | 3 |
| 11 | Quebra-cabeça | falta a última peça de um quebra-cabeça 3×3: peças giradas encaixam no buraco-alvo ou vão para o descarte | rede profunda (contagens + E) | 3 |
| 12 | Teste de Turing | responder à juíza como um humano | multiclasse não convexa, 2 camadas — zera o jogo | 3 |

As camadas ocultas oferecidas crescem pelo mapa (`MissionDef.layers`) e o upgrade CAMADA EXTRA
soma mais uma (até 3). As referências das últimas missões são redes profundas.

## Regras de projeto

- **Sensor não se liga direto em ação**: todo sinal passa por pelo menos um neurônio.
- **Energia**: cada missão tem uma bateria que paga a REDE (cabo 1⚡, neurônio 2⚡, neurônio em
  camada funda 3⚡, sensor derivado +1⚡) e o TREINO (cada época gasta energia; redes maiores
  gastam mais; táticas compradas também custam). O que a rede não usa vira reserva de treino.
- **Água de resfriamento**: cada época gasta água (taxa de aprendizado alta esquenta mais). Se a
  água acaba, a rede **superaquece** e todo o treino é perdido — a água volta, a energia não.
  Bateria e tanque só recarregam quando a rede muda no Design (poda e trava não recarregam).
- **Treino obrigatório**: só dá para simular depois de treinar.
- **Estrelas**: vitória, qualidade do aprendizado (perda de validação) e eficiência energética
  TOTAL (rede + treino). Os limiares ficam em `core/missions/catalog.ts` e **não aparecem no
  jogo**; a tela de resultado mostra só a energia usada, a perda final e uma provocação.
- Os testes (`core.test.ts`) garantem por missão: a solução de referência cabe no limiar e vence;
  com menos neurônios que `minHidden` não vence; ligar todos os sensores estoura o limiar quando há
  sensor inútil.

## Progressão

- **Ferramentas de Design liberadas pelo mapa** (`core/progression/tools.ts`): ATIVAÇÃO por
  neurônio (após a Triagem), SONDA (após a Fronteira), PODA do cabo mais fraco (após o XOR) e
  TRAVA de pesos (após o Labirinto).
- **Loja**: as estrelas compram 14 upgrades — mais encaixes, camada extra, liga-tudo, sensores
  derivados (x², y², x·y), bateria de grafeno (+30% de energia), cabos multidimensionais (cabo pela
  metade), neurônios quânticos (ativação seno) e radiais (gaussiana), rodadas de 800 épocas, parada
  antecipada, L2, dropout, radiador criogênico (+50% de água) e chip neuromórfico (-30% de energia
  por época).
- **Missão-tutorial obrigatória** (com PULAR): no primeiro acesso o Berçário abre com o tour
  guiado (`ui/Tour.ts`), que alterna as 9 lições ilustradas com passos práticos: um véu escuro
  deixa aceso só o botão ou a área da vez, e o balão espera o jogador fazer a ação (pegar a
  ferramenta, pôr o neurônio, ligar os cabos, treinar, simular).
- **Academia**: as 9 lições em slides (ML, deep learning, sensores de formas, neurônio, camadas
  ocultas, ações, treino, simulação, ajudas) e o botão TOUR GUIADO para refazer o tutorial.
- **Glossário**: 44 termos pesquisáveis (sem acento/caixa), com "veja também".
- **Legenda** no Design: o que cada sensor lê, o que é a camada oculta e o que cada ação faz.
- **Assistente ✦ AUTO**: monta uma rede que funciona e explica cada escolha; a missão fica
  "assistida" e não conta para conquistas (as estrelas valem). A BOMBA tira a marca.
- **Recapitular**: no fim da missão, resumo da rede, do treino, do resultado e do conceito, com
  atalhos para o glossário.
- **Cartas de treino**: na metade de cada rodada abre a **loja de táticas** — sempre 2 cartas com
  preço em energia (compre uma ou siga). Às vezes surge sozinha uma **carta do destino** (sorte ou
  revés) que se vira e já vale; o jogador só lê e volta ao treino. Os nomes vêm do baralho dos slides do prof. Peng Yaohao.
- **Dicas de conceito**, **lentes do treino** (perda, fronteira, espaço oculto em 3D), **avatar**
  (5 modelos, 6 cores, 5 níveis) e **26 conquistas** com níveis bronze/prata/ouro.

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
- As 5 fases viraram 12 missões novas; ajuste manual de pesos, quiz/glossário e replay **não** foram portados.
- O emulador de Firestore embutido deu lugar ao SDK real; o login anônimo deu lugar ao login com Google.
