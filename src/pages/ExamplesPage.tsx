import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import FeedbackMessage from '../components/FeedbackMessage';
import { units } from '../data/units';

const ExamplesPage: React.FC = () => {
  const { navigateTo, currentUnit } = useApp();
  const unit = units.find((u) => u.id === currentUnit)!;
  const examples = unit.examples;

  const [selected, setSelected] = useState<(number | null)[]>(Array(examples.length).fill(null));
  const [revealed, setRevealed] = useState<boolean[]>(Array(examples.length).fill(false));

  const handleSelect = (eIdx: number, oIdx: number) => {
    if (revealed[eIdx]) return;
    const ns = [...selected]; ns[eIdx] = oIdx; setSelected(ns);
    const nr = [...revealed]; nr[eIdx] = true; setRevealed(nr);
  };

  const allAnswered = examples.every((_, i) => revealed[i]);

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 className="tl-title" style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>Exemplos</h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Analise cada cenário real e classifique corretamente.
          </p>
        </div>

        {examples.map((ex, eIdx) => (
          <div key={ex.id} className="tl-card">
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem', flexShrink: 0 }}>📋</span>
              <div>
                <p style={{ margin: '0 0 2px', fontSize: '0.72rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase' }}>
                  Cenário {eIdx + 1}
                </p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.5 }}>{ex.scenario}</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--tl-card-border)', paddingTop: '0.75rem' }}>
              <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#1a4a10', fontSize: '0.875rem' }}>{ex.task}</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.4rem' }}>
                {ex.options.map((opt, oIdx) => {
                  const isSel = selected[eIdx] === oIdx;
                  const isCorrect = oIdx === ex.correctIndex;
                  const isRev = revealed[eIdx];

                  let cls = 'tl-option';
                  if (isRev && isCorrect) cls += ' tl-option-correct';
                  else if (isRev && isSel && !isCorrect) cls += ' tl-option-wrong';
                  else if (isRev) cls += ' tl-option-disabled';

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(eIdx, oIdx)}
                      disabled={isRev}
                      className={cls}
                      style={{ textAlign: 'center' }}
                    >
                      {isRev && isCorrect && '✓ '}
                      {isRev && isSel && !isCorrect && '✗ '}
                      {opt}
                    </button>
                  );
                })}
              </div>
              {revealed[eIdx] && (
                <FeedbackMessage correct={selected[eIdx] === ex.correctIndex} explanation={ex.explanation} />
              )}
            </div>
          </div>
        ))}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="tl-btn-ghost" onClick={() => navigateTo('content')}>← Voltar ao Conteúdo</button>
          <button className="tl-btn" onClick={() => navigateTo('guided-practice')} disabled={!allAnswered}>
            Prática Guiada →
          </button>
        </div>
        {!allAnswered && (
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#7a5a00', margin: 0 }}>
            Responda todos os exemplos para continuar.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default ExamplesPage;
