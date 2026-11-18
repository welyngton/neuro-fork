import { describe, expect, it } from 'vitest';
import { MISSIONS } from '../../core/missions/catalog';
import { EN } from './en';
import { PT } from './pt';

describe('textos', () => {
  it('toda missão tem título, briefing, conceito, recapitulação e nomes de sensores/ações nos dois idiomas', () => {
    for (const dict of [PT, EN]) {
      for (const m of MISSIONS) {
        for (const k of ['title', 'brief', 'concept', 'recap']) expect(dict[`mission.${m.id}.${k}`], `mission.${m.id}.${k}`).toBeTruthy();
        if (['sorter'].includes(m.skin) && m.outputs.length === 1) {
          expect(dict[`mission.${m.id}.binA`], `${m.id}.binA`).toBeTruthy();
          expect(dict[`mission.${m.id}.binB`], `${m.id}.binB`).toBeTruthy();
        }
        for (const id of [...m.inputs, ...(m.extraInputs ?? []), ...m.outputs]) {
          expect(dict[`io.${id}`], `io.${id}`).toBeTruthy();
          expect(dict[`io.${id}.d`], `io.${id}.d`).toBeTruthy();
        }
      }
    }
  });

  it('o tour guiado tem todos os textos', async () => {
    const { TOUR } = await import('../../ui/tourScript');
    for (const s of TOUR) if ('coach' in s) for (const dict of [PT, EN]) expect(dict[`tour.${s.coach}.d`], s.coach).toBeTruthy();
  });
});
