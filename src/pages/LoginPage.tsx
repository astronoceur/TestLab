import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import ladybugs from '../assets/ladybug.png';

type Mode = 'login' | 'register';

const LoginPage: React.FC = () => {
  const { login, register, navigateTo } = useApp();

  const [mode, setMode] = useState<Mode>('login');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Preencha e-mail e senha.');
      return;
    }
    const result = login(loginEmail.trim(), loginPassword);
    if (!result.ok) {
      setLoginError(result.error ?? 'Erro ao entrar.');
    } else {
      navigateTo('home');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');
    if (!regName.trim() || !regEmail.trim() || !regPassword.trim()) {
      setRegError('Preencha todos os campos.');
      return;
    }
    if (!regEmail.includes('@')) {
      setRegError('E-mail inválido.');
      return;
    }
    if (regPassword.length < 4) {
      setRegError('Senha deve ter pelo menos 4 caracteres.');
      return;
    }
    if (regPassword !== regConfirm) {
      setRegError('As senhas não conferem.');
      return;
    }
    const result = register(regName.trim(), regEmail.trim(), regPassword);
    if (!result.ok) {
      setRegError(result.error ?? 'Erro ao cadastrar.');
    } else {
      setRegSuccess('Cadastro realizado! Agora faça login.');
      setRegName(''); setRegEmail(''); setRegPassword(''); setRegConfirm('');
      setTimeout(() => { setMode('login'); setRegSuccess(''); }, 1800);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--tl-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: 380 }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem', display: 'flex', justifyContent: 'center' }}><img src={ladybugs} alt="Minha imagem" style={{ width: '150px'}} /></div>
          <h1 className="tl-title" style={{ fontSize: '2rem', margin: 0 }}>
            Test Lab
          </h1>
          <p style={{ color: '#2d6e18', fontWeight: 700, marginTop: 4 }}>
            Plataforma de Ensino de Testes de Software
          </p>
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            border: '2px solid var(--tl-card-border)',
            borderRadius: 8,
            overflow: 'hidden',
            marginBottom: '1rem',
          }}
        >
          {(['login', 'register'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setLoginError(''); setRegError(''); setRegSuccess(''); }}
              style={{
                flex: 1,
                padding: '8px 0',
                fontWeight: 800,
                fontFamily: 'inherit',
                fontSize: '0.9rem',
                border: 'none',
                cursor: 'pointer',
                background: mode === m ? 'var(--tl-title)' : 'var(--tl-card-bg)',
                color: mode === m ? '#fff' : '#2d6e18',
                transition: 'background 0.15s',
              }}
            >
              {m === 'login' ? 'Entrar' : 'Cadastrar'}
            </button>
          ))}
        </div>

        {/* ── LOGIN FORM ── */}
        {mode === 'login' && (
          <div className="tl-card">
            <h2 className="tl-title" style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem' }}>
              Login
            </h2>
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label className="tl-label">E-mail:</label>
                <input
                  className="tl-input"
                  type="email"
                  value={loginEmail}
                  onChange={(e) => { setLoginEmail(e.target.value); setLoginError(''); }}
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="tl-label">Senha:</label>
                <input
                  className="tl-input"
                  type="password"
                  value={loginPassword}
                  onChange={(e) => { setLoginPassword(e.target.value); setLoginError(''); }}
                  placeholder="••••••"
                />
              </div>
              {loginError && (
                <p style={{ color: 'var(--tl-title)', fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>
                  ⚠ {loginError}
                </p>
              )}
              <button type="submit" className="tl-btn" style={{ marginTop: 4 }}>
                Entrar →
              </button>
            </form>
            <p style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.75rem', textAlign: 'center' }}>
              Não tem conta?{' '}
              <button
                onClick={() => setMode('register')}
                style={{ background: 'none', border: 'none', color: 'var(--tl-title)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.78rem' }}
              >
                Cadastre-se
              </button>
            </p>
          </div>
        )}

        {/* ── REGISTER FORM ── */}
        {mode === 'register' && (
          <div className="tl-card">
            <h2 className="tl-title" style={{ fontSize: '1.1rem', marginTop: 0, marginBottom: '1rem' }}>
              Cadastrar
            </h2>
            <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <label className="tl-label">Nome de usuário:</label>
                <input
                  className="tl-input"
                  type="text"
                  value={regName}
                  onChange={(e) => { setRegName(e.target.value); setRegError(''); }}
                  placeholder="ex: Usuário1"
                />
              </div>
              <div>
                <label className="tl-label">E-mail:</label>
                <input
                  className="tl-input"
                  type="email"
                  value={regEmail}
                  onChange={(e) => { setRegEmail(e.target.value); setRegError(''); }}
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="tl-label">Senha:</label>
                <input
                  className="tl-input"
                  type="password"
                  value={regPassword}
                  onChange={(e) => { setRegPassword(e.target.value); setRegError(''); }}
                  placeholder="mínimo 4 caracteres"
                />
              </div>
              <div>
                <label className="tl-label">Confirmar Senha:</label>
                <input
                  className="tl-input"
                  type="password"
                  value={regConfirm}
                  onChange={(e) => { setRegConfirm(e.target.value); setRegError(''); }}
                  placeholder="repita a senha"
                />
              </div>
              {regError && (
                <p style={{ color: 'var(--tl-title)', fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>
                  ⚠ {regError}
                </p>
              )}
              {regSuccess && (
                <p style={{ color: 'var(--tl-success)', fontWeight: 700, fontSize: '0.85rem', margin: 0 }}>
                  ✓ {regSuccess}
                </p>
              )}
              <button type="submit" className="tl-btn" style={{ marginTop: 4 }}>
                Cadastrar ✓
              </button>
            </form>
            <p style={{ fontSize: '0.78rem', color: '#555', marginTop: '0.75rem', textAlign: 'center' }}>
              Já tem conta?{' '}
              <button
                onClick={() => setMode('login')}
                style={{ background: 'none', border: 'none', color: 'var(--tl-title)', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.78rem' }}
              >
                Fazer login
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
