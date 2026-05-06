import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import FeedbackMessage from '../components/FeedbackMessage';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';

const Atividade11Page: React.FC = () => {
  const {
    navigateTo, currentUnit,
    atividade11Answers, setAtividade11Answers,
    atividade11Submitted, setAtividade11Submitted,
    setAtividade11Score,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const atividade = unit.atividade11;

  if (!atividade) {
    const next = nextPage('atividade-1-1', unit) ?? 'guided-practice';
    navigateTo(next);
    return null;
  }

  const questions = atividade.questions;

  const [selected, setSelected] = useState<(number | null)[]>(
    atividade11Answers.length === questions.length ? atividade11Answers : Array(questions.length).fill(null)
  );
  const [revealed, setRevealed] = useState<boolean[]>(
    atividade11Answers.length === questions.length
      ? atividade11Answers.map((a) => a !== null)
      : Array(questions.length).fill(false)
  );

  useEffect(() => {
    if (atividade11Submitted && atividade11Answers.length === questions.length) {
      setSelected(atividade11Answers);
      setRevealed(Array(questions.length).fill(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (revealed[qIdx] || atividade11Submitted) return;
    const ns = [...selected]; ns[qIdx] = oIdx; setSelected(ns);
    const nr = [...revealed]; nr[qIdx] = true; setRevealed(nr);
  };

  const allAnswered = selected.every((s) => s !== null);
  const correctCount = selected.filter((s, i) => s === questions[i].correctIndex).length;

  const handleSubmit = () => {
    setAtividade11Answers(selected);
    setAtividade11Score(Math.round((correctCount / questions.length) * 100));
    setAtividade11Submitted(true);
  };

  const handleContinue = () => {
    const next = nextPage('atividade-1-1', unit) ?? 'atividade-1-2';
    navigateTo(next);
  };

  const handleBack = () => {
    const prev = previousPage('atividade-1-1', unit) ?? 'demonstration';
    navigateTo(prev);
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
            Atividade 1.1
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            Questionário Objetivo sobre Conceitos
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            {atividade.description}
          </p>
        </div>

        {questions.map((q, qIdx) => (
          <div key={q.id} className="tl-card">
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <div className="tl-badge">{qIdx + 1}</div>
              <p style={{ margin: 0, fontWeight: 800, color: '#1a4a10', fontSize: '0.9rem', lineHeight: 1.4, paddingTop: 3 }}>
                {q.question}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginLeft: 36 }}>
              {q.options.map((opt, oIdx) => {
                const isSel = selected[qIdx] === oIdx;
                const isCorrect = oIdx === q.correctIndex;
                const isRev = revealed[qIdx];

                let cls = 'tl-option';
                if (isRev && isCorrect) cls += ' tl-option-correct';
                else if (isRev && isSel && !isCorrect) cls += ' tl-option-wrong';
                else if (isRev) cls += ' tl-option-disabled';

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    disabled={isRev}
                    className={cls}
                  >
                    {isRev && isCorrect && <strong>✓ </strong>}
                    {isRev && isSel && !isCorrect && <strong>✗ </strong>}
                    {opt}
                  </button>
                );
              })}
            </div>

            {revealed[qIdx] && (
              <div style={{ marginLeft: 36, marginTop: 4 }}>
                <FeedbackMessage
                  correct={selected[qIdx] === q.correctIndex}
                  explanation={
                    selected[qIdx] === q.correctIndex
                      ? q.explanation
                      : (q.errorExplanation ?? q.explanation)
                  }
                />
              </div>
            )}
          </div>
        ))}

        {(allAnswered || atividade11Submitted) && (
          <div
            className="tl-card"
            style={{
              background: correctCount >= 6 ? '#d4f0c0' : '#fffde0',
              borderColor: correctCount >= 6 ? '#2d8f2d' : '#c0a000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: 800, color: correctCount >= 6 ? '#0a4f0a' : '#7a6000' }}>
                Atividade 1.1 — Resultado
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: correctCount >= 6 ? '#1a6a1a' : '#5a4800' }}>
                Você acertou <strong>{correctCount}</strong> de <strong>{questions.length}</strong>{' '}
                ({Math.round((correctCount / questions.length) * 100)}%).
              </p>
            </div>
            {!atividade11Submitted ? (
              <button className="tl-btn" onClick={handleSubmit}>
                Salvar resultado
              </button>
            ) : (
              <button className="tl-btn" onClick={handleContinue}>
                Continuar →
              </button>
            )}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button className="tl-btn-ghost" onClick={handleBack}>← Voltar</button>
        </div>
      </div>
    </Layout>
  );
};

export default Atividade11Page;
