import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight, AlertCircle, Sun, Moon, GitMerge, Lock, Mail } from 'lucide-react';
import { authService } from '../services/api';

/* ─── Shared design-system styles (same token set as LandingPage) ─────── */
const Styles = () => (
  <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
            font-family: 'Geist', 'Inter', system-ui, sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .auth-serif { font-family: 'Instrument Serif', Georgia, serif; }

        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
            0%   { background-position: -200% center; }
            100% { background-position:  200% center; }
        }
        @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(-1deg); }
            50%       { transform: translateY(-8px) rotate(-1deg); }
        }
        @keyframes float2 {
            0%, 100% { transform: translateY(0px) rotate(2deg); }
            50%       { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes ping-soft {
            0%, 100% { transform: scale(1); opacity: 1; }
            50%       { transform: scale(1.5); opacity: 0; }
        }

        .anim-fade-up  { animation: fadeUp 0.5s ease both; }
        .delay-1 { animation-delay: 0.08s; }
        .delay-2 { animation-delay: 0.16s; }
        .delay-3 { animation-delay: 0.24s; }
        .delay-4 { animation-delay: 0.34s; }

        .shimmer-btn {
            background: linear-gradient(90deg, #1d4ed8, #4f46e5, #1d4ed8);
            background-size: 200% auto;
            animation: shimmer 3s linear infinite;
            transition: transform 0.15s, box-shadow 0.15s;
            border: none; cursor: pointer;
        }
        .shimmer-btn:hover {
            transform: translateY(-1px);
            box-shadow: 0 8px 28px rgba(29,78,216,0.35);
        }
        .shimmer-btn:disabled {
            opacity: 0.6; cursor: not-allowed; transform: none;
        }

        .gradient-text {
            background: linear-gradient(135deg, #1d4ed8 0%, #6366f1 55%, #8b5cf6 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .dot-pattern {
            background-image: radial-gradient(circle, rgba(148,163,184,0.3) 1px, transparent 1px);
            background-size: 22px 22px;
        }

        .live-dot::before {
            content: '';
            display: inline-block;
            width: 6px; height: 6px;
            border-radius: 50%;
            background: #22c55e;
            animation: ping-soft 2s ease-in-out infinite;
            margin-right: 6px;
            vertical-align: middle;
        }

        /* Input focus ring */
        .auth-input {
            width: 100%; font-family: inherit;
            height: 44px; padding: 0 14px 0 42px;
            border-radius: 10px; font-size: 14px;
            outline: none;
            transition: border-color 0.15s, box-shadow 0.15s;
        }
        .auth-input:focus {
            border-color: #2563eb !important;
            box-shadow: 0 0 0 3px rgba(37,99,235,0.12);
        }
        .auth-input::placeholder { color: #9ca3af; }

        /* Light */
        .auth-input-light {
            background: #f9fafb; border: 1.5px solid #e5e7eb; color: #0f172a;
        }
        /* Dark */
        .auth-input-dark {
            background: #0d1220; border: 1.5px solid rgba(255,255,255,0.1); color: #f0f4ff;
        }
        .auth-input-dark::placeholder { color: #4b5563; }
        .auth-input-dark:focus {
            border-color: #3b82f6 !important;
            box-shadow: 0 0 0 3px rgba(59,130,246,0.15);
        }

        .float-card  { animation: float 5s ease-in-out infinite; }
        .float-card2 { animation: float2 4.5s 1s ease-in-out infinite; }

        /* Checkbox */
        .auth-check { accent-color: #2563eb; width: 15px; height: 15px; cursor: pointer; }
    `}</style>
);

const PLATFORMS = [
  { name: 'LeetCode', logo: 'https://cdn.simpleicons.org/leetcode/FFA116', stat: '214 solved', accent: '#FFA116', light: '#fff7ed', border: '#fed7aa' },
  { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/181717', stat: '847 commits', accent: '#181717', light: '#f6f8fa', border: '#d1d5db' },
  { name: 'HackerRank', logo: 'https://cdn.simpleicons.org/hackerrank/2EC866', stat: '5★ Rating', accent: '#2EC866', light: '#f0fdf4', border: '#86efac' },
  { name: 'Codeforces', logo: 'https://cdn.simpleicons.org/codeforces/1F8ACB', stat: 'Rating 1642', accent: '#1F8ACB', light: '#eff8ff', border: '#93c5fd' },
];

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [dark, setDark] = useState(false);

  const D = dark; // shorthand

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await authService.login(formData);
      if (data.role === 'mentor') navigate('/mentor');
      else navigate('/student');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Colors ── */
  const rootBg = D ? '#080c14' : '#f8faff';
  const textMain = D ? '#f0f4ff' : '#0f172a';
  const textSub = D ? '#94a3b8' : '#6b7280';
  const cardBg = D ? '#111827' : '#ffffff';
  const cardBdr = D ? 'rgba(255,255,255,0.08)' : '#e5e7eb';
  const pillBg = D ? 'rgba(99,102,241,0.15)' : '#eff6ff';
  const pillClr = D ? '#a5b4fc' : '#2563eb';
  const pillBdr = D ? 'rgba(99,102,241,0.3)' : '#bfdbfe';
  const linkClr = D ? '#818cf8' : '#2563eb';
  const toggleBg = D ? '#1e2a3d' : '#f3f4f6';
  const toggleBdr = D ? 'rgba(255,255,255,0.1)' : '#e5e7eb';

  return (
    <div className="auth-root" style={{ minHeight: '100vh', background: rootBg, display: 'flex', transition: 'background 0.3s' }}>
      <Styles />

      {/* ── LEFT PANEL ─────────────────────────────────────────────── */}
      <div style={{
        width: '45%', minHeight: '100vh', position: 'relative',
        background: D ? '#0d1220' : '#0f172a',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        flexShrink: 0,
      }} className="hidden lg:flex">

        {/* Glows */}
        <div style={{ position: 'absolute', top: '-15%', left: '-15%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(99,102,241,0.18)', filter: 'blur(80px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(14,165,233,0.15)', filter: 'blur(70px)', pointerEvents: 'none' }} />
        <div className="dot-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.25, pointerEvents: 'none' }} />

        {/* Brand */}
        <div style={{ padding: '48px 52px 0', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 48 }}>
            <img
              src="/logo.png"
              alt="MergeRank"
              style={{ width: 34, height: 34, objectFit: "contain" }}
            />
            <span style={{ fontSize: 18, fontWeight: 700, color: '#f0f4ff', letterSpacing: '-0.02em' }}>MergeRank</span>
          </div>

          <h2 className="auth-serif" style={{ fontSize: 'clamp(30px,3vw,42px)', lineHeight: 1.1, fontWeight: 400, color: '#f0f4ff', marginBottom: 16 }}>
            Your stats are waiting.<br />
            <span style={{ color: '#818cf8', fontStyle: 'italic' }}>Pick up where<br />you left off.</span>
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#64748b', maxWidth: 320 }}>
            Your leaderboard position, streak, and AI recommendations are syncing in real time.
          </p>
        </div>

        {/* Floating platform cards */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1, padding: '0 52px' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: 340, height: 280 }}>

            {/* Central hub */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/logo.png"
                alt="MergeRank"
                style={{ width: 34, height: 34, objectFit: "contain" }}
              />
            </div>

            {/* Connection lines */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }} viewBox="0 0 340 280" preserveAspectRatio="none">
              {[[170, 140, 170, 30], [170, 140, 310, 140], [170, 140, 170, 250], [170, 140, 30, 140]].map(([x1, y1, x2, y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(99,102,241,0.3)" strokeWidth="1" strokeDasharray="5,4" />
              ))}
            </svg>

            {/* Platform nodes */}
            {[
              { p: PLATFORMS[0], top: '0%', left: '50%', transform: 'translate(-50%,0)' },
              { p: PLATFORMS[1], top: '50%', left: '100%', transform: 'translate(-100%,-50%)' },
              { p: PLATFORMS[2], top: '100%', left: '50%', transform: 'translate(-50%,-100%)' },
              { p: PLATFORMS[3], top: '50%', left: '0%', transform: 'translate(0,-50%)' },
            ].map(({ p, top, left, transform }, i) => (
              <div key={i} style={{ position: 'absolute', top, left, transform, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', transition: 'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                  <img src={p.logo} alt={p.name} style={{ width: 22, height: 22, objectFit: 'contain' }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 600, color: '#64748b', whiteSpace: 'nowrap' }}>{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat strip */}
        <div style={{ padding: '24px 52px', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 20, flexWrap: 'wrap', position: 'relative', zIndex: 1 }}>
          {[['500+', 'Students'], ['12+', 'Colleges'], ['5', 'Platforms']].map(([n, l], i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: '#f0f4ff' }}>{n}</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── RIGHT PANEL ────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', background: rootBg, transition: 'background 0.3s' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 32px', borderBottom: `1px solid ${D ? 'rgba(255,255,255,0.06)' : '#f0f0f0'}` }}>
          {/* Mobile logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }} className="lg:hidden">
            <img
              src="/logo.png"
              alt="MergeRank"
              style={{ width: 34, height: 34, objectFit: "contain" }}
            />
            <span style={{ fontSize: 15, fontWeight: 700, color: textMain }}>MergeRank</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginLeft: 'auto' }}>
            <span style={{ fontSize: 14, color: textSub }}>
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 600, color: linkClr, padding: 0 }}>
                Sign up
              </button>
            </span>
            <button
              onClick={() => setDark(d => !d)}
              style={{ width: 34, height: 34, borderRadius: 8, border: `1px solid ${toggleBdr}`, background: toggleBg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: D ? '#fbbf24' : '#6b7280', transition: 'all 0.2s' }}
              aria-label="Toggle theme"
            >
              {D ? <Sun style={{ width: 15, height: 15 }} /> : <Moon style={{ width: 15, height: 15 }} />}
            </button>
          </div>
        </div>

        {/* Form centred */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
          <div style={{ width: '100%', maxWidth: 400 }}>

            {/* Heading */}
            <div className="anim-fade-up" style={{ marginBottom: 32 }}>
              <h1 className="auth-serif" style={{ fontSize: 36, fontWeight: 400, lineHeight: 1.12, color: textMain, marginBottom: 8 }}>
                Welcome back<span className="gradient-text">.</span>
              </h1>
              <p style={{ fontSize: 14, color: textSub, lineHeight: 1.6 }}>
                Sign in to view your batch leaderboard and AI recommendations.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="anim-fade-up" style={{ marginBottom: 20, padding: '12px 14px', background: D ? 'rgba(239,68,68,0.1)' : '#fef2f2', border: `1px solid ${D ? 'rgba(239,68,68,0.25)' : '#fecaca'}`, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: D ? '#fca5a5' : '#dc2626' }}>
                <AlertCircle style={{ width: 15, height: 15, flexShrink: 0 }} />
                {error}
              </div>
            )}

            {/* Card */}
            <div className="anim-fade-up delay-1" style={{ background: cardBg, border: `1px solid ${cardBdr}`, borderRadius: 20, padding: 28, boxShadow: D ? '0 20px 60px rgba(0,0,0,0.4)' : '0 8px 40px rgba(0,0,0,0.07)' }}>
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

                {/* Email */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: D ? '#64748b' : '#9ca3af', marginBottom: 8 }}>Email Address</label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ width: 16, height: 16, position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: D ? '#4b5563' : '#9ca3af' }} />
                    <input
                      type="email" required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@college.edu"
                      className={`auth-input ${D ? 'auth-input-dark' : 'auth-input-light'}`}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.07em', color: D ? '#64748b' : '#9ca3af', marginBottom: 8 }}>Password</label>
                  <div style={{ position: 'relative' }}>
                    <Lock style={{ width: 16, height: 16, position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: D ? '#4b5563' : '#9ca3af' }} />
                    <input
                      type={showPass ? 'text' : 'password'} required
                      value={formData.password}
                      onChange={e => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
                      className={`auth-input ${D ? 'auth-input-dark' : 'auth-input-light'}`}
                      style={{ paddingRight: 42 }}
                    />
                    <button type="button" onClick={() => setShowPass(v => !v)}
                      style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: D ? '#4b5563' : '#9ca3af', display: 'flex', alignItems: 'center', transition: 'color 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#2563eb'}
                      onMouseLeave={e => e.currentTarget.style.color = D ? '#4b5563' : '#9ca3af'}
                    >
                      {showPass ? <EyeOff style={{ width: 15, height: 15 }} /> : <Eye style={{ width: 15, height: 15 }} />}
                    </button>
                  </div>
                </div>

                {/* Remember / Forgot */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: textSub, cursor: 'pointer' }}>
                    <input type="checkbox" className="auth-check" />
                    Remember me
                  </label>
                  <a href="#" style={{ fontSize: 13, fontWeight: 600, color: linkClr, textDecoration: 'none', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => e.target.style.opacity = 0.75}
                    onMouseLeave={e => e.target.style.opacity = 1}>
                    Forgot password?
                  </a>
                </div>

                {/* Submit */}
                <button type="submit" disabled={loading} className="shimmer-btn"
                  style={{ width: '100%', height: 46, borderRadius: 12, fontSize: 15, fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
                  {loading ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" style={{ animation: 'spin 0.8s linear infinite', transformOrigin: 'center' }} />
                      </svg>
                      Signing in…
                    </span>
                  ) : (
                    <>Sign In <ArrowRight style={{ width: 16, height: 16 }} /></>
                  )}
                </button>
              </form>
            </div>

            {/* Divider + platform strip */}
            <div className="anim-fade-up delay-2" style={{ marginTop: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{ flex: 1, height: 1, background: D ? 'rgba(255,255,255,0.07)' : '#f0f0f0' }} />
                <span style={{ fontSize: 12, color: D ? '#374151' : '#d1d5db', fontWeight: 500, whiteSpace: 'nowrap' }}>We sync from</span>
                <div style={{ flex: 1, height: 1, background: D ? 'rgba(255,255,255,0.07)' : '#f0f0f0' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
                {PLATFORMS.map(p => (
                  <div key={p.name} title={p.name} style={{ width: 36, height: 36, borderRadius: 10, background: D ? 'rgba(255,255,255,0.05)' : '#f9fafb', border: `1px solid ${D ? 'rgba(255,255,255,0.08)' : '#f0f0f0'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <img src={p.logo} alt={p.name} style={{ width: 18, height: 18, objectFit: 'contain' }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Sign up link */}
            <p className="anim-fade-up delay-3" style={{ textAlign: 'center', fontSize: 13, color: textSub, marginTop: 24 }}>
              Don't have an account?{' '}
              <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: linkClr, padding: 0 }}>
                Create one →
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}