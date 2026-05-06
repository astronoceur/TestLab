import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';

const FeedbackPage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    priorKnowledgeScore,
    guidedPracticeSelected, guidedPracticeSubmitted,
    independentPracticeSubmitted,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const gp = unit.guidedPractice;

  const gpCorrect = (() => {
    if (!guidedPracticeSubmitted) return false;
    return [...guidedPracticeSelected].sort().join(',') === [...gp.correctAnswers].sort().join(',');
  })();

  const score = priorKnowledgeScore;

  const items = [
    {
      icon: '🧪',
      label: 'Quiz de Conhecimentos Prévios',
      value: `${score}%`,
      sub: score >= 75 ? 'Ótimo começo!' : score >= 50 ? 'Boa base' : 'Muito a aprender',
      ok: score >= 50,
    },
    {
      icon: '🧩',
      label: 'Prática Guiada (AVL)',
      value: gpCorrect ? 'Correto ✓' : 'Parcial ◐',
      sub: gpCorrect ? 'Todos os valores limite identificados' : 'Revise a explicação',
      ok: gpCorrect,
    },
    {
      icon: '📝',
      label: 'Prática Independente',
      value: independentPracticeSubmitted ? 'Enviado ✓' : 'Não enviado',
      sub: independentPracticeSubmitted ? 'Caso de teste escrito' : 'Volte e complete',
      ok: independentPracticeSubmitted,
    },
  ];

  const tips = [
    'Erro → Defeito → Falha (etapas diferentes de um bug)',
    'Testar garante qualidade — não apenas encontra bugs',
    'AVL: teste os valores nas bordas e além das bordas',
    'Caso de teste: Pré-condição + Passos + Resultado Esperado',
    'Severidade = impacto do defeito no sistema',
  ];

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 className="tl-title" style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>
            Como Estou Indo?
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Resumo do seu desempenho nesta unidade até aqui.
          </p>
        </div>

        {/* Performance summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: 10,
                border: `2px solid ${item.ok ? '#2d8f2d' : '#8b0000'}`,
                background: item.ok ? '#d4f0c0' : '#fdd',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 800, fontSize: '0.875rem', color: item.ok ? '#0a4f0a' : '#660000' }}>
                  {item.label}
                </p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: item.ok ? '#1a6a1a' : '#880000' }}>
                  {item.sub}
                </p>
              </div>
              <span style={{ fontWeight: 800, fontSize: '0.875rem', color: item.ok ? '#0a4f0a' : '#660000', whiteSpace: 'nowrap' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Encouragement */}
        <div className="tl-card" style={{ borderColor: 'var(--tl-title)' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🌟</span>
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#1a4a10' }}>
                Avaliação Final a seguir!
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.5 }}>
                A <strong>Avaliação Final</strong> tem 4 questões. Você precisa de{' '}
                <strong>75% ou mais (3/4 corretas)</strong> para desbloquear o Desafio Aplicado.
                Se não passar, poderá rever o conteúdo e tentar novamente.
              </p>
            </div>
          </div>
        </div>

        {/* Key concepts */}
        <div className="tl-card" style={{ background: '#e4f4ff', borderColor: '#5588cc' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#224488' }}>
            🔑 Conceitos-chave para lembrar:
          </p>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {tips.map((tip, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: '#224488' }}>
                <span style={{ color: '#2d8f2d', fontWeight: 800, flexShrink: 0 }}>✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button className="tl-btn-ghost" onClick={() => navigateTo('independent-practice')}>← Voltar</button>
          <button className="tl-btn" onClick={() => navigateTo('final-assessment')}>
            Avaliação Final →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
