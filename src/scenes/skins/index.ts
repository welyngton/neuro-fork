/**
 * @module scenes/skins
 * Registro das skins de simulação: id (`MissionDef.skin`) -> fábrica.
 */
import { SkinId } from '../../core/missions/types';
import { captchaSkin } from './captcha';
import { counterSkin } from './counter';
import { fieldSkin } from './field';
import { mazeSkin } from './maze';
import { puzzleSkin } from './puzzle';
import { sorterSkin } from './sorter';
import { turingSkin } from './turing';
import { SkinFactory } from './types';

export const SKINS: Record<SkinId, SkinFactory> = {
  sorter: sorterSkin,
  maze: mazeSkin,
  captcha: captchaSkin,
  turing: turingSkin,
  field: fieldSkin,
  counter: counterSkin,
  puzzle: puzzleSkin,
};
