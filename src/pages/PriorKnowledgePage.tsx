import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import FeedbackMessage from '../components/FeedbackMessage';
import { units } from '../data/units';
import { nextPage, previousPage } from '../data/unitFlow';

const PriorKnowledgePage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    priorKnowledgeAnswers, setPriorKnowledgeAnswers,
    setPriorKnowledgeScore,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const questions = unit.priorKnowledgeQuestions;

  const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [revealed, setRevealed] = useState<boolean[]>(Array(questions.length).fill(false));

  useEffect(() => {
    if (priorKnowledgeAnswers.length === questions.length) {
      setSelected(priorKnowledgeAnswers);
      setRevealed(priorKnowledgeAnswers.map((a) => a !== null));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (revealed[qIdx]) return;
    const ns = [...selected]; ns[qIdx] = oIdx; setSelected(ns);
    const nr = [...revealed]; nr[qIdx] = true; setRevealed(nr);
  };

  const allAnswered = selected.every((s) => s !== null);

  const handleContinue = () => {
    const score = selected.filter((s, i) => s === questions[i].correctIndex).length;
    setPriorKnowledgeAnswers(selected);
    setPriorKnowledgeScore(Math.round((score / questions.length) * 100));
    const next = nextPage('prior-knowledge', unit) ?? 'content';
    navigateTo(next);
  };

  const handleBack = () => {
    const prev = previousPage('prior-knowledge', unit) ?? 'objectives';
    navigateTo(prev);
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
            Ativação de Conhecimentos Prévios
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            Quiz de Conhecimentos Prévios
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Não se preocupe com acertos: o objetivo é identificar seus conhecimentos prévios e prepará-lo para o conteúdo.
            O feedback aparece imediatamente após sua escolha.
          </p>
        </div>

        {questions.map((q, qIdx) => (
          <div key={q.id} className="tl-card">
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <div className="tl-badge">{qIdx + 1}</div>
              <p style={{ margin: 0, fontWeight: 800, color: '#1a4a10', fontSize: '0.92rem', lineHeight: 1.45, paddingTop: 3 }}>
                {q.question}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginLeft: 36 }}>
              {q.options.map((opt, oIdx) => {
                const isSel = selected[qIdx] === oIdx;
                const isCorrect = oIdx === q.correctIndex;
                const isRev = revealed[qIdx];

                let extraClass = '';
                if (isRev && isCorrect) extraClass = 'tl-option-correct';
                else if (isRev && isSel && !isCorrect) extraClass = 'tl-option-wrong';
                else if (isRev) extraClass = 'tl-option-disabled';

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    disabled={isRev}
                    className={`tl-option ${extraClass}`}
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

        {allAnswered && (
          <div
            className="tl-card"
            style={{
              background: '#d4f0c0',
              borderColor: '#2d8f2d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <p style={{ margin: 0, fontWeight: 800, color: '#0a4f0a' }}>Quiz concluído!</p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#1a6a1a' }}>
                Você acertou{' '}
                <strong>{selected.filter((s, i) => s === questions[i].correctIndex).length}</strong>{' '}
                de <strong>{questions.length}</strong>. Agora vamos ao conteúdo!
              </p>
            </div>
            <button className="tl-btn" onClick={handleContinue}>
              Continuar →
            </button>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button className="tl-btn-ghost" onClick={handleBack}>← Voltar</button>
        </div>
      </div>
    </Layout>
  );
};

export default PriorKnowledgePage;
