/* ------------------------------------------------------------------
 * Tipos centralizados da plataforma Test Lab.
 *
 * As estruturas marcadas como "ricas" (situationProblem, theoryBlocks,
 * demonstration, atividade11, atividade12, guidedPracticeRich,
 * independentPracticeRich, finalChallenge) sao opcionais para que
 * unidades antigas (2 a 5) com formato simplificado continuem
 * funcionando enquanto novas unidades sao migradas para o padrao
 * usado pela Unidade 1.
 * ------------------------------------------------------------------ */

export type Page =
  | 'login'
  | 'home'
  | 'units'
  | 'welcome'
  | 'objectives'
  | 'situation-problem'
  | 'prior-knowledge'
  | 'content'
  | 'examples'
  | 'demonstration'
  | 'atividade-1-1'
  | 'atividade-1-2'
  | 'guided-practice'
  | 'independent-practice'
  | 'feedback'
  | 'final-assessment'
  | 'challenge';

export interface User {
  name: string;
  email: string;
}

export interface StoredUser {
  name: string;
  email: string;
  password: string;
}

/* ─── Questoes objetivas ────────────────────────────────────────── */
export interface QuizQuestion {
  id: string | number;
  question: string;
  options: string[];
  correctIndex: number;
  /** Mensagem exibida quando o aluno acerta. */
  explanation: string;
  /** Mensagem exibida quando o aluno erra (fallback: explanation). */
  errorExplanation?: string;
  /** Bloco do conteudo associado para sugestao de revisao. */
  reviewBlock?: string;
}

/* ─── Metadados da unidade ──────────────────────────────────────── */
export interface UnitMeta {
  cargaHoraria: string;
  nivel: string;
  referencia: string;
  abordagem: string;
  pillars?: string[];
}

/* ─── Situacao-problema inicial ─────────────────────────────────── */
export interface SituationProblem {
  title: string;
  paragraphs: string[];
  dialogues?: { speaker: string; text: string }[];
  reflectionQuestions: string[];
  conclusion: string;
}

/* ─── Bloco de conteudo teorico (modelo rico) ───────────────────── */
export type MiniActivityType = 'truefalse' | 'fill' | 'match' | 'text';

export interface MiniActivity {
  type: MiniActivityType;
  prompt: string;
  /** Para truefalse: rotulos das opcoes. */
  options?: string[];
  /** Indice da resposta correta para truefalse. */
  correctIndex?: number;
  /** Pares chave→descricao para "match". */
  pairs?: { left: string; right: string }[];
  placeholder?: string;
  expectedAnswer: string;
}

export interface TheoryBlock {
  id: string;
  number: number;
  title: string;
  icon: string;
  /** Paragrafos da explicacao conceitual. */
  explanation: string[];
  example: { title: string; body: string };
  observation: { title: string; body: string };
  miniActivity: MiniActivity;
}

/* ─── Demonstracao com exemplo resolvido ───────────────────────── */
export interface DemonstrationStep {
  id: number;
  label: string;
  question: string;
  body: string;
  /** Cor base do passo (ex: "#8b0000"). */
  color: string;
}

export interface Demonstration {
  requirement: string;
  situation: string;
  steps: DemonstrationStep[];
  lesson: string;
}

/* ─── Atividade 1.2 (discursiva) ────────────────────────────────── */
export interface Atividade12 {
  question: string;
  minWords: number;
  criteria: string[];
  sampleAnswer: string;
  rubric: { level: string; range: string; description: string }[];
}

/* ─── Praticas com multiplos campos texto ──────────────────────── */
export interface PracticeField {
  key: string;
  label: string;
  description?: string;
  placeholder?: string;
  /** Cor de destaque para a resposta esperada. */
  color?: string;
}

export interface GuidedPracticeRich {
  scenario: string;
  question: string;
  fields: PracticeField[];
  hints: string[];
  expectedAnswers: Record<string, string>;
  feedback: string;
}

export interface IndependentPracticeRich {
  scenario: string;
  tasks: string[];
  fields: PracticeField[];
  expectedAnswers: Record<string, string>;
  criteria: { label: string; weight: string; description: string }[];
  feedbackCorrect: string;
  feedbackIncorrect: string;
}

/* ─── Desafio aplicado final ────────────────────────────────────── */
export interface FinalChallenge {
  enunciado: string;
  scenario: string;
  fields: PracticeField[];
  expectedAnswers: Record<string, string>;
  rubric: {
    level: string;
    range: string;
    achievementCount: string;
    description: string;
  }[];
  finalFeedback: string;
}

/* ─── Tipos legados (Unidades 2 a 5) ────────────────────────────── */
export interface ContentSection {
  title: string;
  body: string;
  icon: string;
}

export interface Example {
  id: number;
  scenario: string;
  task: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface GuidedPractice {
  question: string;
  context: string;
  options: string[];
  correctAnswers: number[];
  explanation: string;
}

export interface IndependentPracticeField {
  key: string;
  label: string;
  placeholder: string;
}

export interface IndependentPractice {
  title: string;
  scenario: string;
  fields: IndependentPracticeField[];
  sampleAnswer: Record<string, string>;
}

export interface ChallengeField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select';
  options?: string[];
  placeholder?: string;
}

export interface Challenge {
  title: string;
  scenario: string;
  tasks: string[];
  fields: ChallengeField[];
  expectedReport: {
    title: string;
    steps: string;
    expected: string;
    actual: string;
    severity: string;
  };
}

/* ─── Unidade ───────────────────────────────────────────────────── */
export interface Unit {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  meta?: UnitMeta;
  objectives: string[];

  /* Estrutura rica (Unidade 1 completa). */
  situationProblem?: SituationProblem;
  theoryBlocks?: TheoryBlock[];
  demonstration?: Demonstration;
  atividade11?: { description: string; questions: QuizQuestion[] };
  atividade12?: Atividade12;
  guidedPracticeRich?: GuidedPracticeRich;
  independentPracticeRich?: IndependentPracticeRich;
  finalChallenge?: FinalChallenge;
  /** Mapeia o id da questao da avaliacao final para o id do bloco de revisao. */
  reviewMap?: Record<string, string[]>;

  /* Estrutura legada (Unidades 2 a 5). */
  priorKnowledgeQuestions: QuizQuestion[];
  content: ContentSection[];
  examples: Example[];
  guidedPractice: GuidedPractice;
  independentPractice: IndependentPractice;
  finalAssessmentQuestions: QuizQuestion[];
  challenge: Challenge;
}
