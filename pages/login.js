import { useState, useEffect } from 'react';
import Router from 'next/router';
import { theme } from '../styles/theme';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dbStatus, setDbStatus] = useState({ status: 'checking', message: 'Checking...' });

  useEffect(() => {
    // Check database connection on mount
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setDbStatus({ status: 'connected', message: 'Database Connected' });
        } else {
          setDbStatus({ status: 'error', message: 'Database Error' });
        }
      })
      .catch(() => {
        setDbStatus({ status: 'error', message: 'Connection Failed' });
      });
  }, []);

  async function submit(e){
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if(res.ok){
        Router.push('/admin/dashboard');
      } else {
        setError(data.message || 'Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={submit}>
        <div className="status-indicator">
          <span className={`status-dot ${dbStatus.status}`}></span>
          <span className="status-text">{dbStatus.message}</span>
        </div>

        <h2>Admin Sign In</h2>
        <p className="subtitle">Enter your credentials to access the admin panel</p>
        
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input 
            id="email"
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            placeholder="admin@multiartwork.local"
            required
            autoComplete="email"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            autoComplete="current-password"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        
        <div className="hint">
          <small>Default: admin@multiartwork.local / AdminPass123</small>
        </div>
      </form>

      <style jsx>{`
        .auth-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background: linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%);
        }

        .auth-form {
          background: #1A1A1A;
          border: 1px solid #2A2A2A;
          position: relative;
        }

        .status-indicator {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8125rem;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        .status-dot.checking {
          background: #FFA500;
        }

        .status-dot.connected {
          background: #00FF66;
        }

        .status-dot.error {
          background: #FF4444;
          animation: none;
        }

        .status-text {
          color: #A0A0A0;
          font-size: 0.875rem;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
          border-radius: 16px;
          padding: 48px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
        }

        h2 {
          color: #FFFFFF;
          font-size: 2rem;
          font-weight: 700;
          margin: 0 0 8px 0;
          text-align: center;
        }

        .subtitle {
          color: #A0A0A0;
          font-size: 0.9375rem;
          text-align: center;
          margin: 0 0 32px 0;
        }

        .error {
          background: rgba(255, 68, 68, 0.1);
          border: 1px solid rgba(255, 68, 68, 0.3);
          color: #FF4444;
          padding: 12px 16px;
          border-radius: 8px;
          margin-bottom: 24px;
          font-size: 0.9375rem;
          text-align: center;
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          color: #E0E0E0;
          font-size: 0.9375rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        input {
          width: 100%;
          background: #0F0F0F;
          border: 1px solid #2A2A2A;
          border-radius: 8px;
          padding: 14px 16px;
          color: #FFFFFF;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        input:focus {
          outline: none;
          border-color: ${theme.colors.primary};
          box-shadow: 0 0 0 3px rgba(0, 102, 255, 0.1);
        }

        input::placeholder {
          color: #606060;
        }

        button {
          width: 100%;
          background: linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent});
          border: none;
          border-radius: 8px;
          padding: 14px 24px;
          color: #FFFFFF;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 8px;
        }

        button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 102, 255, 0.3);
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .hint {
          margin-top: 20px;
          text-align: center;
          color: #606060;
          font-size: 0.875rem;
        }

        @media (max-width: 480px) {
          .auth-form {
            padding: 32px 24px;
          }
        }
      `}</style>
    </div>
  );
}
