import React from 'react';
import { useApp } from '../context/AppContext';
import Layout from '../components/Layout';
import { units } from '../data/units';
import ladybugs from '../assets/perfil_ladybug.png';

const UnitsPage: React.FC = () => {
  const { navigateTo, setCurrentUnit, unitScores, resetUnitProgress } = useApp();

  const handleStart = (unitId: number) => {
    setCurrentUnit(unitId);
    resetUnitProgress();
    navigateTo('welcome');
  };

  return (
    <Layout>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="tl-title" style={{ fontSize: '1.5rem', margin: '0 0 0.25rem' }}>
            Bem-vindo! Escolha a Unidade que deseja continuar
          </h1>
          <p style={{ color: '#2d6e18', fontWeight: 600, margin: 0, fontSize: '0.9rem' }}>
            Selecione uma unidade para começar ou continuar seu aprendizado.
          </p>
        </div>

        {/* Unit icon grid (reference style) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.75rem',
          }}
        >
          {units.map((unit) => {
            const score = unitScores[unit.id];
            const passed = score !== undefined && score >= 75;
            return (
              <button
                key={unit.id}
                onClick={() => handleStart(unit.id)}
                style={{
                  background: score !== undefined
                    ? passed ? '#c0f0c0' : '#f9d0d0'
                    : 'var(--tl-card-bg)',
                  border: `2px solid ${score !== undefined ? (passed ? '#2d8f2d' : '#8b0000') : 'var(--tl-card-border)'}`,
                  borderRadius: 10,
                  padding: '0.75rem 0.5rem',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.4rem',
                  fontFamily: 'inherit',
                  transition: 'transform 0.1s, box-shadow 0.1s',
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.06)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              >
                <span style={{ fontSize: '3rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><img src={ladybugs} alt="Minha imagem" style={{ width: '150px'}} /></span>
                <span style={{ fontWeight: 800, fontSize: '0.78rem', color: 'var(--tl-title)' }}>
                  {unit.title}
                </span>
                {score !== undefined && (
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: passed ? '#0a4f0a' : '#660000' }}>
                    {passed ? '✓' : '✗'} {score}%
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Detailed unit cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {units.map((unit) => {
            const score = unitScores[unit.id];
            const completed = score !== undefined;
            const passed = completed && score >= 75;

            return (
              <div
                key={unit.id}
                className="tl-card"
                style={{
                  borderLeft: `5px solid ${passed ? '#2d8f2d' : completed ? '#8b0000' : 'var(--tl-card-border)'}`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', flex: 1 }}>
                    <span style={{ fontSize: '2rem', flexShrink: 0 }}>🐞</span>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: 2 }}>
                        <span style={{ fontWeight: 900, color: 'var(--tl-title)', fontSize: '1rem' }}>
                          {unit.title}
                        </span>
                        {completed && (
                          <span
                            style={{
                              fontSize: '0.72rem',
                              fontWeight: 800,
                              padding: '1px 6px',
                              borderRadius: 4,
                              background: passed ? '#c0f0c0' : '#f9d0d0',
                              color: passed ? '#0a4f0a' : '#660000',
                              border: `1px solid ${passed ? '#2d8f2d' : '#8b0000'}`,
                            }}
                          >
                            {passed ? '✓ Aprovado' : '✗ Reprovado'} · {score}%
                          </span>
                        )}
                      </div>
                      <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#2d6e18', fontSize: '0.875rem' }}>
                        {unit.subtitle}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.8rem', color: '#4a7a3a', lineHeight: 1.4 }}>
                        {unit.description}
                      </p>
                    </div>
                  </div>
                  <button
                    className="tl-btn"
                    onClick={() => handleStart(unit.id)}
                    style={{ flexShrink: 0 }}
                  >
                    {completed ? 'Refazer' : 'Iniciar'} →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default UnitsPage;
