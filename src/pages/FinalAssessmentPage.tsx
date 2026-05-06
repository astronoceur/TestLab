import React, { useMemo, useState } from 'react';
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

  /* Threshold: 70% para unidades ricas (Unidade 1 padrão CTFL),
   * 75% para unidades legadas. */
  const isRich = !!unit.theoryBlocks;
  const passingThreshold = isRich ? 70 : 75;

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

  const correctCount = selected.filter((s, i) => s === questions[i].correctIndex).length;
  const passed = finalAssessmentScore >= passingThreshold;

  /* Erros agrupados por bloco de revisao (Unidade 1) */
  const blocksToReview = useMemo(() => {
    if (!finalAssessmentSubmitted) return [] as string[];
    const wrongIds = questions
      .filter((q, i) => selected[i] !== q.correctIndex)
      .map((q) => String(q.id));
    if (!unit.reviewMap) {
      // tenta extrair de cada questao individual
      const blocks = questions
        .filter((_, i) => selected[i] !== questions[i].correctIndex)
        .flatMap((q) => (q.reviewBlock ? q.reviewBlock.split(',') : []));
      return Array.from(new Set(blocks));
    }
    const blocks = wrongIds.flatMap((id) => unit.reviewMap![id] ?? []);
    return Array.from(new Set(blocks));
  }, [finalAssessmentSubmitted, selected, questions, unit.reviewMap]);

  const blockLabels: Record<string, string> = {
    'bloco-1': 'Bloco 1 — Qualidade de Software',
    'bloco-2': 'Bloco 2 — O que é Teste de Software',
    'bloco-3': 'Bloco 3 — Objetivos do Teste',
    'bloco-4': 'Bloco 4 — Erro, Falha e Defeito',
    'bloco-5': 'Bloco 5 — Importância do Teste no Ciclo',
  };

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <p style={{ margin: 0, fontSize: '0.78rem', fontWeight: 800, color: '#7a5a00', textTransform: 'uppercase', letterSpacing: 1 }}>
            Avaliação Final {isRich ? '— Padrão CTFL/ISTQB Foundation Level' : ''}
          </p>
          <h1 className="tl-title" style={{ margin: '0.25rem 0 0.25rem', fontSize: '1.5rem' }}>
            {questions.length} questões objetivas
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Responda todas as questões e clique em Enviar. Aprovação requer{' '}
            <strong>{passingThreshold}%</strong> ou mais.
          </p>
        </div>

        {questions.map((q, qIdx) => (
          <div key={q.id} className="tl-card">
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <div className="tl-badge" style={{ width: 'auto', minWidth: 28, padding: '0 6px', fontSize: '0.72rem' }}>
                {String(q.id)}
              </div>
              <p
                style={{
                  margin: 0,
                  fontWeight: 800,
                  color: '#1a4a10',
                  fontSize: '0.92rem',
                  lineHeight: 1.45,
                  paddingTop: 3,
                  whiteSpace: 'pre-line',
                }}
              >
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

        {finalAssessmentSubmitted && (
          <>
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
              <p
                style={{
                  margin: '0 0 4px',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: passed ? '#0a4f0a' : '#660000',
                }}
              >
                {finalAssessmentScore}%
              </p>
              <p
                style={{
                  margin: '0 0 8px',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  color: passed ? '#0a4f0a' : '#660000',
                }}
              >
                {correctCount}/{questions.length} questões corretas — {passed ? 'Aprovado!' : 'Precisa revisar'}
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.875rem',
                  color: passed ? '#1a6a1a' : '#880000',
                }}
              >
                {passed
                  ? `Excelente! Você atingiu ${passingThreshold}% ou mais. O Desafio Aplicado está desbloqueado.`
                  : `Você ficou abaixo de ${passingThreshold}%. Veja abaixo os blocos sugeridos para revisão.`}
              </p>
            </div>

            {!passed && blocksToReview.length > 0 && (
              <div className="tl-card" style={{ background: '#fffde0', borderColor: '#c0a000' }}>
                <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#7a6000' }}>
                  📚 Blocos sugeridos para revisão
                </p>
                <ul
                  style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem',
                  }}
                >
                  {blocksToReview.map((bId) => (
                    <li
                      key={bId}
                      style={{
                        background: '#fff',
                        border: '1px solid #c0a000',
                        borderRadius: 6,
                        padding: '0.4rem 0.75rem',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: '#5a4800',
                      }}
                    >
                      🔁 {blockLabels[bId] ?? bId}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
        >
          <button className="tl-btn-ghost" onClick={() => navigateTo('feedback')}>
            ← Voltar
          </button>
          {!finalAssessmentSubmitted ? (
            <button className="tl-btn" onClick={handleSubmit} disabled={!allAnswered}>
              Enviar Avaliação
            </button>
          ) : passed ? (
            <button className="tl-btn" onClick={() => navigateTo('challenge')}>
              Ir ao Desafio Aplicado 🏆
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
