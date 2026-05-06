import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import { previousPage } from '../data/unitFlow';

const FeedbackPage: React.FC = () => {
  const {
    navigateTo, currentUnit,
    priorKnowledgeScore,
    atividade11Score, atividade11Submitted,
    atividade12Submitted,
    guidedPracticeSubmitted,
    independentPracticeSubmitted,
  } = useApp();

  const unit = units.find((u) => u.id === currentUnit)!;
  const isRich = !!unit.theoryBlocks;

  const items = isRich
    ? [
        {
          icon: '🧪',
          label: 'Conhecimentos prévios',
          value: `${priorKnowledgeScore}%`,
          sub: priorKnowledgeScore >= 70 ? 'Bom ponto de partida' : 'Reforçaremos durante a unidade',
          ok: priorKnowledgeScore >= 50,
        },
        {
          icon: '✅',
          label: 'Atividade 1.1 — Questionário',
          value: atividade11Submitted ? `${atividade11Score}%` : 'Pendente',
          sub: atividade11Submitted
            ? atividade11Score >= 70
              ? 'Compreensão consistente'
              : 'Revise os blocos teóricos'
            : 'Volte e complete a atividade',
          ok: atividade11Submitted && atividade11Score >= 70,
        },
        {
          icon: '💬',
          label: 'Atividade 1.2 — Discursiva',
          value: atividade12Submitted ? 'Enviado ✓' : 'Pendente',
          sub: atividade12Submitted
            ? 'Resposta registrada com critérios visíveis'
            : 'Volte e submeta sua reflexão',
          ok: atividade12Submitted,
        },
        {
          icon: '🛠',
          label: 'Prática guiada (cupom)',
          value: guidedPracticeSubmitted ? 'Concluída ✓' : 'Pendente',
          sub: guidedPracticeSubmitted
            ? 'Cadeia erro → defeito → falha aplicada'
            : 'Volte e identifique a cadeia',
          ok: guidedPracticeSubmitted,
        },
        {
          icon: '✏️',
          label: 'Prática independente (biblioteca)',
          value: independentPracticeSubmitted ? 'Enviado ✓' : 'Pendente',
          sub: independentPracticeSubmitted
            ? 'Caso de teste proposto'
            : 'Volte e proponha um caso de teste',
          ok: independentPracticeSubmitted,
        },
      ]
    : [
        {
          icon: '🧪',
          label: 'Quiz de Conhecimentos Prévios',
          value: `${priorKnowledgeScore}%`,
          sub: priorKnowledgeScore >= 75 ? 'Ótimo começo!' : priorKnowledgeScore >= 50 ? 'Boa base' : 'Muito a aprender',
          ok: priorKnowledgeScore >= 50,
        },
        {
          icon: '🧩',
          label: 'Prática Guiada',
          value: guidedPracticeSubmitted ? 'Concluída ✓' : 'Pendente',
          sub: guidedPracticeSubmitted ? 'Resposta registrada' : 'Volte e responda',
          ok: guidedPracticeSubmitted,
        },
        {
          icon: '📝',
          label: 'Prática Independente',
          value: independentPracticeSubmitted ? 'Enviado ✓' : 'Não enviado',
          sub: independentPracticeSubmitted ? 'Caso de teste escrito' : 'Volte e complete',
          ok: independentPracticeSubmitted,
        },
      ];

  const tips = isRich
    ? [
        'Erro humano → Defeito no artefato → Falha observada (cadeia causal).',
        'Teste revela defeitos; não prova ausência total deles.',
        'Custo de correção cresce conforme o defeito se propaga pelo ciclo.',
        'Qualidade é multidimensional: corretude, confiabilidade, usabilidade, manutenibilidade.',
        'Teste e depuração são atividades distintas e complementares.',
      ]
    : [
        'Erro → Defeito → Falha (etapas diferentes de um bug)',
        'Testar garante qualidade — não apenas encontra bugs',
        'AVL: teste os valores nas bordas e além das bordas',
      ];

  const passingThreshold = isRich ? 70 : 75;

  return (
    <Layout showProgress>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <h1 className="tl-title" style={{ margin: '0 0 0.25rem', fontSize: '1.5rem' }}>
            Como estou indo?
          </h1>
          <p style={{ margin: 0, color: '#3d6a28', fontSize: '0.875rem' }}>
            Resumo do seu desempenho nesta unidade até aqui.
          </p>
        </div>

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
                border: `2px solid ${item.ok ? '#2d8f2d' : '#c0a000'}`,
                background: item.ok ? '#d4f0c0' : '#fffde0',
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 800,
                    fontSize: '0.875rem',
                    color: item.ok ? '#0a4f0a' : '#7a6000',
                  }}
                >
                  {item.label}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: '0.78rem',
                    color: item.ok ? '#1a6a1a' : '#7a6000',
                  }}
                >
                  {item.sub}
                </p>
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '0.875rem',
                  color: item.ok ? '#0a4f0a' : '#7a6000',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="tl-card" style={{ borderColor: 'var(--tl-title)' }}>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.8rem' }}>🌟</span>
            <div>
              <p style={{ margin: '0 0 4px', fontWeight: 800, color: '#1a4a10' }}>
                Avaliação Final a seguir!
              </p>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#2d5a1e', lineHeight: 1.5 }}>
                A <strong>Avaliação Final</strong> tem {isRich ? '10' : '4'} questões. Você precisa de{' '}
                <strong>{passingThreshold}% ou mais</strong> para desbloquear o Desafio Aplicado.
                Se não passar, poderá rever os blocos relacionados aos erros e tentar novamente.
              </p>
            </div>
          </div>
        </div>

        <div className="tl-card" style={{ background: '#e4f4ff', borderColor: '#5588cc' }}>
          <p style={{ margin: '0 0 0.5rem', fontWeight: 800, color: '#224488' }}>
            🔑 Conceitos-chave para lembrar:
          </p>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: 'none',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            {tips.map((tip, i) => (
              <li
                key={i}
                style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: '#224488', lineHeight: 1.5 }}
              >
                <span style={{ color: '#2d8f2d', fontWeight: 800, flexShrink: 0 }}>✓</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            className="tl-btn-ghost"
            onClick={() => {
              const prev = previousPage('feedback', unit) ?? 'independent-practice';
              navigateTo(prev);
            }}
          >
            ← Voltar
          </button>
          <button className="tl-btn" onClick={() => navigateTo('final-assessment')}>
            Avaliação Final →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default FeedbackPage;
