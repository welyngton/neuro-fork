/**
 * @module services/i18n/glossary
 *
 * Glossário do jogo (tela GLOSSÁRIO, aberta pelo menu). Cada verbete tem título
 * e definição em pt-BR e en, e uma lista `see` de verbetes relacionados.
 * Para acrescentar um termo, basta um objeto novo nesta lista.
 */
import { getLocale } from './index';

export interface GlossaryEntry {
  id: string;
  pt: [string, string];
  en: [string, string];
  see?: string[];
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    id: 'ml',
    pt: ['Machine Learning (aprendizado de máquina)', 'Em vez de escrever regras à mão, mostramos exemplos ao computador e ele ajusta números internos até acertar. O NeuroBot aprende assim: você desenha a rede, ela aprende com os exemplos.'],
    en: ['Machine Learning', 'Instead of hand-writing rules, we show the computer examples and it tunes internal numbers until it gets them right. NeuroBot learns this way: you design the net, it learns from the examples.'],
    see: ['dl', 'dataset', 'treino'],
  },
  {
    id: 'dl',
    pt: ['Deep Learning (aprendizado profundo)', 'Machine learning com redes neurais de várias camadas ocultas. Cada camada combina o que a anterior percebeu, formando conceitos cada vez mais complexos.'],
    en: ['Deep Learning', 'Machine learning with neural networks of several hidden layers. Each layer combines what the previous one noticed, building ever more complex concepts.'],
    see: ['camada_oculta', 'rede_neural'],
  },
  {
    id: 'rede_neural',
    pt: ['Rede neural', 'Um grafo de neurônios ligados por cabos com pesos. Recebe leituras dos sensores, passa por camadas ocultas e decide uma ação. No jogo, é o "cérebro" que você desenha.'],
    en: ['Neural network', 'A graph of neurons linked by weighted cables. It reads the sensors, goes through hidden layers and decides an action. In the game, it is the "brain" you draw.'],
    see: ['neuronio', 'peso', 'camada_oculta'],
  },
  {
    id: 'sensor',
    pt: ['Sensor (entrada)', 'O que o robô percebe do mundo, em números. Ex.: "cantos" mede quantos cantos uma forma tem (círculo 0, triângulo 1, quadrado 1,33); "parede frente" vale 1 se há parede à frente. Nem todo sensor é útil!'],
    en: ['Sensor (input)', 'What the robot perceives, as numbers. E.g. "corners" measures how many corners a shape has (circle 0, triangle 1, square 1.33); "wall ahead" is 1 if there is a wall ahead. Not every sensor is useful!'],
    see: ['atributo', 'acao'],
  },
  {
    id: 'acao',
    pt: ['Ação (saída)', 'O que o robô pode fazer: jogar no buraco B, andar, virar, atirar, responder... Cada ação é um neurônio de saída; com várias ações, vence a que ativar mais forte.'],
    en: ['Action (output)', 'What the robot can do: drop in hole B, walk, turn, shoot, answer... Each action is an output neuron; with several actions, the strongest activation wins.'],
    see: ['argmax', 'sensor'],
  },
  {
    id: 'neuronio',
    pt: ['Neurônio', 'Soma as entradas multiplicadas pelos pesos, adiciona o bias e passa o resultado por uma função de ativação. É a peça básica de toda rede.'],
    en: ['Neuron', 'Adds its inputs times their weights, adds the bias and passes the result through an activation function. The basic building block of every net.'],
    see: ['peso', 'bias', 'ativacao'],
  },
  {
    id: 'camada_oculta',
    pt: ['Camada oculta', 'Neurônios entre os sensores e as ações. Ninguém diz o que eles devem detectar: o treino descobre. Criam atributos novos e permitem separar casos que uma reta não separa (como o XOR).'],
    en: ['Hidden layer', 'Neurons between sensors and actions. Nobody tells them what to detect: training figures it out. They create new features and separate cases a straight line cannot (like XOR).'],
    see: ['xor', 'espaco_oculto', 'dl'],
  },
  {
    id: 'peso',
    pt: ['Peso', 'O número de cada cabo: o quanto aquele sinal importa. Positivo (ciano) reforça, negativo (magenta) inibe. Treinar é ajustar os pesos.'],
    en: ['Weight', 'The number on each cable: how much that signal matters. Positive (cyan) excites, negative (magenta) inhibits. Training means tuning the weights.'],
    see: ['bias', 'gradiente'],
  },
  {
    id: 'bias',
    pt: ['Bias (viés)', 'Um número próprio de cada neurônio que desloca o ponto em que ele "dispara". Funciona como um limiar ajustável.'],
    en: ['Bias', 'A number of its own in each neuron that shifts the point where it "fires". Works like an adjustable threshold.'],
    see: ['neuronio'],
  },
  {
    id: 'ativacao',
    pt: ['Função de ativação', 'Dobra a soma do neurônio numa curva. Sem ela, empilhar camadas daria só outra reta. tanh: -1 a 1; sigmoide: 0 a 1; ReLU: corta negativos; quântica (seno): ondula; radial (gauss): dispara perto de um ponto.'],
    en: ['Activation function', 'Bends the neuron\'s sum into a curve. Without it, stacking layers would give just another line. tanh: -1 to 1; sigmoid: 0 to 1; ReLU: cuts negatives; quantum (sine): oscillates; radial (gauss): fires near one point.'],
    see: ['neuronio', 'relu'],
  },
  {
    id: 'relu',
    pt: ['ReLU', 'Ativação que deixa passar valores positivos e zera (quase) os negativos. Simples e rápida; é a mais usada em redes profundas.'],
    en: ['ReLU', 'Activation that lets positive values through and (almost) zeroes negatives. Simple and fast; the most used in deep nets.'],
    see: ['ativacao', 'vanishing'],
  },
  {
    id: 'argmax',
    pt: ['Argmax', 'Regra de decisão com várias ações: escolhe a de maior ativação. "Quem grita mais alto ganha".'],
    en: ['Argmax', 'Decision rule with several actions: pick the one with the highest activation. "The loudest wins".'],
    see: ['acao', 'classificacao'],
  },
  {
    id: 'classificacao',
    pt: ['Classificação', 'Tarefa de dizer a que classe um caso pertence: redondo ou pontudo, aliado ou invasor, que tipo de resposta dar.'],
    en: ['Classification', 'The task of saying which class a case belongs to: round or pointy, ally or invader, which kind of answer to give.'],
    see: ['fronteira', 'argmax'],
  },
  {
    id: 'dataset',
    pt: ['Dataset (conjunto de dados)', 'Os exemplos com a resposta certa (rótulo) que a rede usa para aprender.'],
    en: ['Dataset', 'The examples with the right answer (label) the net learns from.'],
    see: ['rotulo', 'validacao'],
  },
  {
    id: 'rotulo',
    pt: ['Rótulo', 'A resposta certa de um exemplo. Dados reais têm rótulos errados às vezes — as missões de campo também.'],
    en: ['Label', 'The right answer of an example. Real data sometimes has wrong labels — so do the field missions.'],
    see: ['ruido', 'dataset'],
  },
  {
    id: 'treino',
    pt: ['Treino', 'Repetir os exemplos muitas vezes ajustando os pesos para a perda cair. No jogo, cada época gasta energia e água.'],
    en: ['Training', 'Going over the examples many times, tuning the weights so the loss drops. In the game, every epoch spends energy and water.'],
    see: ['epoca', 'perda', 'backprop'],
  },
  {
    id: 'epoca',
    pt: ['Época', 'Uma passada completa por todos os exemplos de treino.'],
    en: ['Epoch', 'One full pass over all training examples.'],
    see: ['treino'],
  },
  {
    id: 'perda',
    pt: ['Perda (loss)', 'Mede o quanto a rede erra. Treinar é descer essa curva. A curva amarela é a perda na validação.'],
    en: ['Loss', 'Measures how wrong the net is. Training walks down this curve. The yellow curve is the validation loss.'],
    see: ['gradiente', 'validacao'],
  },
  {
    id: 'gradiente',
    pt: ['Gradiente', 'A direção em que a perda sobe mais rápido. O treino dá passos na direção oposta, como descer um vale no escuro sentindo a inclinação do chão.'],
    en: ['Gradient', 'The direction in which the loss rises fastest. Training steps the opposite way, like walking down a valley in the dark by feeling the slope.'],
    see: ['backprop', 'taxa'],
  },
  {
    id: 'backprop',
    pt: ['Backpropagation', 'Algoritmo que calcula, da saída para trás, quanto cada peso contribuiu para o erro. É o que permite treinar redes com camadas ocultas.'],
    en: ['Backpropagation', 'Algorithm that computes, from the output backwards, how much each weight contributed to the error. It is what makes hidden layers trainable.'],
    see: ['gradiente'],
  },
  {
    id: 'taxa',
    pt: ['Taxa de aprendizado', 'O tamanho de cada passo do treino. Alta demais: pula o fundo do vale (e esquenta o robô). Baixa demais: aprende devagar.'],
    en: ['Learning rate', 'The size of each training step. Too high: jumps over the valley floor (and heats the robot). Too low: learns slowly.'],
    see: ['gradiente', 'adam'],
  },
  {
    id: 'adam',
    pt: ['Adam', 'O otimizador usado pelo jogo: ajusta o passo de cada peso conforme o histórico do gradiente. Converge mais rápido e estável que o gradiente puro.'],
    en: ['Adam', 'The optimizer the game uses: adapts each weight\'s step from the gradient\'s history. Converges faster and steadier than plain gradient descent.'],
    see: ['taxa'],
  },
  {
    id: 'inicializacao',
    pt: ['Inicialização (semente)', 'Os pesos começam sorteados. Outra semente pode cair num vale melhor — é o botão EMBARALHAR PESOS.'],
    en: ['Initialization (seed)', 'Weights start out random. Another seed may land in a better valley — that is the SHUFFLE WEIGHTS button.'],
    see: ['minimo_local'],
  },
  {
    id: 'minimo_local',
    pt: ['Mínimo local', 'Um "vale" onde a perda parou de cair mas não é o melhor possível. Embaralhar os pesos ou mudar a rede ajuda a sair.'],
    en: ['Local minimum', 'A "valley" where the loss stopped falling but is not the best possible. Shuffling weights or changing the net helps escape.'],
    see: ['inicializacao'],
  },
  {
    id: 'validacao',
    pt: ['Validação', 'Exemplos separados que o treino nunca vê. Servem para medir se a rede generaliza ou só decorou.'],
    en: ['Validation', 'Held-out examples training never sees. They measure whether the net generalises or just memorised.'],
    see: ['overfitting', 'generalizacao'],
  },
  {
    id: 'generalizacao',
    pt: ['Generalização', 'Acertar casos novos, não só os do treino. A simulação sempre testa casos novos.'],
    en: ['Generalisation', 'Getting new cases right, not just the training ones. The simulation always tests new cases.'],
    see: ['validacao'],
  },
  {
    id: 'overfitting',
    pt: ['Overfitting (sobreajuste)', 'A rede decora o treino (inclusive o ruído) e piora em casos novos: a curva de treino desce e a de validação sobe.'],
    en: ['Overfitting', 'The net memorises the training set (noise included) and gets worse on new cases: the training curve drops while validation rises.'],
    see: ['regularizacao', 'dropout', 'early_stop'],
  },
  {
    id: 'regularizacao',
    pt: ['Regularização L2', 'Penaliza pesos grandes, puxando-os para zero. Pesos pequenos desenham fronteiras mais suaves e generalizam melhor.'],
    en: ['L2 regularization', 'Penalises large weights, pulling them towards zero. Small weights draw smoother boundaries and generalise better.'],
    see: ['overfitting'],
  },
  {
    id: 'dropout',
    pt: ['Dropout', 'Desliga neurônios ao acaso durante o treino, para nenhum carregar a rede sozinho. A GatoNet dos slides do prof. Peng.'],
    en: ['Dropout', 'Switches neurons off at random during training so none carries the net alone. Prof. Peng\'s GatoNet.'],
    see: ['overfitting'],
  },
  {
    id: 'early_stop',
    pt: ['Parada antecipada (early stopping)', 'Guardar os pesos do momento em que a validação foi melhor e voltar a eles no fim.'],
    en: ['Early stopping', 'Keep the weights from when validation was best and go back to them at the end.'],
    see: ['validacao', 'overfitting'],
  },
  {
    id: 'transfer',
    pt: ['Transfer learning', 'Reaproveitar pesos já aprendidos em vez de começar do zero. Costuma vir junto com congelar parte da rede.'],
    en: ['Transfer learning', 'Reusing already-learned weights instead of starting from scratch. Often comes with freezing part of the net.'],
    see: ['congelar'],
  },
  {
    id: 'congelar',
    pt: ['Congelar pesos', 'Impedir o treino de mudar certos pesos (ferramenta TRAVA). Protege o que já foi aprendido.'],
    en: ['Freezing weights', 'Stopping training from changing certain weights (LOCK tool). Protects what was already learned.'],
    see: ['transfer'],
  },
  {
    id: 'poda',
    pt: ['Poda (pruning)', 'Cortar cabos de peso quase zero. A rede fica mais leve e gasta menos, muitas vezes sem perder qualidade.'],
    en: ['Pruning', 'Cutting cables whose weight is near zero. The net gets lighter and cheaper, often without losing quality.'],
    see: ['peso', 'occam'],
  },
  {
    id: 'augmentation',
    pt: ['Data augmentation', 'Criar exemplos novos fazendo pequenas variações dos existentes. Mais dados, menos decoreba.'],
    en: ['Data augmentation', 'Creating new examples by slightly varying existing ones. More data, less memorising.'],
    see: ['overfitting'],
  },
  {
    id: 'atributo',
    pt: ['Atributo (feature)', 'Uma característica numérica de um caso. Escolher bons atributos (e ignorar os inúteis) é metade do trabalho.'],
    en: ['Feature', 'A numeric characteristic of a case. Picking good features (and ignoring useless ones) is half the job.'],
    see: ['engenharia', 'sensor'],
  },
  {
    id: 'engenharia',
    pt: ['Engenharia de atributos', 'Criar atributos novos a partir dos existentes, como x² e y². Um anel no plano vira uma faixa simples.'],
    en: ['Feature engineering', 'Building new features from existing ones, like x² and y². A ring on the plane becomes a simple band.'],
    see: ['atributo'],
  },
  {
    id: 'fronteira',
    pt: ['Fronteira de decisão', 'A linha (ou curva) que separa onde a rede responde uma classe da outra. A lente FRONTEIRA mostra a sua.'],
    en: ['Decision boundary', 'The line (or curve) separating where the net answers one class from the other. The BOUNDARY lens shows yours.'],
    see: ['classificacao', 'camada_oculta'],
  },
  {
    id: 'espaco_oculto',
    pt: ['Espaço oculto (representação)', 'Como os exemplos ficam "vistos" pelos neurônios ocultos: cada neurônio é um eixo. Uma boa rede move os pontos até uma reta separá-los.'],
    en: ['Hidden space (representation)', 'How examples look to the hidden neurons: each neuron is an axis. A good net moves the points until a line splits them.'],
    see: ['camada_oculta'],
  },
  {
    id: 'xor',
    pt: ['XOR (ou exclusivo)', 'Verdadeiro quando exatamente uma entrada é verdadeira. Clássico porque nenhuma reta separa os casos: precisa de camada oculta.'],
    en: ['XOR (exclusive or)', 'True when exactly one input is true. A classic because no straight line separates the cases: it needs a hidden layer.'],
    see: ['camada_oculta'],
  },
  {
    id: 'vanishing',
    pt: ['Vanishing gradient', 'Em redes fundas, o gradiente pode encolher camada a camada até sumir, e as primeiras camadas param de aprender.'],
    en: ['Vanishing gradient', 'In deep nets the gradient can shrink layer after layer until it vanishes, and the first layers stop learning.'],
    see: ['relu', 'atalho'],
  },
  {
    id: 'atalho',
    pt: ['Skip connection (atalho)', 'Cabo que pula camadas. Ajuda o sinal e o gradiente a atravessarem redes fundas.'],
    en: ['Skip connection', 'A cable that skips layers. Helps the signal and the gradient cross deep nets.'],
    see: ['vanishing'],
  },
  {
    id: 'ruido',
    pt: ['Ruído', 'Variação aleatória nos dados que não tem a ver com o padrão. Decorar ruído é overfitting.'],
    en: ['Noise', 'Random variation in the data unrelated to the pattern. Memorising noise is overfitting.'],
    see: ['overfitting'],
  },
  {
    id: 'occam',
    pt: ['Navalha de Occam', 'Entre duas explicações que funcionam, prefira a mais simples. Redes menores costumam generalizar melhor e gastam menos.'],
    en: ["Occam's razor", 'Between two explanations that work, prefer the simpler one. Smaller nets tend to generalise better and cost less.'],
    see: ['poda', 'overfitting'],
  },
  {
    id: 'turing',
    pt: ['Teste de Turing', 'Proposto por Alan Turing (1950): se um juiz conversando não distingue a máquina de um humano, ela "passa".'],
    en: ['Turing test', 'Proposed by Alan Turing (1950): if a judge chatting cannot tell the machine from a human, it "passes".'],
    see: ['ml'],
  },
];

/** Título e definição do verbete no idioma atual. */
export function entryText(e: GlossaryEntry): [string, string] {
  return getLocale() === 'en' ? e.en : e.pt;
}

/** Remove acentos e caixa para a busca ("reLu", "regularizacao" acham "ReLU", "Regularização"). */
export function normalize(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Verbetes cujo título ou definição contém o texto buscado, em ordem alfabética do título. */
export function searchGlossary(query: string): GlossaryEntry[] {
  const q = normalize(query.trim());
  return GLOSSARY.filter((e) => !q || entryText(e).some((s) => normalize(s).includes(q))).sort((a, b) =>
    normalize(entryText(a)[0]).localeCompare(normalize(entryText(b)[0])),
  );
}
