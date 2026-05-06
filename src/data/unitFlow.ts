import { Page, Unit } from '../types';

/* ──────────────────────────────────────────────────────────────────
 * Fluxo navegacional dentro de uma unidade.
 *
 * A funcao `nextPage` retorna o proximo passo do fluxo, pulando
 * automaticamente as paginas para as quais a unidade atual nao tem
 * conteudo (ex: unidades 2..5 nao tem situationProblem nem
 * atividade11/atividade12 — basta omitir o campo correspondente
 * em data/units.ts).
 * ─────────────────────────────────────────────────────────────── */

const FULL_FLOW: Page[] = [
  'welcome',
  'objectives',
  'situation-problem',
  'prior-knowledge',
  'content',
  'demonstration',
  'atividade-1-1',
  'atividade-1-2',
  'guided-practice',
  'independent-practice',
  'feedback',
  'final-assessment',
  'challenge',
];

function pageAvailable(page: Page, unit: Unit): boolean {
  switch (page) {
    case 'situation-problem':
      return !!unit.situationProblem;
    case 'content':
      // Bloco teorico rico OU conteudo legado
      return (unit.theoryBlocks && unit.theoryBlocks.length > 0) ||
             (unit.content && unit.content.length > 0);
    case 'demonstration':
      return !!unit.demonstration || (unit.examples && unit.examples.length > 0);
    case 'atividade-1-1':
      return !!unit.atividade11;
    case 'atividade-1-2':
      return !!unit.atividade12;
    case 'guided-practice':
      return !!unit.guidedPracticeRich || !!unit.guidedPractice?.question;
    case 'independent-practice':
      return !!unit.independentPracticeRich || !!unit.independentPractice?.scenario;
    case 'challenge':
      return !!unit.finalChallenge || !!unit.challenge?.scenario;
    case 'examples':
      return false; // sempre redireciona para demonstration
    default:
      return true;
  }
}

export function nextPage(current: Page, unit: Unit): Page | null {
  const idx = FULL_FLOW.indexOf(current);
  if (idx === -1) return null;
  for (let i = idx + 1; i < FULL_FLOW.length; i++) {
    if (pageAvailable(FULL_FLOW[i], unit)) return FULL_FLOW[i];
  }
  return null;
}

export function previousPage(current: Page, unit: Unit): Page | null {
  const idx = FULL_FLOW.indexOf(current);
  if (idx === -1) return null;
  for (let i = idx - 1; i >= 0; i--) {
    if (pageAvailable(FULL_FLOW[i], unit)) return FULL_FLOW[i];
  }
  return null;
}
