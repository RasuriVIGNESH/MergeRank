import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Trophy, BrainCircuit, LineChart, Users, ShieldCheck,
    ArrowRight, BellRing, Activity, ChevronRight, Sun, Moon,
    TrendingUp, Code2, Zap, BarChart3, Lock, CheckCircle2, Sparkles, BookOpen, Target, Award, Eye
} from 'lucide-react';

/* ─── Injected Global Styles ─────────────────────────────────────────────── */
const Styles = () => (
    <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; }

    .mr-root {
        font-family: 'Geist', 'Inter', system-ui, sans-serif;
        -webkit-font-smoothing: antialiased;
    }
    .mr-serif { font-family: 'Instrument Serif', Georgia, serif; }

    /* ── Animations ── */
    @keyframes fadeUp {
        from { opacity: 0; transform: translateY(18px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes marquee {
        0%   { transform: translateX(0); }
        100% { transform: translateX(-50%); }
    }
    @keyframes ping-soft {
        0%, 100% { transform: scale(1); opacity: 1; }
        50%       { transform: scale(1.4); opacity: 0; }
    }
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50%       { transform: translateY(-6px); }
    }
    @keyframes shimmer {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
    }
    @keyframes bar-grow {
        from { width: 0; }
    }

    .anim-fade-up   { animation: fadeUp 0.55s ease both; }
    .anim-delay-1   { animation-delay: 0.10s; }
    .anim-delay-2   { animation-delay: 0.20s; }
    .anim-delay-3   { animation-delay: 0.32s; }
    .anim-delay-4   { animation-delay: 0.44s; }
    .anim-delay-5   { animation-delay: 0.56s; }

    .marquee-wrap   { overflow: hidden; }
    .marquee-track  { display: flex; width: max-content; animation: marquee 30s linear infinite; }
    .marquee-wrap:hover .marquee-track { animation-play-state: paused; }

    .float-card     { animation: float 4s ease-in-out infinite; }
    .float-card-2   { animation: float 4s 1.2s ease-in-out infinite; }
    .float-card-3   { animation: float 4s 2.4s ease-in-out infinite; }

    .live-dot::before {
        content: '';
        display: inline-block;
        width: 7px; height: 7px;
        border-radius: 50%;
        background: #22c55e;
        animation: ping-soft 2s ease-in-out infinite;
        margin-right: 6px;
        vertical-align: middle;
    }

    .gradient-text {
        background: linear-gradient(135deg, #1d4ed8 0%, #6366f1 55%, #8b5cf6 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .shimmer-btn {
        background: linear-gradient(90deg, #1d4ed8, #4f46e5, #1d4ed8);
        background-size: 200% auto;
        animation: shimmer 3s linear infinite;
        transition: transform 0.15s, box-shadow 0.15s;
    }
    .shimmer-btn:hover {
        transform: translateY(-1px);
        box-shadow: 0 8px 28px rgba(29,78,216,0.35);
    }

    .card-lift {
        transition: transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.22s ease;
    }
    .card-lift:hover {
        transform: translateY(-3px);
        box-shadow: 0 16px 48px rgba(0,0,0,0.08);
    }

    /* Dark mode overrides */
    .dark-root { background: #080c14; color: #f0f4ff; }
    .dark-root .nav-bar { background: rgba(8,12,20,0.85); border-color: rgba(255,255,255,0.07); }
    .dark-root .hero-bg { background: radial-gradient(ellipse 70% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%); }
    .dark-root .section-bg { background: #0d1220; border-color: rgba(255,255,255,0.06); }
    .dark-root .card-bg { background: #111827; border-color: rgba(255,255,255,0.07); }
    .dark-root .muted { color: #94a3b8; }
    .dark-root .surface { background: #1e2a3d; }
    .dark-root .divider { border-color: rgba(255,255,255,0.07); }
    .dark-root .text-main { color: #f0f4ff; }
    .dark-root .text-sub { color: #94a3b8; }
    .dark-root .pill-badge { background: rgba(99,102,241,0.15); color: #a5b4fc; border-color: rgba(99,102,241,0.3); }
    .dark-root .tag-ready { background: rgba(34,197,94,0.12); color: #4ade80; }
    .dark-root .tag-needs  { background: rgba(234,179,8,0.12);  color: #facc15; }
    .dark-root .tag-risk   { background: rgba(239,68,68,0.12);  color: #f87171; }
    .dark-root .outline-btn { background: transparent; border: 1.5px solid rgba(255,255,255,0.15); color: #e2e8f0; }
    .dark-root .outline-btn:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }
    .dark-root .nav-link { color: #94a3b8; }
    .dark-root .nav-link:hover { color: #f0f4ff; }
    .dark-root .footer-area { background: #080c14; border-color: rgba(255,255,255,0.07); color: #64748b; }
    .dark-root .step-num { background: rgba(99,102,241,0.15); color: #818cf8; }
    .dark-root .feat-icon { background: rgba(99,102,241,0.15); }
    .dark-root .toggle-btn { background: #1e2a3d; border-color: rgba(255,255,255,0.1); color: #fbbf24; }
    .dark-root .lb-header { background: #0d1220; border-color: rgba(255,255,255,0.06); color: #94a3b8; }
    .dark-root .lb-row:hover { background: rgba(99,102,241,0.05); }

    /* Light is default */
    .nav-bar { background: rgba(255,255,255,0.92); border-color: #e5e7eb; }
    .hero-bg { background: radial-gradient(ellipse 70% 60% at 50% -10%, rgba(99,102,241,0.09) 0%, transparent 70%); }
    .section-bg { background: #f9fafb; border-color: #e5e7eb; }
    .card-bg { background: #ffffff; border-color: #e5e7eb; }
    .muted { color: #6b7280; }
    .surface { background: #f3f4f6; }
    .divider { border-color: #e5e7eb; }
    .text-main { color: #0f172a; }
    .text-sub { color: #6b7280; }
    .pill-badge { background: #eff6ff; color: #2563eb; border-color: #bfdbfe; }
    .tag-ready { background: #f0fdf4; color: #16a34a; }
    .tag-needs  { background: #fefce8; color: #ca8a04; }
    .tag-risk   { background: #fef2f2; color: #dc2626; }
    .outline-btn { background: #fff; border: 1.5px solid #e5e7eb; color: #374151; }
    .outline-btn:hover { border-color: #9ca3af; background: #f9fafb; }
    .nav-link { color: #6b7280; }
    .nav-link:hover { color: #111827; }
    .footer-area { background: #ffffff; border-color: #e5e7eb; color: #9ca3af; }
    .step-num { background: #eff6ff; color: #2563eb; }
    .feat-icon { background: #eff6ff; }
    .toggle-btn { background: #f3f4f6; border-color: #e5e7eb; color: #374151; }
    .lb-header { background: #f9fafb; border-color: #f0f0f0; color: #6b7280; }
    .lb-row:hover { background: #f8faff; }

    /* dot grid texture */
    .dot-pattern {
        background-image: radial-gradient(circle, rgba(148,163,184,0.35) 1px, transparent 1px);
        background-size: 22px 22px;
    }

    /* bar anim */
    .bar-anim { animation: bar-grow 1s 0.5s cubic-bezier(0.22,1,0.36,1) both; }

    /* heatmap row */
    .hm-cell { width: 11px; height: 11px; border-radius: 2px; flex-shrink: 0; }

    /* scrollbar */
    .thin-scroll::-webkit-scrollbar { width: 4px; }
    .thin-scroll::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 2px; }
    `}</style>
);

/* ─── Constants ──────────────────────────────────────────────────────────── */
const PLATFORMS = [
    { name: 'LeetCode', logo: 'https://cdn.simpleicons.org/leetcode/FFA116', color: '#FFA116', bg: '#FFF7ED' },
    { name: 'GitHub', logo: 'https://cdn.simpleicons.org/github/181717', color: '#181717', bg: '#F6F8FA' },
    { name: 'Codeforces', logo: 'https://cdn.simpleicons.org/codeforces/1F8ACB', color: '#1F8ACB', bg: '#EFF8FF' },
    { name: 'CodeChef', logo: 'https://cdn.simpleicons.org/codechef/5B4638', color: '#5B4638', bg: '#FDF8F5' },
    { name: 'HackerRank', logo: 'https://cdn.simpleicons.org/hackerrank/2EC866', color: '#2EC866', bg: '#F0FDF4' },
];

const LEADERBOARD = [
    { rank: 1, name: 'Rahul S.', pts: 412, tag: '🥇' },
    { rank: 2, name: 'Priya M.', pts: 398, tag: '🥈' },
    { rank: 3, name: 'You', pts: 345, tag: '🥉', isYou: true },
    { rank: 4, name: 'Vikram S.', pts: 289, tag: '' },
];

const STUDENTS = [
    { name: 'Arjun K.', solved: 450, score: 88, status: 'Ready', tag: 'tag-ready' },
    { name: 'Neha R.', solved: 312, score: 65, status: 'Needs Impr.', tag: 'tag-needs' },
    { name: 'Vikram S.', solved: 45, score: 32, status: 'At Risk', tag: 'tag-risk' },
];

const STEPS = [
    { n: '01', icon: <Users className="w-5 h-5" />, title: 'Sign up & get your Invite Code', body: 'Your mentor generates a batch invite code. Students join in one click — no long forms.' },
    { n: '02', icon: <Code2 className="w-5 h-5" />, title: 'Connect your platforms', body: 'Enter your LeetCode, GitHub, Codeforces, CodeChef, and HackerRank usernames. We sync every 6 hours.' },
    { n: '03', icon: <TrendingUp className="w-5 h-5" />, title: 'Watch your rank & grow', body: 'Your AI study plan, heatmap streaks, and batch leaderboard — all in one place, updated daily.' },
];

/* ─── Heatmap cells (seeded so it doesn\'t change on every render) ─────── */
const HEAT_DATA = Array.from({ length: 26 }, (_, col) =>
    Array.from({ length: 5 }, (_, row) => {
        const seed = (col * 7 + row * 13) % 17;
        return seed > 12 ? 3 : seed > 8 ? 2 : seed > 4 ? 1 : 0;
    })
);
const heatColor = (v, dark) => {
    if (v === 0) return dark ? '#1e2a3d' : '#f3f4f6';
    if (v === 1) return '#93c5fd';
    if (v === 2) return '#3b82f6';
    return '#1d4ed8';
};

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════════ */
const LandingPage = () => {
    const [dark, setDark] = useState(false);
    const [activeTab, setActiveTab] = useState('students');
    const navigate = useNavigate();

    return (
        <div className={`mr-root min-h-screen ${dark ? 'dark-root' : ''}`} style={{ background: dark ? '#080c14' : '#ffffff', color: dark ? '#f0f4ff' : '#0f172a' }}>
            <Styles />

            {/* ── NAVBAR ──────────────────────────────────────────────────── */}
            <nav className="nav-bar fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b" style={{ height: 64 }}>
                <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

                    {/* Brand */}
                    <div className="flex items-center gap-2.5">
                        <img
                            src="/logo.png"
                            alt="MergeRank"
                            style={{ width: 34, height: 34, objectFit: "contain" }}
                        />
                        <span className="text-[17px] font-semibold tracking-[-0.02em]" style={{ color: dark ? '#f0f4ff' : '#0f172a' }}>MergeRank</span>
                    </div>

                    {/* Links */}
                    <div className="hidden md:flex items-center gap-7">
                        {['Features', 'How it Works', 'For Mentors'].map(l => (
                            <a key={l} href={`#${l.toLowerCase().replace(/ /g, '-')}`} className="nav-link text-sm font-medium transition-colors duration-150" style={{ textDecoration: 'none' }}>{l}</a>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDark(d => !d)}
                            className="toggle-btn w-8 h-8 rounded-lg border flex items-center justify-center transition-colors"
                            aria-label="Toggle theme"
                        >
                            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="nav-link text-sm font-medium hidden sm:block transition-colors"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0 2px' }}
                        >
                            Log in
                        </button>
                        <button
                            onClick={() => navigate('/login')}
                            className="shimmer-btn text-white text-sm font-semibold px-5 py-2 rounded-lg"
                            style={{ border: 'none', cursor: 'pointer' }}
                        >
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── HERO ────────────────────────────────────────────────────── */}
            <section style={{ paddingTop: 120, paddingBottom: 96, position: 'relative', overflow: 'hidden' }}>
                {/* Background glow */}
                <div className="hero-bg" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />

                {/* Dot pattern top-right */}
                <div className="dot-pattern" style={{ position: 'absolute', top: 80, right: 0, width: 320, height: 320, opacity: 0.5, pointerEvents: 'none' }} />
                <div className="dot-pattern" style={{ position: 'absolute', bottom: 0, left: 0, width: 200, height: 200, opacity: 0.4, pointerEvents: 'none' }} />

                <div className="max-w-7xl mx-auto px-6" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>

                        {/* Left copy */}
                        <div>

                            <h1 className="anim-fade-up anim-delay-1 mr-serif" style={{ fontSize: 'clamp(40px, 5vw, 66px)', lineHeight: 1.08, fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 22, margin: 0 }}>
                                Rank within your world.<br />
                                <span className="gradient-text">Compete smarter.</span>
                            </h1>

                            <p className="anim-fade-up anim-delay-2 text-sub" style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 480, marginTop: 20, marginBottom: 36 }}>
                                Global ranks in the millions destroy morale. MergeRank unifies your LeetCode, GitHub, Codeforces, CodeChef, and HackerRank data to rank you{' '}
                                <strong style={{ color: dark ? '#e2e8f0' : '#0f172a', fontWeight: 600 }}>only within your college batch</strong>
                                {' '}— while AI guides your next move.
                            </p>

                            {/* CTAs */}
                            <div className="anim-fade-up anim-delay-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                                <button
                                    onClick={() => navigate('/login')}
                                    className="shimmer-btn"
                                    style={{ color: '#fff', fontSize: 15, fontWeight: 600, padding: '13px 28px', borderRadius: 10, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                                >
                                    Start for free
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="outline-btn"
                                    style={{ fontSize: 15, fontWeight: 500, padding: '13px 24px', borderRadius: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}
                                >
                                    See how it works
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Trusted line */}
                            <div className="anim-fade-up anim-delay-4 text-sub" style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 40, fontSize: 13 }}>
                                <div style={{ display: 'flex' }}>
                                    {['#4f46e5', '#2563eb', '#0ea5e9', '#10b981'].map((c, i) => (
                                        <div key={i} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: '2px solid', borderColor: dark ? '#080c14' : '#fff', marginLeft: i > 0 ? -8 : 0, zIndex: 4 - i }} />
                                    ))}
                                </div>
                                <span>Trusted by 500+ students across 12+ colleges</span>
                            </div>
                        </div>

                        {/* Right — floating cards */}
                        <div style={{ position: 'relative', height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {/* Background card */}
                            <div className="card-bg" style={{ position: 'absolute', inset: 0, borderRadius: 20, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#e5e7eb', overflow: 'hidden' }}>
                                {/* Mini leaderboard */}
                                <div style={{ padding: 24 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: dark ? '#94a3b8' : '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 2 }}>Batch Leaderboard</div>
                                            <div style={{ fontSize: 16, fontWeight: 600, color: dark ? '#f0f4ff' : '#0f172a' }}>CS-A · 2025</div>
                                        </div>
                                        <div style={{ fontSize: 12, padding: '4px 10px', borderRadius: 20, background: '#f0fdf4', color: '#16a34a', fontWeight: 500 }}>● Live</div>
                                    </div>

                                    {LEADERBOARD.map((u, i) => (
                                        <div key={i} className="lb-row" style={{
                                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                            padding: '11px 12px', borderRadius: 10, marginBottom: 4,
                                            background: u.isYou ? (dark ? 'rgba(37,99,235,0.15)' : '#eff6ff') : 'transparent',
                                            border: u.isYou ? '1px solid' : '1px solid transparent',
                                            borderColor: u.isYou ? (dark ? 'rgba(37,99,235,0.3)' : '#bfdbfe') : 'transparent',
                                            transition: 'all 0.15s',
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <span style={{ fontSize: 15, width: 22 }}>{u.tag || `#${u.rank}`}</span>
                                                <div style={{ width: 30, height: 30, borderRadius: '50%', background: u.isYou ? '#2563eb' : (dark ? '#1e2a3d' : '#f3f4f6'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: u.isYou ? '#fff' : (dark ? '#94a3b8' : '#6b7280') }}>
                                                    {u.name.charAt(0)}
                                                </div>
                                                <span style={{ fontSize: 14, fontWeight: u.isYou ? 600 : 500, color: u.isYou ? '#2563eb' : (dark ? '#e2e8f0' : '#374151') }}>{u.name}</span>
                                            </div>
                                            <span style={{ fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: dark ? '#94a3b8' : '#6b7280' }}>{u.pts}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Floating platform badges */}
                            <div className="float-card" style={{ position: 'absolute', top: -16, right: -20, background: '#fff', borderRadius: 12, padding: '10px 14px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#FFA116', border: '1px solid #ffe0b2', zIndex: 10 }}>
                                <img src="https://cdn.simpleicons.org/leetcode/FFA116" alt="LeetCode" style={{ width: 18, height: 18 }} />
                                LeetCode · 214 solved
                            </div>

                            <div className="float-card-2" style={{ position: 'absolute', bottom: 40, left: -28, background: '#fff', borderRadius: 12, padding: '10px 14px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#2EC866', border: '1px solid #bbf7d0', zIndex: 10 }}>
                                <img src="https://cdn.simpleicons.org/hackerrank/2EC866" alt="HackerRank" style={{ width: 18, height: 18 }} />
                                HackerRank · 5⭐
                            </div>

                            <div className="float-card-3" style={{ position: 'absolute', bottom: -16, right: 30, background: '#fff', borderRadius: 12, padding: '10px 14px', boxShadow: '0 4px 24px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, color: '#1F8ACB', border: '1px solid #bae6fd', zIndex: 10 }}>
                                <img src="https://cdn.simpleicons.org/codeforces/1F8ACB" alt="Codeforces" style={{ width: 18, height: 18 }} />
                                CF Rating · 1642
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PLATFORM STRIP ──────────────────────────────────────────── */}
            <div className="section-bg" style={{ borderTop: '1px solid', borderBottom: '1px solid', padding: '20px 0' }}>
                <div className="marquee-wrap">
                    <div className="marquee-track">
                        {[...PLATFORMS, ...PLATFORMS, ...PLATFORMS, ...PLATFORMS].map((p, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '0 36px', whiteSpace: 'nowrap' }}>
                                <img src={p.logo} alt={p.name} style={{ width: 20, height: 20, opacity: 0.75 }} />
                                <span style={{ fontSize: 14, fontWeight: 500, color: dark ? '#64748b' : '#9ca3af' }}>{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── FEATURES ────────────────────────────────────────────────── */}
            <section id="features" style={{ padding: '96px 24px' }}>
                <div className="max-w-7xl mx-auto">
                    {/* Heading */}
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <h2 className="mr-serif text-main" style={{ fontSize: 'clamp(32px,4vw,48px)', lineHeight: 1.12, fontWeight: 400 }}>
                            Everything you need to stand out<br />in your batch.
                        </h2>
                        <p className="text-sub" style={{ fontSize: 16, marginTop: 14, maxWidth: 480, margin: '14px auto 0' }}>
                            From smart leaderboards to AI study plans — all the tools that turn consistent effort into visible progress.
                        </p>
                    </div>

                    {/* Bento grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'auto auto', gap: 20 }}>

                        {/* Card 1 — Batch Leaderboard (wide) */}
                        <div className="card-bg card-lift" style={{ gridColumn: 'span 2', border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#e5e7eb', borderRadius: 20, padding: 32, overflow: 'hidden' }}>
                            <div className="feat-icon" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                <Trophy className="w-5 h-5" style={{ color: '#f59e0b' }} />
                            </div>
                            <h3 className="text-main" style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Batch-Scoped Leaderboards</h3>
                            <p className="text-sub" style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 380, marginBottom: 28 }}>
                                Stop comparing yourself to millions. Compete only with your class — every rank means something real.
                            </p>
                            {/* Mini leaderboard table */}
                            <div style={{ borderRadius: 14, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0', overflow: 'hidden' }}>
                                <div className="lb-header" style={{ display: 'grid', gridTemplateColumns: '60px 1fr 90px', padding: '10px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.06)' : '#f0f0f0' }}>
                                    <span>Rank</span><span>Student</span><span style={{ textAlign: 'right' }}>Solved</span>
                                </div>
                                {LEADERBOARD.slice(0, 3).map((u, i) => (
                                    <div key={i} className="lb-row" style={{
                                        display: 'grid', gridTemplateColumns: '60px 1fr 90px',
                                        padding: '12px 16px', fontSize: 14, borderBottom: i < 2 ? '1px solid' : 'none',
                                        borderColor: dark ? 'rgba(255,255,255,0.05)' : '#f7f7f7',
                                        background: u.isYou ? (dark ? 'rgba(37,99,235,0.1)' : '#f0f7ff') : 'transparent',
                                        alignItems: 'center', transition: 'background 0.15s',
                                    }}>
                                        <span style={{ fontSize: 15 }}>{u.tag || `#${u.rank}`}</span>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                            <div style={{ width: 28, height: 28, borderRadius: '50%', background: u.isYou ? '#2563eb' : (dark ? '#1e2a3d' : '#f3f4f6'), display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: u.isYou ? '#fff' : (dark ? '#94a3b8' : '#9ca3af') }}>{u.name.charAt(0)}</div>
                                            <span style={{ fontWeight: u.isYou ? 600 : 400, color: u.isYou ? '#2563eb' : (dark ? '#e2e8f0' : '#374151') }}>{u.name}</span>
                                        </div>
                                        <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', fontWeight: 500, color: dark ? '#94a3b8' : '#6b7280' }}>{u.pts}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 2 — Unified Profile */}
                        <div className="card-bg card-lift" style={{ border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#e5e7eb', borderRadius: 20, padding: 32 }}>
                            <div className="feat-icon" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                <ShieldCheck className="w-5 h-5" style={{ color: '#10b981' }} />
                            </div>
                            <h3 className="text-main" style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Unified Profile</h3>
                            <p className="text-sub" style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>
                                Enter your usernames once. We auto-sync every 6 hours via secure read-only APIs.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                                {PLATFORMS.map((p, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0', background: dark ? '#111827' : '#fafafa' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                            <img src={p.logo} alt={p.name} style={{ width: 16, height: 16 }} />
                                            <span style={{ fontSize: 13, fontWeight: 500, color: dark ? '#e2e8f0' : '#374151' }}>{p.name}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                                            <span style={{ fontSize: 12, color: '#22c55e', fontWeight: 500 }}>Synced</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Card 3 — Proactive Alerts */}
                        <div className="card-bg card-lift" style={{ border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#e5e7eb', borderRadius: 20, padding: 32 }}>
                            <div className="feat-icon" style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                <BellRing className="w-5 h-5" style={{ color: '#ef4444' }} />
                            </div>
                            <h3 className="text-main" style={{ fontSize: 20, fontWeight: 600, marginBottom: 6 }}>Proactive Alerts</h3>
                            <p className="text-sub" style={{ fontSize: 14, lineHeight: 1.65, marginBottom: 24 }}>
                                Mentors are instantly notified when a student goes inactive for 7+ days or falls behind the batch average.
                            </p>
                            {/* Alert preview card */}
                            <div style={{ padding: '14px 16px', borderRadius: 12, background: dark ? 'rgba(239,68,68,0.08)' : '#fff7f7', border: '1px solid', borderColor: dark ? 'rgba(239,68,68,0.2)' : '#fecaca' }}>
                                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                                    <BellRing className="w-4 h-4" style={{ color: '#ef4444', marginTop: 1, flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: dark ? '#fca5a5' : '#dc2626', marginBottom: 2 }}>Vikram S. hasn't coded in 8 days</div>
                                        <div style={{ fontSize: 12, color: dark ? '#94a3b8' : '#9ca3af' }}>Batch: CS-A • Risk Level: High</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 4 — AI Engine (wide) */}
                        <div className="card-lift" style={{ gridColumn: 'span 2', border: '1px solid', borderColor: dark ? 'rgba(99,102,241,0.25)' : '#e0e7ff', borderRadius: 20, padding: 32, background: dark ? 'rgba(99,102,241,0.08)' : '#fafbff', overflow: 'hidden', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: -40, right: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                            <div style={{ width: 44, height: 44, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: 'rgba(99,102,241,0.12)' }}>
                                <BrainCircuit className="w-5 h-5" style={{ color: '#6366f1' }} />
                            </div>
                            <h3 className="text-main" style={{ fontSize: 20, fontWeight: 600, marginBottom: 6, position: 'relative', zIndex: 1 }}>AI-Powered Suggestions Engine</h3>
                            <p className="text-sub" style={{ fontSize: 14, lineHeight: 1.65, maxWidth: 420, marginBottom: 24, position: 'relative', zIndex: 1 }}>
                                We analyze your topic-wise distribution across platforms to detect weak spots. Our LLM pipeline then recommends 3 precise problems to solve next.
                            </p>
                            {/* AI suggestion chips */}
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, position: 'relative', zIndex: 1 }}>
                                {[
                                    { label: 'Practice DP on Trees', tag: 'Weak area' },
                                    { label: 'Graph BFS — Medium', tag: 'Next step' },
                                    { label: 'Sliding Window #3', tag: 'Reinforce' },
                                ].map((s, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderRadius: 10, background: dark ? 'rgba(99,102,241,0.15)' : '#eff0ff', border: '1px solid', borderColor: dark ? 'rgba(99,102,241,0.25)' : '#c7d2fe', fontSize: 13 }}>
                                        <Sparkles className="w-3.5 h-3.5" style={{ color: '#6366f1' }} />
                                        <span style={{ fontWeight: 500, color: dark ? '#c7d2fe' : '#4338ca' }}>{s.label}</span>
                                        <span style={{ fontSize: 11, padding: '1px 7px', borderRadius: 6, background: dark ? 'rgba(99,102,241,0.2)' : '#e0e7ff', color: dark ? '#a5b4fc' : '#6366f1' }}>{s.tag}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOR STUDENTS / MENTORS ───────────────────────────────────── */}
            <section id="for-mentors" className="section-bg" style={{ borderTop: '1px solid', padding: '96px 24px' }}>
                <div className="max-w-7xl mx-auto">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>

                        {/* Left */}
                        <div>
                            <div className="pill-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px', borderRadius: 100, fontSize: 12, fontWeight: 600, border: '1px solid', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 20 }}>
                                <Users className="w-3.5 h-3.5" /> Who's it for?
                            </div>
                            <h2 className="mr-serif text-main" style={{ fontSize: 'clamp(28px,3vw,40px)', lineHeight: 1.15, fontWeight: 400, marginBottom: 32 }}>
                                Built for both sides of the classroom.
                            </h2>

                            {/* Tab buttons */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                <button
                                    onClick={() => setActiveTab('students')}
                                    style={{
                                        textAlign: 'left', padding: '18px 22px', borderRadius: 14, border: '1.5px solid',
                                        borderColor: activeTab === 'students' ? '#2563eb' : (dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'),
                                        background: activeTab === 'students' ? (dark ? 'rgba(37,99,235,0.12)' : '#eff6ff') : (dark ? '#111827' : '#fff'),
                                        cursor: 'pointer', transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                        <Users className="w-5 h-5" style={{ color: '#2563eb' }} />
                                        <span style={{ fontSize: 15, fontWeight: 600, color: activeTab === 'students' ? '#2563eb' : (dark ? '#e2e8f0' : '#374151') }}>For Students</span>
                                    </div>
                                    <p style={{ fontSize: 13, lineHeight: 1.6, color: dark ? '#94a3b8' : '#6b7280', margin: 0 }}>
                                        Track personal analytics, follow AI study plans, and climb your batch ranks.
                                    </p>
                                </button>

                                <button
                                    onClick={() => setActiveTab('mentors')}
                                    style={{
                                        textAlign: 'left', padding: '18px 22px', borderRadius: 14, border: '1.5px solid',
                                        borderColor: activeTab === 'mentors' ? '#10b981' : (dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb'),
                                        background: activeTab === 'mentors' ? (dark ? 'rgba(16,185,129,0.1)' : '#f0fdf4') : (dark ? '#111827' : '#fff'),
                                        cursor: 'pointer', transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                                        <LineChart className="w-5 h-5" style={{ color: '#10b981' }} />
                                        <span style={{ fontSize: 15, fontWeight: 600, color: activeTab === 'mentors' ? '#10b981' : (dark ? '#e2e8f0' : '#374151') }}>For Mentors</span>
                                    </div>
                                    <p style={{ fontSize: 13, lineHeight: 1.6, color: dark ? '#94a3b8' : '#6b7280', margin: 0 }}>
                                        View class-wide readiness scores, export CSV reports, and find struggling students instantly.
                                    </p>
                                </button>
                            </div>
                        </div>

                        {/* Right — Mock window */}
                        <div className="card-bg" style={{ borderRadius: 16, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.08)' : '#e5e7eb', overflow: 'hidden', boxShadow: dark ? '0 20px 60px rgba(0,0,0,0.4)' : '0 20px 60px rgba(0,0,0,0.07)' }}>
                            {/* Window chrome */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 16px', borderBottom: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0' }}>
                                {['#ff5f57', '#febc2e', '#28c840'].map((c, i) => (
                                    <div key={i} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
                                ))}
                                <div style={{ flex: 1, margin: '0 12px', height: 24, borderRadius: 6, background: dark ? '#1e2a3d' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: 11, color: dark ? '#94a3b8' : '#9ca3af' }}>app.mergerank.io/dashboard</span>
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: 28 }}>
                                {activeTab === 'students' ? (
                                    <div>
                                        {/* Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
                                            <div>
                                                <h3 className="text-main" style={{ fontSize: 18, fontWeight: 700, marginBottom: 3 }}>Student Dashboard</h3>
                                                <p className="text-sub" style={{ fontSize: 13 }}>Activity Heatmap · Last 26 weeks</p>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: 28, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: '#2563eb' }}>14</div>
                                                <div className="text-sub" style={{ fontSize: 12 }}>Day Streak 🔥</div>
                                            </div>
                                        </div>

                                        {/* Heatmap */}
                                        <div style={{ display: 'flex', gap: 3, marginBottom: 24, overflowX: 'auto' }} className="thin-scroll">
                                            {HEAT_DATA.map((col, ci) => (
                                                <div key={ci} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                                    {col.map((v, ri) => (
                                                        <div key={ri} className="hm-cell" style={{ background: heatColor(v, dark) }} title={`${v} submissions`} />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>

                                        {/* Stats row */}
                                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                                            {/* Difficulty dist */}
                                            <div style={{ padding: '16px', borderRadius: 12, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0', background: dark ? '#111827' : '#fafafa' }}>
                                                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: dark ? '#94a3b8' : '#9ca3af', marginBottom: 12 }}>Difficulty Mix</div>
                                                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', height: 56 }}>
                                                    {[{ h: '100%', c: '#22c55e', l: 'Easy' }, { h: '66%', c: '#f59e0b', l: 'Med' }, { h: '28%', c: '#ef4444', l: 'Hard' }].map((b, i) => (
                                                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, height: '100%', justifyContent: 'flex-end' }}>
                                                            <div style={{ width: '100%', background: b.c, borderRadius: '4px 4px 0 0', height: b.h, opacity: 0.85 }} />
                                                            <span style={{ fontSize: 10, color: dark ? '#94a3b8' : '#9ca3af' }}>{b.l}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Anonymous mode */}
                                            <div style={{ padding: '16px', borderRadius: 12, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0', background: dark ? '#111827' : '#fafafa' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                                                    <Eye className="w-3.5 h-3.5" style={{ color: '#6366f1' }} />
                                                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: dark ? '#94a3b8' : '#9ca3af' }}>Anonymous Mode</div>
                                                </div>
                                                <p style={{ fontSize: 12, lineHeight: 1.6, color: dark ? '#94a3b8' : '#6b7280', margin: 0 }}>
                                                    Compare stats with peers without revealing your identity. Compete stress-free.
                                                </p>
                                                <div style={{ marginTop: 10, display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, padding: '3px 8px', borderRadius: 6, background: dark ? 'rgba(99,102,241,0.15)' : '#eff0ff', color: '#6366f1', fontWeight: 500 }}>
                                                    <Lock className="w-3 h-3" /> ON
                                                </div>
                                            </div>

                                            {/* Platform breakdown */}
                                            <div style={{ gridColumn: 'span 2', padding: '16px', borderRadius: 12, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0', background: dark ? '#111827' : '#fafafa' }}>
                                                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', color: dark ? '#94a3b8' : '#9ca3af', marginBottom: 14 }}>Platform Breakdown</div>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
                                                    {[
                                                        { p: 'LeetCode', val: 214, max: 300, c: '#FFA116', logo: 'https://cdn.simpleicons.org/leetcode/FFA116' },
                                                        { p: 'GitHub', val: 847, max: 1000, c: '#181717', logo: dark ? 'https://cdn.simpleicons.org/github/ffffff' : 'https://cdn.simpleicons.org/github/181717' },
                                                        { p: 'Codeforces', val: 1642, max: 2400, c: '#1F8ACB', logo: 'https://cdn.simpleicons.org/codeforces/1F8ACB' },
                                                    ].map((r, i) => (
                                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <img src={r.logo} alt={r.p} style={{ width: 14, height: 14, flexShrink: 0 }} />
                                                            <span style={{ fontSize: 12, fontWeight: 500, width: 80, color: dark ? '#e2e8f0' : '#374151', flexShrink: 0 }}>{r.p}</span>
                                                            <div style={{ flex: 1, height: 5, borderRadius: 3, background: dark ? '#1e2a3d' : '#f3f4f6', overflow: 'hidden' }}>
                                                                <div style={{ height: '100%', width: `${(r.val / r.max) * 100}%`, background: r.c, borderRadius: 3, opacity: 0.8 }} />
                                                            </div>
                                                            <span style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: dark ? '#94a3b8' : '#9ca3af', width: 40, textAlign: 'right' }}>{r.val}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        {/* Header */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                                            <div>
                                                <h3 className="text-main" style={{ fontSize: 18, fontWeight: 700, marginBottom: 3 }}>Batch: 2025-CS-A</h3>
                                                <p className="text-sub" style={{ fontSize: 13 }}>42 Students Enrolled</p>
                                            </div>
                                            <button style={{ fontSize: 13, fontWeight: 500, padding: '7px 14px', borderRadius: 8, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.1)' : '#e5e7eb', background: dark ? '#1e2a3d' : '#f9fafb', color: dark ? '#e2e8f0' : '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <BarChart3 className="w-3.5 h-3.5" /> Export CSV
                                            </button>
                                        </div>

                                        {/* Summary chips */}
                                        <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                                            {[{ l: '18 Ready', c: 'tag-ready' }, { l: '16 Improving', c: 'tag-needs' }, { l: '8 At Risk', c: 'tag-risk' }].map((chip, i) => (
                                                <span key={i} className={chip.c} style={{ fontSize: 12, fontWeight: 600, padding: '5px 12px', borderRadius: 20 }}>{chip.l}</span>
                                            ))}
                                        </div>

                                        {/* Table */}
                                        <div style={{ borderRadius: 12, border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0', overflow: 'hidden' }}>
                                            <div className="lb-header" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 90px', padding: '10px 16px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.07em', borderBottom: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.06)' : '#f0f0f0' }}>
                                                <span>Student</span><span>Solved</span><span>Readiness</span><span>Status</span>
                                            </div>
                                            {STUDENTS.map((s, i) => (
                                                <div key={i} className="lb-row" style={{ display: 'grid', gridTemplateColumns: '1fr 100px 100px 90px', padding: '13px 16px', fontSize: 14, borderBottom: i < 2 ? '1px solid' : 'none', borderColor: dark ? 'rgba(255,255,255,0.05)' : '#f7f7f7', alignItems: 'center', transition: 'background 0.15s' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                                                        <div style={{ width: 30, height: 30, borderRadius: '50%', background: dark ? '#1e2a3d' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: dark ? '#94a3b8' : '#9ca3af' }}>{s.name.charAt(0)}</div>
                                                        <span style={{ fontWeight: 500, color: dark ? '#e2e8f0' : '#374151' }}>{s.name}</span>
                                                    </div>
                                                    <span style={{ fontVariantNumeric: 'tabular-nums', color: dark ? '#94a3b8' : '#6b7280' }}>{s.solved}</span>
                                                    <span style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 500, color: dark ? '#e2e8f0' : '#374151' }}>{s.score}/100</span>
                                                    <span className={s.tag} style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 20, display: 'inline-block' }}>{s.status}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
            <section id="how-it-works" style={{ padding: '96px 24px' }}>
                <div className="max-w-7xl mx-auto">
                    <div style={{ textAlign: 'center', marginBottom: 64 }}>
                        <h2 className="mr-serif text-main" style={{ fontSize: 'clamp(30px,3.5vw,44px)', lineHeight: 1.12, fontWeight: 400 }}>
                            From zero to ranked<br />in under 5 minutes.
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}>
                        {STEPS.map((step, i) => (
                            <div key={i} className="card-bg card-lift" style={{ border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#e5e7eb', borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}>
                                <div style={{ position: 'absolute', top: 20, right: 24, fontSize: 56, fontWeight: 800, opacity: 0.04, color: dark ? '#fff' : '#000', userSelect: 'none', fontFamily: 'Geist, sans-serif', lineHeight: 1 }}>{step.n}</div>
                                <div className="step-num" style={{ width: 40, height: 40, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                    {step.icon}
                                </div>
                                <h3 className="text-main" style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, lineHeight: 1.4 }}>{step.title}</h3>
                                <p className="text-sub" style={{ fontSize: 14, lineHeight: 1.65 }}>{step.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────── */}
            <section className="section-bg" style={{ borderTop: '1px solid', padding: '96px 24px' }}>
                <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
                    <div>
                        <h2 className="mr-serif text-main" style={{ fontSize: 'clamp(32px,4vw,50px)', lineHeight: 1.1, fontWeight: 400, marginBottom: 18 }}>
                            Your coding heartbeat.<br />
                            <span className="gradient-text">Visible to mentors.</span>
                        </h2>
                        <p className="text-sub" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 440, marginBottom: 32 }}>
                            Join MergeRank today. Connect your accounts securely, get a personalized invite code from your mentor, and start proving your potential.
                        </p>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                            <button
                                onClick={() => navigate('/login')}
                                className="shimmer-btn"
                                style={{ color: '#fff', fontSize: 15, fontWeight: 600, padding: '14px 32px', borderRadius: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}
                            >
                                Get Started for Free
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                            {['No credit card required', 'Free for all students', 'Mentor dashboard included'].map((t, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: dark ? '#94a3b8' : '#6b7280' }}>
                                    <CheckCircle2 className="w-4 h-4" style={{ color: '#22c55e', flexShrink: 0 }} />
                                    {t}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Platform showcase */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        {PLATFORMS.map((p, i) => (
                            <div key={i} className="card-bg card-lift" style={{
                                border: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#e5e7eb',
                                borderRadius: 16, padding: '20px 22px',
                                gridColumn: i === 4 ? 'span 2' : 'auto',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                                    <div style={{ width: 36, height: 36, borderRadius: 10, background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img src={p.logo} alt={p.name} style={{ width: 20, height: 20 }} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 14, fontWeight: 600, color: dark ? '#e2e8f0' : '#374151' }}>{p.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#22c55e' }} />
                                            <span style={{ fontSize: 11, color: '#22c55e', fontWeight: 500 }}>API Connected</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ fontSize: 12, color: dark ? '#64748b' : '#9ca3af' }}>Syncs every 6 hours automatically</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FOOTER ───────────────────────────────────────────────────── */}
            <footer className="footer-area" style={{ borderTop: '1px solid', padding: '56px 24px 32px' }}>
                <div className="max-w-7xl mx-auto">
                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}>
                        {/* Brand */}
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                                <img
                                    src="/logo.png"
                                    alt="MergeRank"
                                    style={{ width: 34, height: 34, objectFit: "contain" }}
                                />
                                <span style={{ fontSize: 15, fontWeight: 700, color: dark ? '#f0f4ff' : '#0f172a' }}>MergeRank</span>
                            </div>
                            <p style={{ fontSize: 13, lineHeight: 1.7, maxWidth: 260, marginBottom: 16 }}>
                                Competitive Programming Analytics &amp; Mentorship Platform. Built for the modern coding curriculum.
                            </p>
                            <p style={{ fontSize: 12, fontWeight: 500 }}>Built with MERN Stack · Real Deployment</p>
                        </div>

                        {/* Product */}
                        <div>
                            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: dark ? '#e2e8f0' : '#374151', marginBottom: 16 }}>Product</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                                {['Student Features', 'Mentor Features', 'AI Suggestions'].map(l => (
                                    <a key={l} href="#" style={{ fontSize: 14, textDecoration: 'none', color: 'inherit', transition: 'color 0.15s' }}
                                        onMouseEnter={e => e.target.style.color = '#2563eb'}
                                        onMouseLeave={e => e.target.style.color = ''}>
                                        {l}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Platforms */}
                        <div>
                            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: dark ? '#e2e8f0' : '#374151', marginBottom: 16 }}>Platforms</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                                {PLATFORMS.map(p => (
                                    <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                                        <img src={p.logo} alt={p.name} style={{ width: 13, height: 13, opacity: 0.6 }} />
                                        <span style={{ fontSize: 14 }}>{p.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legal */}
                        <div>
                            <h4 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: dark ? '#e2e8f0' : '#374151', marginBottom: 16 }}>Legal</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
                                {['Privacy Policy', 'Terms of Service'].map(l => (
                                    <a key={l} href="#" style={{ fontSize: 14, textDecoration: 'none', color: 'inherit', transition: 'color 0.15s' }}
                                        onMouseEnter={e => e.target.style.color = '#2563eb'}
                                        onMouseLeave={e => e.target.style.color = ''}>
                                        {l}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom bar */}
                    <div style={{ borderTop: '1px solid', borderColor: dark ? 'rgba(255,255,255,0.07)' : '#f0f0f0', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
                        <span style={{ fontSize: 13 }}>© 2025 MergeRank. All rights reserved.</span>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                            {PLATFORMS.map(p => (
                                <img key={p.name} src={p.logo} alt={p.name} style={{ width: 16, height: 16, opacity: 0.4, transition: 'opacity 0.2s' }}
                                    onMouseEnter={e => e.target.style.opacity = 0.9}
                                    onMouseLeave={e => e.target.style.opacity = 0.4}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;