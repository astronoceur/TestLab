import React, { createContext, useContext, useState } from 'react';
import { Page, User, StoredUser } from '../types';

const USERS_KEY = 'testlab_users';
const SESSION_KEY = 'testlab_session';
const PROGRESS_KEY = 'testlab_progress';

function loadUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

interface ProgressSnapshot {
  unitScores: Record<number, number>;
  unitCompleted: Record<number, boolean>;
}

function loadProgress(): ProgressSnapshot {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    if (!raw) return { unitScores: {}, unitCompleted: {} };
    const parsed = JSON.parse(raw) as Partial<ProgressSnapshot>;
    return {
      unitScores: parsed.unitScores ?? {},
      unitCompleted: parsed.unitCompleted ?? {},
    };
  } catch {
    return { unitScores: {}, unitCompleted: {} };
  }
}

function saveProgress(p: ProgressSnapshot) {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

interface AppContextType {
  page: Page;
  navigateTo: (page: Page) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;

  currentUnit: number;
  setCurrentUnit: (id: number) => void;

  /* Estado das atividades da unidade corrente */
  situationProblemRead: boolean;
  setSituationProblemRead: (v: boolean) => void;

  priorKnowledgeAnswers: (number | null)[];
  setPriorKnowledgeAnswers: (a: (number | null)[]) => void;
  priorKnowledgeScore: number;
  setPriorKnowledgeScore: (s: number) => void;

  miniActivityAnswers: Record<string, string>;
  setMiniActivityAnswer: (blockId: string, value: string) => void;
  miniActivityRevealed: Record<string, boolean>;
  revealMiniActivity: (blockId: string) => void;

  demonstrationViewed: boolean;
  setDemonstrationViewed: (v: boolean) => void;

  atividade11Answers: (number | null)[];
  setAtividade11Answers: (a: (number | null)[]) => void;
  atividade11Submitted: boolean;
  setAtividade11Submitted: (v: boolean) => void;
  atividade11Score: number;
  setAtividade11Score: (s: number) => void;

  atividade12Answer: string;
  setAtividade12Answer: (s: string) => void;
  atividade12Submitted: boolean;
  setAtividade12Submitted: (v: boolean) => void;

  /* Praticas com multiplos campos texto + dicas progressivas */
  guidedPracticeFields: Record<string, string>;
  setGuidedPracticeField: (key: string, value: string) => void;
  guidedPracticeAttempts: number;
  incrementGuidedPracticeAttempts: () => void;
  guidedPracticeSubmitted: boolean;
  setGuidedPracticeSubmitted: (v: boolean) => void;

  /* legacy guided practice (Unidades 2..5) */
  guidedPracticeSelected: number[];
  setGuidedPracticeSelected: (a: number[]) => void;

  independentPracticeAnswer: Record<string, string>;
  setIndependentPracticeAnswer: (a: Record<string, string>) => void;
  independentPracticeSubmitted: boolean;
  setIndependentPracticeSubmitted: (v: boolean) => void;

  finalAssessmentAnswers: (number | null)[];
  setFinalAssessmentAnswers: (a: (number | null)[]) => void;
  finalAssessmentScore: number;
  setFinalAssessmentScore: (s: number) => void;
  finalAssessmentSubmitted: boolean;
  setFinalAssessmentSubmitted: (v: boolean) => void;

  challengeAnswers: Record<string, string>;
  setChallengeAnswers: (a: Record<string, string>) => void;
  challengeSubmitted: boolean;
  setChallengeSubmitted: (v: boolean) => void;

  /* Persistencia de progresso entre unidades */
  unitScores: Record<number, number>;
  setUnitScore: (unitId: number, score: number) => void;
  unitCompleted: Record<number, boolean>;
  markUnitCompleted: (unitId: number) => void;

  resetUnitProgress: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [page, setPage] = useState<Page>(() => (loadSession() ? 'home' : 'login'));
  const [user, setUserState] = useState<User | null>(loadSession);
  const [currentUnit, setCurrentUnit] = useState(1);

  const [situationProblemRead, setSituationProblemRead] = useState(false);

  const [priorKnowledgeAnswers, setPriorKnowledgeAnswers] = useState<(number | null)[]>([]);
  const [priorKnowledgeScore, setPriorKnowledgeScore] = useState(0);

  const [miniActivityAnswers, setMiniActivityAnswers] = useState<Record<string, string>>({});
  const [miniActivityRevealed, setMiniActivityRevealed] = useState<Record<string, boolean>>({});

  const [demonstrationViewed, setDemonstrationViewed] = useState(false);

  const [atividade11Answers, setAtividade11Answers] = useState<(number | null)[]>([]);
  const [atividade11Submitted, setAtividade11Submitted] = useState(false);
  const [atividade11Score, setAtividade11Score] = useState(0);

  const [atividade12Answer, setAtividade12Answer] = useState('');
  const [atividade12Submitted, setAtividade12Submitted] = useState(false);

  const [guidedPracticeFields, setGuidedPracticeFields] = useState<Record<string, string>>({});
  const [guidedPracticeAttempts, setGuidedPracticeAttempts] = useState(0);
  const [guidedPracticeSubmitted, setGuidedPracticeSubmitted] = useState(false);

  const [guidedPracticeSelected, setGuidedPracticeSelected] = useState<number[]>([]);

  const [independentPracticeAnswer, setIndependentPracticeAnswer] = useState<Record<string, string>>({});
  const [independentPracticeSubmitted, setIndependentPracticeSubmitted] = useState(false);

  const [finalAssessmentAnswers, setFinalAssessmentAnswers] = useState<(number | null)[]>([]);
  const [finalAssessmentScore, setFinalAssessmentScore] = useState(0);
  const [finalAssessmentSubmitted, setFinalAssessmentSubmitted] = useState(false);

  const [challengeAnswers, setChallengeAnswers] = useState<Record<string, string>>({});
  const [challengeSubmitted, setChallengeSubmitted] = useState(false);

  const initialProgress = loadProgress();
  const [unitScores, setUnitScores] = useState<Record<number, number>>(initialProgress.unitScores);
  const [unitCompleted, setUnitCompleted] = useState<Record<number, boolean>>(initialProgress.unitCompleted);

  const navigateTo = (p: Page) => setPage(p);

  const setUser = (u: User | null) => {
    setUserState(u);
    if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u));
    else localStorage.removeItem(SESSION_KEY);
  };

  const register = (name: string, email: string, password: string) => {
    const users = loadUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: 'Este e-mail já está cadastrado.' };
    }
    const updated = [...users, { name, email, password }];
    saveUsers(updated);
    return { ok: true };
  };

  const login = (email: string, password: string) => {
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: 'E-mail ou senha inválidos.' };
    setUser({ name: found.name, email: found.email });
    return { ok: true };
  };

  const logout = () => {
    setUser(null);
    setPage('login');
  };

  const setUnitScore = (unitId: number, score: number) => {
    const next = { ...unitScores, [unitId]: score };
    setUnitScores(next);
    saveProgress({ unitScores: next, unitCompleted });
  };

  const markUnitCompleted = (unitId: number) => {
    const next = { ...unitCompleted, [unitId]: true };
    setUnitCompleted(next);
    saveProgress({ unitScores, unitCompleted: next });
  };

  const setMiniActivityAnswer = (blockId: string, value: string) =>
    setMiniActivityAnswers((prev) => ({ ...prev, [blockId]: value }));

  const revealMiniActivity = (blockId: string) =>
    setMiniActivityRevealed((prev) => ({ ...prev, [blockId]: true }));

  const setGuidedPracticeField = (key: string, value: string) =>
    setGuidedPracticeFields((prev) => ({ ...prev, [key]: value }));

  const incrementGuidedPracticeAttempts = () =>
    setGuidedPracticeAttempts((prev) => prev + 1);

  const resetUnitProgress = () => {
    setSituationProblemRead(false);
    setPriorKnowledgeAnswers([]);
    setPriorKnowledgeScore(0);
    setMiniActivityAnswers({});
    setMiniActivityRevealed({});
    setDemonstrationViewed(false);
    setAtividade11Answers([]);
    setAtividade11Submitted(false);
    setAtividade11Score(0);
    setAtividade12Answer('');
    setAtividade12Submitted(false);
    setGuidedPracticeFields({});
    setGuidedPracticeAttempts(0);
    setGuidedPracticeSubmitted(false);
    setGuidedPracticeSelected([]);
    setIndependentPracticeAnswer({});
    setIndependentPracticeSubmitted(false);
    setFinalAssessmentAnswers([]);
    setFinalAssessmentScore(0);
    setFinalAssessmentSubmitted(false);
    setChallengeAnswers({});
    setChallengeSubmitted(false);
  };

  return (
    <AppContext.Provider
      value={{
        page,
        navigateTo,
        user,
        setUser,
        register,
        login,
        logout,
        currentUnit,
        setCurrentUnit,
        situationProblemRead,
        setSituationProblemRead,
        priorKnowledgeAnswers,
        setPriorKnowledgeAnswers,
        priorKnowledgeScore,
        setPriorKnowledgeScore,
        miniActivityAnswers,
        setMiniActivityAnswer,
        miniActivityRevealed,
        revealMiniActivity,
        demonstrationViewed,
        setDemonstrationViewed,
        atividade11Answers,
        setAtividade11Answers,
        atividade11Submitted,
        setAtividade11Submitted,
        atividade11Score,
        setAtividade11Score,
        atividade12Answer,
        setAtividade12Answer,
        atividade12Submitted,
        setAtividade12Submitted,
        guidedPracticeFields,
        setGuidedPracticeField,
        guidedPracticeAttempts,
        incrementGuidedPracticeAttempts,
        guidedPracticeSubmitted,
        setGuidedPracticeSubmitted,
        guidedPracticeSelected,
        setGuidedPracticeSelected,
        independentPracticeAnswer,
        setIndependentPracticeAnswer,
        independentPracticeSubmitted,
        setIndependentPracticeSubmitted,
        finalAssessmentAnswers,
        setFinalAssessmentAnswers,
        finalAssessmentScore,
        setFinalAssessmentScore,
        finalAssessmentSubmitted,
        setFinalAssessmentSubmitted,
        challengeAnswers,
        setChallengeAnswers,
        challengeSubmitted,
        setChallengeSubmitted,
        unitScores,
        setUnitScore,
        unitCompleted,
        markUnitCompleted,
        resetUnitProgress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};
