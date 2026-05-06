import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import FeedbackMessage from '../components/FeedbackMessage';
import { units } from '../data/units';

const FinalAssessmentPage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    finalAssessmentAnswers, setFinalAssessmentAnswers,
    finalAssessmentScore, setFinalAssessmentScore,
    finalAssessmentSubmitted, setFinalAssessmentSubmitted,
    setUnitScore,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const questions = unit.finalAssessmentQuestions;

  const [selected, setSelected] = useState<(number | null)[]>(
    finalAssessmentAnswers.length === questions.length
      ? finalAssessmentAnswers
      : Array(questions.length).fill(null)
  );

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (finalAssessmentSubmitted) return;
    const updated = [...selected];
    updated[qIdx] = oIdx;
    setSelected(updated);
  };

  const allAnswered = selected.every((s) => s !== null);

  const handleSubmit = () => {
    const correct = selected.filter((s, i) => s === questions[i].correctIndex).length;
    const pct = Math.round((correct / questions.length) * 100);
    setFinalAssessmentAnswers(selected);
    setFinalAssessmentScore(pct);
    setFinalAssessmentSubmitted(true);
    setUnitScore(currentUnit, pct);
  };

  const passed = finalAssessmentScore >= 75;

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 className="tl-title" style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>
            Avaliação Final
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Responda todas as questões e clique em Enviar. Você precisa de <strong>75%+</strong> para passar.
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
                const sub = finalAssessmentSubmitted;

                let cls = 'tl-option';
                if (sub && isCorrect) cls += ' tl-option-correct';
                else if (sub && isSel && !isCorrect) cls += ' tl-option-wrong';
                else if (sub) cls += ' tl-option-disabled';
                else if (isSel) cls += ' tl-option-selected';

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    disabled={sub}
                    className={cls}
                  >
                    {sub && isCorrect && <strong>✓ </strong>}
                    {sub && isSel && !isCorrect && <strong>✗ </strong>}
                    {opt}
                  </button>
                );
              })}
            </div>

            {finalAssessmentSubmitted && (
              <div style={{ marginLeft: 36, marginTop: 4 }}>
                <FeedbackMessage correct={selected[qIdx] === q.correctIndex} explanation={q.explanation} />
              </div>
            )}
          </div>
        ))}

        {finalAssessmentSubmitted && (
          <div
            className="tl-card"
            style={{
              textAlign: 'center',
              padding: '2rem',
              background: passed ? '#d4f0c0' : '#fdd',
              borderColor: passed ? '#2d8f2d' : '#8b0000',
              borderWidth: 3,
            }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{passed ? '🎉' : '📚'}</div>
            <p style={{ margin: '0 0 4px', fontSize: '2rem', fontWeight: 900, color: passed ? '#0a4f0a' : '#660000' }}>
              {finalAssessmentScore}%
            </p>
            <p style={{ margin: '0 0 8px', fontSize: '1.3rem', fontWeight: 800, color: passed ? '#0a4f0a' : '#660000' }}>
              {passed ? 'Aprovado!' : 'Reprovado'}
            </p>
            <p style={{ margin: 0, fontSize: '0.875rem', color: passed ? '#1a6a1a' : '#880000' }}>
              {passed
                ? 'Excelente! Você atingiu 75% ou mais. O Desafio Aplicado está desbloqueado!'
                : 'Você ficou abaixo de 75%. Revise o conteúdo e os exemplos, depois tente novamente.'}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button className="tl-btn-ghost" onClick={() => navigateTo('feedback')}>← Voltar</button>
          {!finalAssessmentSubmitted ? (
            <button className="tl-btn" onClick={handleSubmit} disabled={!allAnswered}>
              Enviar Avaliação
            </button>
          ) : passed ? (
            <button className="tl-btn" onClick={() => navigateTo('challenge')}>
              Ir ao Desafio 🏆
            </button>
          ) : (
            <button className="tl-btn-ghost" onClick={() => navigateTo('content')}>
              Rever Conteúdo →
            </button>
          )}
        </div>

        {!finalAssessmentSubmitted && !allAnswered && (
          <p style={{ textAlign: 'center', fontSize: '0.78rem', color: '#7a5a00', margin: 0 }}>
            Responda todas as questões para enviar.
          </p>
        )}
      </div>
    </Layout>
  );
};

export default FinalAssessmentPage;
