import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import ladybugs from '../assets/ladybug.png';
import bug from '../assets/bug.webp';


const HomePage: React.FC = () => {
  const { user, navigateTo, unitScores } = useApp();
  const completedUnits = Object.keys(unitScores).length;
  const avgScore =
    completedUnits > 0
      ? Math.round(Object.values(unitScores).reduce((a, b) => a + b, 0) / completedUnits)
      : null;

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Hero */}
        <div
          className="tl-card"
          style={{
            background: 'linear-gradient(135deg, #3d8c2d 0%, #5aaa38 100%)',
            border: '2px solid #2d6e18',
            color: '#fff',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}>
              <img src={ladybugs} alt="Minha imagem" style={{ width: '150px'}} /> 
          </div>
          <h1 style={{ margin: 0, fontSize: '1.6rem', color: '#fff', fontWeight: 900 }}>
            Olá, bem-vindo, {user?.name}!
          </h1>
          <p style={{ margin: '0.5rem 0 0', color: '#d4f0b0', fontWeight: 600 }}>
            Pronto para aprender sobre Testes de Software?
          </p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {[
            { icon:<img src={bug} alt="Minha imagem" style={{ width: '60px', display: 'block', margin: '0 auto'}}/> , value: units.length, label: 'Unidades' },
            { icon:<img src={bug} alt="Minha imagem" style={{ width: '60px', display: 'block', margin: '0 auto'}}/>, value: completedUnits, label: 'Unidade Concluída' },
            { icon:<img src={bug} alt="Minha imagem" style={{ width: '60px', display: 'block', margin: '0 auto'}}/>, value: avgScore !== null ? `${avgScore}%` : '--', label: 'Média de acertos' },
          ].map((s) => (
            <div
              key={s.label}
              className="tl-card"
              style={{ textAlign: 'center', padding: '1rem 0.5rem' }}
            >
              <div style={{ fontSize: '1.8rem' }}>{s.icon}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--tl-title)' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#2d6e18' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Units list */}
        <div>
          <h2 className="tl-title" style={{ margin: '0 0 0.75rem' }}>
            Sua Trilha de Aprendizagem
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {units.map((unit) => {
              const score = unitScores[unit.id];
              const passed = score !== undefined && score >= 75;
              return (
                <div
                  key={unit.id}
                  className="tl-card"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '0.75rem 1rem',
                    borderLeft: `5px solid ${passed ? '#2d8f2d' : score !== undefined ? '#cc0000' : 'var(--tl-card-border)'}`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{unit.icon}</span>
                    <div>
                      <p style={{ margin: 0, fontWeight: 800, color: '#1a4a10' }}>{unit.title}</p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#3d7030' }}>{unit.subtitle}</p>
                    </div>
                  </div>
                  {score !== undefined && (
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: '0.8rem',
                        padding: '2px 8px',
                        borderRadius: 4,
                        background: passed ? '#c0f0c0' : '#f9d0d0',
                        color: passed ? '#0a4f0a' : '#660000',
                        border: `1px solid ${passed ? '#2d8f2d' : '#8b0000'}`,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {passed ? '✓' : '✗'} {score}%
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingTop: '0.5rem' }}>
          <button className="tl-btn" onClick={() => navigateTo('units')} style={{ padding: '10px 32px', fontSize: '1rem' }}>
            Ir para Unidades →
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
