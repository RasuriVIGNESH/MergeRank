import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Trophy,
    BrainCircuit,
    LineChart,
    Users,
    ShieldCheck,
    ArrowRight,
    BellRing,
    Activity,
    ChevronRight,
    Sun,
    Moon,
} from 'lucide-react';

const LandingPage = () => {
    const [activeTab, setActiveTab] = useState('students');
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();

    // ── Theme token map ──────────────────────────────────────────────────────
    const t = dark ? {
        // Root
        root: 'bg-[#020817] text-slate-50',
        // Nav
        nav: 'bg-[#020817]/80 border-slate-800',
        navLink: 'text-slate-300 hover:text-white',
        navBtn: 'bg-white text-slate-950 hover:bg-slate-200',
        navLogin: 'text-slate-300 hover:text-white',
        // Hero
        heroBadge: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        heroSub: 'text-slate-400',
        heroStrong: 'text-slate-200',
        heroBtn2: 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700',
        heroCard: 'bg-slate-900 border-slate-800',
        heroHead: 'text-slate-200',
        heroMeta: 'text-slate-500',
        heroBar: 'bg-slate-950',
        heroAI: 'bg-blue-950/30 border-blue-900/50',
        heroAIIcon: 'bg-blue-500/20 text-blue-400',
        heroAIHead: 'text-slate-200',
        heroAIText: 'text-slate-400',
        aiHighlight: 'text-blue-300',
        // Platform strip
        strip: 'border-slate-800/50 bg-slate-900/30',
        stripText: 'text-slate-500',
        // Features
        featHead2: 'text-slate-400',
        featSub: 'text-slate-400',
        featCard: 'bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 hover:border-slate-700',
        featDesc: 'text-slate-400',
        // Leaderboard inside feature
        lbWrap: 'bg-[#020817] border-slate-800',
        lbHead: 'text-slate-500 bg-slate-900/50 border-slate-800',
        lbRowBdr: 'border-slate-800/50',
        lbAvatar: 'bg-slate-800',
        lbName: 'text-slate-200',
        lbPts: 'text-slate-300',
        // API rows inside feature
        apiRow: 'text-slate-300 bg-[#020817] border-slate-800',
        // Audience section
        audience: 'border-slate-800/50 bg-slate-900/20',
        audienceH: 'text-slate-50',
        tabStudent: (active) => active ? 'bg-blue-600/10 border-blue-500/50 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/50',
        tabMentor: (active) => active ? 'bg-emerald-600/10 border-emerald-500/50 text-white' : 'bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-800/50',
        // Mock window
        mockWrap: 'bg-slate-950 border-slate-800',
        mockDot: 'border-slate-800/50',
        mockDotBg: 'bg-slate-700',
        mockH3: 'text-white',
        mockSub: 'text-slate-400',
        mockNum: 'text-blue-400',
        mockMeta: 'text-slate-500',
        heatEmpty: 'bg-slate-800',
        mockCard: 'bg-slate-900 border-slate-800',
        mockCardTx: 'text-slate-500',
        mockCardDesc: 'text-slate-300',
        mentorH3: 'text-white',
        mentorSub: 'text-slate-400',
        mentorExport: 'bg-slate-800 hover:bg-slate-700 text-white',
        mentorColH: 'text-slate-500 border-slate-800',
        mentorRow: 'border-slate-800/50',
        mentorName: 'text-slate-200',
        mentorVal: 'text-slate-400',
        mentorScore: 'text-slate-300',
        // CTA
        ctaGrad: 'from-blue-900/20',
        ctaBtn: 'bg-white text-slate-950 hover:bg-slate-200 shadow-white/10',
        ctaSub: 'text-slate-400',
        // Footer
        footer: 'border-slate-800 bg-[#020817] text-slate-500',
        footerBrand: 'text-slate-200',
        footerHead: 'text-slate-200',
        // Toggle button
        toggle: 'bg-slate-800 text-yellow-400 hover:bg-slate-700 border-slate-700',
    } : {
        // Root
        root: 'bg-slate-50 text-slate-900',
        // Nav
        nav: 'bg-white/90 border-slate-200',
        navLink: 'text-slate-600 hover:text-slate-900',
        navBtn: 'bg-slate-900 text-white hover:bg-slate-700',
        navLogin: 'text-slate-600 hover:text-slate-900',
        // Hero
        heroBadge: 'bg-blue-500/10 border-blue-500/30 text-blue-600',
        heroSub: 'text-slate-500',
        heroStrong: 'text-slate-800',
        heroBtn2: 'bg-white hover:bg-slate-100 text-slate-800 border-slate-300',
        heroCard: 'bg-white border-slate-200',
        heroHead: 'text-slate-800',
        heroMeta: 'text-slate-400',
        heroBar: 'bg-slate-100',
        heroAI: 'bg-blue-50 border-blue-200',
        heroAIIcon: 'bg-blue-100 text-blue-600',
        heroAIHead: 'text-slate-800',
        heroAIText: 'text-slate-500',
        aiHighlight: 'text-blue-600',
        // Platform strip
        strip: 'border-slate-200 bg-slate-100',
        stripText: 'text-slate-400',
        // Features
        featHead2: 'text-slate-500',
        featSub: 'text-slate-500',
        featCard: 'bg-white border-slate-200 hover:border-slate-300',
        featDesc: 'text-slate-500',
        // Leaderboard inside feature
        lbWrap: 'bg-slate-50 border-slate-200',
        lbHead: 'text-slate-500 bg-slate-100 border-slate-200',
        lbRowBdr: 'border-slate-100',
        lbAvatar: 'bg-slate-200',
        lbName: 'text-slate-700',
        lbPts: 'text-slate-600',
        // API rows inside feature
        apiRow: 'text-slate-700 bg-slate-50 border-slate-200',
        // Audience section
        audience: 'border-slate-200 bg-slate-100/60',
        audienceH: 'text-slate-900',
        tabStudent: (active) => active ? 'bg-blue-50 border-blue-400 text-blue-800' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50',
        tabMentor: (active) => active ? 'bg-emerald-50 border-emerald-400 text-emerald-800' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50',
        // Mock window
        mockWrap: 'bg-white border-slate-200',
        mockDot: 'border-slate-200',
        mockDotBg: 'bg-slate-300',
        mockH3: 'text-slate-800',
        mockSub: 'text-slate-500',
        mockNum: 'text-blue-600',
        mockMeta: 'text-slate-400',
        heatEmpty: 'bg-slate-200',
        mockCard: 'bg-slate-50 border-slate-200',
        mockCardTx: 'text-slate-400',
        mockCardDesc: 'text-slate-600',
        mentorH3: 'text-slate-800',
        mentorSub: 'text-slate-500',
        mentorExport: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
        mentorColH: 'text-slate-400 border-slate-200',
        mentorRow: 'border-slate-100',
        mentorName: 'text-slate-700',
        mentorVal: 'text-slate-500',
        mentorScore: 'text-slate-600',
        // CTA
        ctaGrad: 'from-blue-100/80',
        ctaBtn: 'bg-slate-900 text-white hover:bg-slate-700 shadow-slate-900/10',
        ctaSub: 'text-slate-500',
        // Footer
        footer: 'border-slate-200 bg-white text-slate-500',
        footerBrand: 'text-slate-800',
        footerHead: 'text-slate-700',
        // Toggle button
        toggle: 'bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200',
    };

    const platforms = [
        { name: 'LeetCode', url: 'https://cdn.simpleicons.org/leetcode/FFA116' },
        { name: 'GitHub', url: dark ? 'https://cdn.simpleicons.org/github/ffffff' : 'https://cdn.simpleicons.org/github/1a1a1a' },
        { name: 'Codeforces', url: 'https://cdn.simpleicons.org/codeforces/1F8ACB' },
        { name: 'CodeChef', url: dark ? 'https://cdn.simpleicons.org/codechef/ffffff' : 'https://cdn.simpleicons.org/codechef/5B4638' },
        { name: 'HackerRank', url: 'https://cdn.simpleicons.org/hackerrank/2EC866' },
    ];

    return (
        <div className={`min-h-screen font-sans selection:bg-blue-500/30 transition-colors duration-300 ${t.root}`}>

            {/* ── Navigation ──────────────────────────────────────────────── */}
            <nav className={`fixed w-full z-50 backdrop-blur-md border-b transition-colors duration-300 ${t.nav}`}>
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="MergeRank Logo" className="w-8 h-8 object-contain" />
                        <span className="text-xl font-bold tracking-tight">MergeRank</span>
                    </div>

                    <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${t.navLink}`}>
                        <a href="#features" className={`transition-colors ${t.navLink}`}>Features</a>
                        <a href="#how-it-works" className={`transition-colors ${t.navLink}`}>How it Works</a>
                        <a href="#mentors" className={`transition-colors ${t.navLink}`}>For Mentors</a>
                    </div>

                    <div className="flex items-center gap-3">
                        {/* Theme Toggle */}
                        <button
                            onClick={() => setDark(!dark)}
                            className={`p-2 rounded-lg border transition-all duration-300 ${t.toggle}`}
                            aria-label="Toggle theme"
                        >
                            {dark
                                ? <Sun className="w-4 h-4" />
                                : <Moon className="w-4 h-4" />
                            }
                        </button>

                        <button onClick={() => navigate('/login')} className={`text-sm font-medium transition-colors hidden sm:block ${t.navLogin}`}>
                            Log in
                        </button>
                        <button onClick={() => navigate('/login')} className={`px-4 py-2 rounded-md text-sm font-semibold transition-colors ${t.navBtn}`}>
                            Get Started
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Hero ────────────────────────────────────────────────────── */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] blur-[120px] rounded-full pointer-events-none transition-colors duration-300 ${dark ? 'bg-blue-600/20' : 'bg-blue-400/15'}`} />

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                    <div className="relative z-10">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium mb-6 transition-colors ${t.heroBadge}`}>
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            v1.0 is Live: Real-time 5-Platform Sync
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                            Rank within your world. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                                Compete smarter.
                            </span>
                        </h1>
                        <p className={`text-lg mb-8 max-w-xl leading-relaxed transition-colors ${t.heroSub}`}>
                            Global ranks in the millions destroy morale. MergeRank unifies your LeetCode, GitHub, Codeforces, CodeChef, and HackerRank data to rank you{' '}
                            <strong className={`transition-colors ${t.heroStrong}`}>only within your college batch</strong>{' '}
                            while AI guides your next move.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button onClick={() => navigate('/login')} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20">
                                Student Enrollment <ArrowRight className="w-4 h-4" />
                            </button>
                            <button onClick={() => navigate('/login')} className={`border px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all ${t.heroBtn2}`}>
                                Create Mentor Batch
                            </button>
                        </div>
                    </div>

                    {/* Hero Card */}
                    <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-full">
                        <div className={`border rounded-2xl p-6 shadow-2xl relative transition-colors duration-300 ${t.heroCard}`}>
                            <div className="absolute top-0 left-10 w-20 h-1 bg-blue-500 rounded-b-md" />

                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className={`font-semibold transition-colors ${t.heroHead}`}>Placement Readiness</h3>
                                    <p className={`text-sm transition-colors ${t.heroMeta}`}>Auto-calculated score</p>
                                </div>
                                <div className="text-3xl font-bold text-emerald-400">82<span className={`text-sm transition-colors ${t.heroMeta}`}>/100</span></div>
                            </div>

                            <div className="space-y-4 mb-6">
                                {[
                                    { label: 'Problems Solved (35%)', val: '88%', color: 'bg-blue-500' },
                                    { label: 'Contest Rating (25%)', val: '72%', color: 'bg-indigo-500' },
                                    { label: 'Hard Ratio (20%)', val: '65%', color: 'bg-purple-500' },
                                ].map((stat, i) => (
                                    <div key={i}>
                                        <div className={`flex justify-between text-xs mb-1 transition-colors ${t.heroMeta}`}>
                                            <span>{stat.label}</span>
                                            <span>{stat.val}</span>
                                        </div>
                                        <div className={`w-full rounded-full h-1.5 transition-colors ${t.heroBar}`}>
                                            <div className={`${stat.color} h-1.5 rounded-full`} style={{ width: stat.val }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={`border rounded-xl p-4 flex gap-4 items-start transition-colors ${t.heroAI}`}>
                                <div className={`p-2 rounded-lg transition-colors ${t.heroAIIcon}`}>
                                    <BrainCircuit className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className={`text-sm font-semibold transition-colors ${t.heroAIHead}`}>AI Coach Alert</h4>
                                    <p className={`text-xs mt-1 transition-colors ${t.heroAIText}`}>
                                        Your DP solve rate is low. Solve{' '}
                                        <span className={`transition-colors ${t.aiHighlight}`}>LeetCode #322 (Coin Change)</span>{' '}
                                        next to boost your score.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Platform Strip ──────────────────────────────────────────── */}
            <section className={`py-10 border-y transition-colors duration-300 ${t.strip}`}>
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className={`text-sm font-medium mb-6 tracking-widest uppercase transition-colors ${t.stripText}`}>
                        Aggregating live data from
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 hover:opacity-100 transition-opacity duration-500">
                        {platforms.map((platform) => (
                            <img
                                key={platform.name}
                                src={platform.url}
                                alt={`${platform.name} logo`}
                                className="h-8 w-auto grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                                title={platform.name}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Features Bento ──────────────────────────────────────────── */}
            <section id="features" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Everything you need. <br />
                        <span className={`transition-colors ${t.featHead2}`}>Nothing you don't.</span>
                    </h2>
                    <p className={`text-lg transition-colors ${t.featSub}`}>Designed specifically for college faculties and competitive programming cohorts.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Feature 1: Leaderboard (wide) */}
                    <div className={`md:col-span-2 border rounded-3xl p-8 transition-colors duration-300 ${t.featCard}`}>
                        <Trophy className="w-10 h-10 text-yellow-500 mb-6" />
                        <h3 className="text-2xl font-semibold mb-2">Batch-Scoped Leaderboards</h3>
                        <p className={`mb-8 max-w-md transition-colors ${t.featDesc}`}>
                            Compare yourself only with your class, section, or college. Stop worrying about millions of global users and start focusing on realistic, peer-driven growth.
                        </p>
                        <div className={`rounded-xl border overflow-hidden transition-colors ${t.lbWrap}`}>
                            <div className={`grid grid-cols-4 text-xs font-semibold uppercase p-4 border-b transition-colors ${t.lbHead}`}>
                                <span>Rank</span>
                                <span className="col-span-2">Student</span>
                                <span className="text-right">Total Solved</span>
                            </div>
                            {[
                                { rank: 1, name: 'Rahul S.', points: 412, color: 'text-yellow-500' },
                                { rank: 2, name: 'Priya M.', points: 398, color: 'text-slate-400' },
                                { rank: 3, name: 'You', points: 345, color: 'text-blue-500' },
                            ].map((user, i) => (
                                <div key={i} className={`grid grid-cols-4 text-sm p-4 border-b last:border-0 items-center transition-colors ${t.lbRowBdr} ${user.name === 'You' ? 'bg-blue-500/5' : ''}`}>
                                    <span className={`font-bold ${user.color}`}>#{user.rank}</span>
                                    <div className="col-span-2 flex items-center gap-2">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${t.lbAvatar}`}>
                                            {user.name.charAt(0)}
                                        </div>
                                        <span className={`transition-colors ${user.name === 'You' ? 'text-blue-500 font-semibold' : t.lbName}`}>{user.name}</span>
                                    </div>
                                    <span className={`text-right font-mono transition-colors ${t.lbPts}`}>{user.points}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature 2: Unified Profile */}
                    <div className={`border rounded-3xl p-8 transition-colors duration-300 ${t.featCard}`}>
                        <img src="/logo.png" alt="MergeRank Logo" className="w-10 h-10 object-contain mb-6" />
                        <h3 className="text-xl font-semibold mb-2">Unified Profile</h3>
                        <p className={`mb-6 text-sm transition-colors ${t.featDesc}`}>
                            One dashboard to rule them all. Enter your usernames once, and we auto-sync every 6 hours via secure APIs.
                        </p>
                        <div className="flex flex-col gap-3">
                            {['LeetCode API', 'GitHub REST v3', 'Codeforces API'].map((api, i) => (
                                <div key={i} className={`flex items-center gap-3 text-sm px-4 py-3 rounded-lg border transition-colors ${t.apiRow}`}>
                                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                    {api} Synced
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Feature 3: Proactive Alerts */}
                    <div className={`border rounded-3xl p-8 transition-colors duration-300 ${t.featCard}`}>
                        <BellRing className="w-10 h-10 text-rose-400 mb-6" />
                        <h3 className="text-xl font-semibold mb-2">Proactive Alerts</h3>
                        <p className={`text-sm transition-colors ${t.featDesc}`}>
                            Mentors get notified instantly when students fall behind or are inactive for 7+ days.
                        </p>
                    </div>

                    {/* Feature 4: AI Engine (wide) */}
                    <div className={`md:col-span-2 border rounded-3xl p-8 transition-colors duration-300 relative overflow-hidden ${t.featCard}`}>
                        <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full" />
                        <BrainCircuit className="w-10 h-10 text-indigo-400 mb-6 relative z-10" />
                        <h3 className="text-2xl font-semibold mb-2 relative z-10">AI-Powered Suggestions Engine</h3>
                        <p className={`mb-6 max-w-md relative z-10 transition-colors ${t.featDesc}`}>
                            We analyze your topic-wise distribution (Arrays, DP, Graphs) across platforms to detect your weak spots. Our LLM pipeline then suggests 3 specific problems to solve next.
                        </p>
                        <button className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium transition-colors relative z-10">
                            Explore how our prompt architecture works <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </section>

            {/* ── Audience Toggle ─────────────────────────────────────────── */}
            <section id="mentors" className={`py-20 border-t transition-colors duration-300 ${t.audience}`}>
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        {/* Left */}
                        <div className="w-full md:w-1/3">
                            <h2 className={`text-3xl font-bold mb-8 transition-colors ${t.audienceH}`}>
                                Built for both sides of the classroom.
                            </h2>
                            <div className="space-y-4">
                                <button
                                    onClick={() => setActiveTab('students')}
                                    className={`w-full text-left p-6 rounded-2xl border transition-all ${t.tabStudent(activeTab === 'students')}`}
                                >
                                    <Users className="w-6 h-6 mb-3 text-blue-500" />
                                    <h4 className="text-lg font-semibold mb-1">For Students</h4>
                                    <p className="text-sm opacity-80">Track personal analytics, follow AI study plans, and climb your batch ranks.</p>
                                </button>
                                <button
                                    onClick={() => setActiveTab('mentors')}
                                    className={`w-full text-left p-6 rounded-2xl border transition-all ${t.tabMentor(activeTab === 'mentors')}`}
                                >
                                    <LineChart className="w-6 h-6 mb-3 text-emerald-500" />
                                    <h4 className="text-lg font-semibold mb-1">For Mentors</h4>
                                    <p className="text-sm opacity-80">View class-wide readiness scores, generate CSV reports, and find struggling students instantly.</p>
                                </button>
                            </div>
                        </div>

                        {/* Right: Mock window */}
                        <div className="w-full md:w-2/3">
                            <div className={`border rounded-2xl p-2 shadow-2xl min-h-[400px] transition-colors duration-300 ${t.mockWrap}`}>
                                {/* macOS dots */}
                                <div className={`flex gap-2 p-3 border-b mb-4 transition-colors ${t.mockDot}`}>
                                    <div className={`w-3 h-3 rounded-full transition-colors ${t.mockDotBg}`} />
                                    <div className={`w-3 h-3 rounded-full transition-colors ${t.mockDotBg}`} />
                                    <div className={`w-3 h-3 rounded-full transition-colors ${t.mockDotBg}`} />
                                </div>

                                <div className="px-6 pb-6">
                                    {activeTab === 'students' ? (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="flex justify-between items-end mb-8">
                                                <div>
                                                    <h3 className={`text-xl font-bold mb-1 transition-colors ${t.mockH3}`}>Student Dashboard</h3>
                                                    <p className={`text-sm transition-colors ${t.mockSub}`}>Your Activity Heatmap &amp; Consistency</p>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`text-2xl font-mono transition-colors ${t.mockNum}`}>14 Day</span>
                                                    <p className={`text-xs transition-colors ${t.mockMeta}`}>Current Streak</p>
                                                </div>
                                            </div>

                                            {/* Heatmap */}
                                            <div className="flex gap-1 mb-8">
                                                {[...Array(24)].map((_, i) => (
                                                    <div key={i} className="flex flex-col gap-1">
                                                        {[...Array(5)].map((_, j) => {
                                                            const intensity = Math.random();
                                                            const bg = intensity > 0.8 ? 'bg-blue-400' : intensity > 0.5 ? 'bg-blue-600' : intensity > 0.2 ? 'bg-blue-800' : t.heatEmpty;
                                                            return <div key={j} className={`w-3 h-3 rounded-sm ${bg}`} />;
                                                        })}
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className={`p-4 rounded-xl border transition-colors ${t.mockCard}`}>
                                                    <span className={`text-xs uppercase tracking-wider transition-colors ${t.mockCardTx}`}>Difficulty Dist</span>
                                                    <div className="flex gap-2 mt-3 items-end h-16">
                                                        <div className="w-1/3 bg-emerald-500 rounded-t-md h-full" />
                                                        <div className="w-1/3 bg-yellow-500 rounded-t-md h-2/3" />
                                                        <div className="w-1/3 bg-rose-500 rounded-t-md h-1/4" />
                                                    </div>
                                                </div>
                                                <div className={`p-4 rounded-xl border transition-colors ${t.mockCard}`}>
                                                    <span className={`text-xs uppercase tracking-wider transition-colors ${t.mockCardTx}`}>Anonymous Mode</span>
                                                    <p className={`text-sm mt-2 transition-colors ${t.mockCardDesc}`}>
                                                        Compare your stats without revealing your identity to peers. Stay motivated, stress-free.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                            <div className="flex justify-between items-center mb-6">
                                                <div>
                                                    <h3 className={`text-xl font-bold mb-1 transition-colors ${t.mentorH3}`}>Batch: 2025-CS-A</h3>
                                                    <p className={`text-sm transition-colors ${t.mentorSub}`}>42 Students Enrolled</p>
                                                </div>
                                                <button className={`text-xs px-3 py-1.5 rounded-md transition-colors ${t.mentorExport}`}>Export CSV</button>
                                            </div>

                                            <div className="w-full">
                                                <div className={`grid grid-cols-4 text-xs font-semibold uppercase pb-3 border-b mb-3 transition-colors ${t.mentorColH}`}>
                                                    <span>Student</span>
                                                    <span>Total Solved</span>
                                                    <span>Readiness</span>
                                                    <span>Status</span>
                                                </div>
                                                {[
                                                    { name: 'Arjun K.', solved: 450, score: 88, status: 'Ready', tag: 'bg-emerald-500/20 text-emerald-500' },
                                                    { name: 'Neha R.', solved: 312, score: 65, status: 'Needs Impr.', tag: 'bg-yellow-500/20 text-yellow-500' },
                                                    { name: 'Vikram S.', solved: 45, score: 32, status: 'At Risk', tag: 'bg-rose-500/20 text-rose-500' },
                                                ].map((s, i) => (
                                                    <div key={i} className={`grid grid-cols-4 text-sm py-3 border-b items-center transition-colors ${t.mentorRow}`}>
                                                        <span className={`font-medium transition-colors ${t.mentorName}`}>{s.name}</span>
                                                        <span className={`transition-colors ${t.mentorVal}`}>{s.solved}</span>
                                                        <span className={`font-mono transition-colors ${t.mentorScore}`}>{s.score}/100</span>
                                                        <div>
                                                            <span className={`text-[10px] px-2 py-1 rounded-full ${s.tag}`}>{s.status}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA ─────────────────────────────────────────────────────── */}
            <section id="how-it-works" className="py-24 px-6 text-center relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t to-transparent pointer-events-none transition-colors duration-300 ${t.ctaGrad}`} />
                <div className="max-w-2xl mx-auto relative z-10">
                    <Activity className="w-12 h-12 text-blue-500 mx-auto mb-6" />
                    <h2 className="text-4xl font-bold mb-6">Your coding heartbeat. <br />Visible to mentors.</h2>
                    <p className={`text-lg mb-8 transition-colors ${t.ctaSub}`}>
                        Join MergeRank today. Connect your accounts securely, get a personalized invite code from your mentor, and start proving your potential.
                    </p>
                    <button onClick={() => navigate('/login')} className={`px-8 py-4 rounded-xl font-bold text-lg transition-colors shadow-xl ${t.ctaBtn}`}>
                        Get Started for Free
                    </button>
                </div>
            </section>

            {/* ── Footer ──────────────────────────────────────────────────── */}
            <footer className={`border-t py-12 text-sm transition-colors duration-300 ${t.footer}`}>
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
                    <div className="col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="MergeRank Logo" className="w-6 h-6 object-contain" />
                            <span className={`text-lg font-bold tracking-tight transition-colors ${t.footerBrand}`}>MergeRank</span>
                        </div>
                        <p className="max-w-xs mb-4">Competitive Programming Analytics &amp; Mentorship Platform. Built for the modern coding curriculum.</p>
                        <p>Built with MERN Stack • Real Deployment</p>
                    </div>
                    <div>
                        <h4 className={`font-semibold mb-4 transition-colors ${t.footerHead}`}>Product</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Student Features</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Mentor Features</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">AI Suggestions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className={`font-semibold mb-4 transition-colors ${t.footerHead}`}>Legal</h4>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;