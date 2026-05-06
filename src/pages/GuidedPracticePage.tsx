import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import FeedbackMessage from '../components/FeedbackMessage';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';

/* ──────────────────────────────────────────────────────────────────
 * Quando a unidade tem `guidedPracticeRich` (Unidade 1 e seguintes),
 * exibe o formato com campos texto + dicas progressivas. Caso
 * contrario, fallback para o formato legado de selecao multipla.
 * ────────────────────────────────────────────────────────────────── */

const GuidedPracticePage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    guidedPracticeFields, setGuidedPracticeField,
    guidedPracticeAttempts, incrementGuidedPracticeAttempts,
    guidedPracticeSubmitted, setGuidedPracticeSubmitted,
    guidedPracticeSelected, setGuidedPracticeSelected,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const handleBack = () => {
    const prev = previousPage('guided-practice', unit) ?? 'demonstration';
    navigateTo(prev);
  };
  const handleContinue = () => {
    const next = nextPage('guided-practice', unit) ?? 'independent-practice';
    navigateTo(next);
  };

  /* ─── Modo rico (Unidade 1) ─────────────────────────────────── */
  if (unit.guidedPracticeRich) {
    const gp = unit.guidedPracticeRich;
    const allFilled = gp.fields.every((f) => (guidedPracticeFields[f.key] ?? '').trim().length > 0);
    const visibleHints = gp.hints.slice(0, guidedPracticeAttempts);

    const handleAttempt = () => {
      incrementGuidedPracticeAttempts();
    };

    const handleSubmit = () => {
      setGuidedPracticeSubmitted(true);
    };

    return (
      <Layout showProgress>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
              Prática Guiada
            </p>
            <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
              Identifique a cadeia Erro → Defeito → Falha
            </h1>
            <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
              Aplique o que aprendeu com orientação passo a passo.
            </p>
          </div>

          {/* Cenário */}
          <div className="tl-card" style={{ borderColor: 'var(--tl-title)' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <span style={{ fontSize: '1.5rem' }}>🛒</span>
              <div>
                <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#1a4a10', fontSize: '0.92rem' }}>
                  Cenário
                </p>
                <p style={{ margin: '0 0 6px', fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.6 }}>
                  {gp.scenario}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', fontStyle: 'italic', color: '#3d6a28' }}>
                  {gp.question}
                </p>
              </div>
            </div>
          </div>

          {/* Campos */}
          <div className="tl-card">
            <p style={{ margin: '0 0 1rem', fontWeight: 800, color: '#1a4a10' }}>
              Preencha os três campos:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {gp.fields.map((field) => (
                <div key={field.key}>
                  <label
                    className="tl-label"
                    style={{ color: field.color ?? 'var(--tl-title)' }}
                  >
                    {field.label}
                  </label>
                  <textarea
                    className="tl-input"
                    rows={3}
                    placeholder={field.placeholder}
                    value={guidedPracticeFields[field.key] ?? ''}
                    onChange={(e) =>
                      !guidedPracticeSubmitted && setGuidedPracticeField(field.key, e.target.value)
                    }
                    disabled={guidedPracticeSubmitted}
                    style={{ resize: 'vertical' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dicas progressivas */}
          {visibleHints.length > 0 && !guidedPracticeSubmitted && (
            <div
              className="tl-card"
              style={{ background: '#fffde0', borderColor: '#c0a000' }}
            >
              <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#7a6000' }}>
                💡 Dicas progressivas
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                {visibleHints.map((hint, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#fff',
                      border: '1px solid #c0a000',
                      borderRadius: 8,
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.85rem',
                      color: '#5a4800',
                      lineHeight: 1.5,
                    }}
                  >
                    <strong style={{ color: '#7a6000' }}>Dica {i + 1}:</strong> {hint}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resposta esperada + feedback */}
          {guidedPracticeSubmitted && (
            <>
              <div className="tl-card" style={{ background: '#d4f0c0', borderColor: '#2d8f2d', borderWidth: 3 }}>
                <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#0a4f0a' }}>
                  ✅ Resposta esperada
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {gp.fields.map((field) => (
                    <div
                      key={field.key}
                      style={{
                        background: '#fff',
                        borderLeft: `5px solid ${field.color ?? '#2d8f2d'}`,
                        borderRadius: 8,
                        padding: '0.5rem 0.75rem',
                      }}
                    >
                      <p
                        style={{
                          margin: '0 0 2px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          color: field.color ?? '#0a4f0a',
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                        }}
                      >
                        {field.label}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.875rem', color: '#1a4a10', lineHeight: 1.5 }}>
                        {gp.expectedAnswers[field.key]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <FeedbackMessage correct explanation={gp.feedback} />
            </>
          )}

          {/* Botões */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button className="tl-btn-ghost" onClick={handleBack}>← Voltar</button>
            {!guidedPracticeSubmitted ? (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {visibleHints.length < gp.hints.length && (
                  <button
                    className="tl-btn-ghost"
                    onClick={handleAttempt}
                  >
                    Pedir nova dica ({gp.hints.length - visibleHints.length} restantes)
                  </button>
                )}
                <button className="tl-btn" onClick={handleSubmit} disabled={!allFilled}>
                  Conferir resposta
                </button>
              </div>
            ) : (
              <button className="tl-btn" onClick={handleContinue}>
                Prática Independente →
              </button>
            )}
          </div>
          {!guidedPracticeSubmitted && !allFilled && (
            <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#7a5a00', margin: 0 }}>
              Preencha os três campos para conferir a resposta esperada.
            </p>
          )}
        </div>
      </Layout>
    );
  }

  /* ─── Modo legado (Unidades 2..5: selecao multipla) ─────────── */
  const gp = unit.guidedPractice;
  const toggle = (idx: number) => {
    if (guidedPracticeSubmitted) return;
    setGuidedPracticeSelected(
      guidedPracticeSelected.includes(idx)
        ? guidedPracticeSelected.filter((i) => i !== idx)
        : [...guidedPracticeSelected, idx]
    );
  };
  const isCorrect = () =>
    [...guidedPracticeSelected].sort().join(',') === [...gp.correctAnswers].sort().join(',');

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 className="tl-title" style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>Prática Guiada</h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Aplique o que aprendeu com orientação passo a passo.
          </p>
        </div>

        <div className="tl-card" style={{ borderColor: 'var(--tl-title)' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.5rem' }}>🧩</span>
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#1a4a10', fontSize: '0.95rem', lineHeight: 1.4 }}>
                {gp.question}
              </p>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#3d6a28' }}>{gp.context}</p>
            </div>
          </div>
        </div>

        <div className="tl-card">
          <p style={{ margin: '0 0 0.75rem', fontWeight: 800, color: '#1a4a10', fontSize: '0.875rem' }}>
            Selecione todas as respostas corretas:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
            {gp.options.map((opt, idx) => {
              const isSel = guidedPracticeSelected.includes(idx);
              const isCorrectOpt = gp.correctAnswers.includes(idx);
              const sub = guidedPracticeSubmitted;
              let cls = 'tl-option';
              if (sub && isCorrectOpt) cls += ' tl-option-correct';
              else if (sub && isSel && !isCorrectOpt) cls += ' tl-option-wrong';
              else if (sub) cls += ' tl-option-disabled';
              else if (isSel) cls += ' tl-option-selected';
              return (
                <button
                  key={idx}
                  onClick={() => toggle(idx)}
                  disabled={sub}
                  className={cls}
                  style={{ textAlign: 'center', fontSize: '1rem', fontWeight: 900 }}
                >
                  {sub && isCorrectOpt && '✓ '}
                  {sub && isSel && !isCorrectOpt && '✗ '}
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        {guidedPracticeSubmitted && <FeedbackMessage correct={isCorrect()} explanation={gp.explanation} />}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button className="tl-btn-ghost" onClick={handleBack}>← Voltar</button>
          {!guidedPracticeSubmitted ? (
            <button
              className="tl-btn"
              onClick={() => setGuidedPracticeSubmitted(true)}
              disabled={guidedPracticeSelected.length === 0}
            >
              Verificar Resposta
            </button>
          ) : (
            <button className="tl-btn" onClick={handleContinue}>
              Prática Independente →
            </button>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default GuidedPracticePage;
