import React from 'react';
import { useApp } from '../context/AppContext';
import { Page } from '../types';
import { units } from '../data/units';

/* Mapa rico (Unidade 1 estilo PDF) — 13 passos. */
const STEP_MAP_RICH: Partial<Record<Page, number>> = {
  welcome: 1,
  objectives: 2,
  'situation-problem': 3,
  'prior-knowledge': 4,
  content: 5,
  examples: 6,
  demonstration: 6,
  'atividade-1-1': 7,
  'atividade-1-2': 8,
  'guided-practice': 9,
  'independent-practice': 10,
  feedback: 11,
  'final-assessment': 12,
  challenge: 13,
};

/* Mapa simples (Unidades 2..5 sem novo conteudo) — 10 passos. */
const STEP_MAP_LEGACY: Partial<Record<Page, number>> = {
  welcome: 1,
  objectives: 2,
  'prior-knowledge': 3,
  content: 4,
  examples: 5,
  demonstration: 5,
  'guided-practice': 6,
  'independent-practice': 7,
  feedback: 8,
  'final-assessment': 9,
  challenge: 10,
};

const STEP_LABELS: Partial<Record<Page, string>> = {
  welcome: 'Boas-vindas',
  objectives: 'Objetivos',
  'situation-problem': 'Situação-Problema',
  'prior-knowledge': 'Conhec. Prévios',
  content: 'Conteúdo Teórico',
  examples: 'Demonstração',
  demonstration: 'Demonstração',
  'atividade-1-1': 'Atividade 1.1',
  'atividade-1-2': 'Atividade 1.2',
  'guided-practice': 'Prática Guiada',
  'independent-practice': 'Prática Independente',
  feedback: 'Feedback',
  'final-assessment': 'Avaliação Final',
  challenge: 'Desafio',
};

interface LayoutProps {
  children: React.ReactNode;
  showProgress?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showProgress = false }) => {
  const { page, user, navigateTo, logout, currentUnit } = useApp();
  const unit = units.find((u) => u.id === currentUnit);

  const isRich = !!(unit && unit.theoryBlocks && unit.theoryBlocks.length > 0);
  const stepMap = isRich ? STEP_MAP_RICH : STEP_MAP_LEGACY;
  const totalSteps = isRich ? 13 : 10;
  const step = stepMap[page];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--tl-bg)' }}>
      <header className="tl-header sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-2 flex items-center justify-between">
          <button
            onClick={() => user && navigateTo('home')}
            className="flex items-center gap-2"
            style={{ background: 'none', border: 'none', cursor: user ? 'pointer' : 'default' }}
          >
            <span style={{ fontSize: '1.5rem' }}>🐞</span>
            <span className="tl-header-brand">Test Lab</span>
          </button>

          {user && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo('units')}
                style={{
                  background: 'rgba(0,0,0,0.15)',
                  border: 'none',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  borderRadius: 6,
                  padding: '3px 10px',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                Unidades
              </button>
              <div className="tl-header-user">
                <span>🐞</span>
                <span>{user.name}</span>
              </div>
              <button
                onClick={logout}
                className="tl-btn-red"
                style={{ padding: '3px 12px', fontSize: '0.8rem' }}
              >
                Sair
              </button>
            </div>
          )}
        </div>

        {showProgress && step !== undefined && (
          <div className="max-w-4xl mx-auto px-4 pb-2">
            <div className="flex justify-between items-center mb-1">
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#e0f0cc' }}>
                Passo {step} de {totalSteps} — {STEP_LABELS[page]}
              </span>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#fff' }}>
                {Math.round((step / totalSteps) * 100)}%
              </span>
            </div>
            <div className="tl-progress-track">
              <div
                className="tl-progress-fill"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
};

export default Layout;
