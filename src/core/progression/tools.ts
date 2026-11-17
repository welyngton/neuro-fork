/**
 * @module core/progression/tools
 *
 * Ferramentas de Design liberadas pelo avanço no mapa (não se compram):
 * cada uma aparece na barra do Design depois que a missão `after` é vencida.
 *
 *  - activation : pincel de ativação — cada neurônio pode ter a sua (tanh, relu, sigmoide);
 *  - probe      : sonda — mostra o que um neurônio "enxerga" com os pesos atuais;
 *  - prune      : poda — corta o cabo de menor peso treinado e devolve energia;
 *  - freeze     : trava — congela o peso de um cabo (o treino não mexe nele).
 *
 * Textos em `tool.<id>.t` (nome) e `tool.<id>.d` (o que faz).
 */
export interface DesignToolDef {
  id: 'activation' | 'probe' | 'prune' | 'freeze';
  /** Missão que precisa ter ao menos 1 estrela. */
  after: string;
  /** `mode` = fica selecionada e age no toque; `action` = age ao apertar o botão. */
  kind: 'mode' | 'action';
}

export const DESIGN_TOOLS: DesignToolDef[] = [
  { id: 'activation', after: 'triagem', kind: 'mode' },
  { id: 'probe', after: 'fronteira', kind: 'mode' },
  { id: 'prune', after: 'xor', kind: 'action' },
  { id: 'freeze', after: 'labirinto', kind: 'mode' },
];
