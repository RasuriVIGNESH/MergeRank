import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Eye, EyeOff, ChevronRight, AlertCircle } from 'lucide-react';
import { authService } from '../services/api';

const Register = () => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', email: '',
        college: '', gradYear: '', branch: '', batchCode: '',
        password: '', confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const calculateStrength = (pass) => {
        let s = 0;
        if (!pass) return 0;
        if (pass.length > 8) s++;
        if (/[A-Z]/.test(pass)) s++;
        if (/[0-9]/.test(pass)) s++;
        if (/[^A-Za-z0-9]/.test(pass)) s++;
        return s;
    };

    const strength = calculateStrength(formData.password);
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    const strengthText = ['Weak', 'Fair', 'Good', 'Strong'];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const userData = {
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                gradYear: formData.gradYear,
                branch: formData.branch,
                batch: formData.batchCode,
                college: formData.college
            };

            await authService.register(userData);
            navigate('/onboarding');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    /* ── theme tokens ──────────────────────────────────────────────────── */
    const bg = isDark ? 'bg-[#0B1120]' : 'bg-slate-50';
    const cardBg = isDark ? 'bg-[#111827]' : 'bg-white';
    const text = isDark ? 'text-white' : 'text-slate-900';
    const subText = isDark ? 'text-slate-400' : 'text-slate-500';
    const border = isDark ? 'border-slate-700' : 'border-slate-200';
    const inputBg = isDark ? 'bg-[#0B1120] text-white' : 'bg-slate-50 text-slate-900';
    const labelCls = isDark ? 'text-slate-400' : 'text-slate-500';

    /* compact input — h-9 instead of h-12 */
    const inputClass = `w-full h-9 px-3 rounded-lg border ${border} ${inputBg} outline-none
        focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm placeholder-slate-400`;

    return (
        /* h-screen + overflow-hidden → nothing outside the viewport */
        <div className={`h-screen overflow-hidden flex w-full font-sans transition-colors duration-300 ${bg}`}>

            {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
            <div className="hidden lg:flex w-5/12 bg-slate-900 relative flex-col justify-between overflow-hidden border-r border-slate-800">
                {/* Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-80 h-80 bg-indigo-600 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-80 h-80 bg-cyan-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Brand */}
                <div className="px-20 pt-25 pb-10 z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <img src="/logo.png" alt="MergeRank" className="w-9 h-9 object-contain" />
                        <h1 className="text-2xl font-bold tracking-tight text-white">MergeRank</h1>
                    </div>
                    <h2 className="text-3xl font-semibold text-white leading-tight mb-3">
                        Track your growth.<br />
                        <span className="text-indigo-400">Prove your potential.</span>
                    </h2>
                    <p className="text-slate-400 leading-relaxed max-w-xs text-sm">
                        Unify your competitive programming profiles into one powerful dashboard. Stand out to mentors and recruiters.
                    </p>
                </div>

                {/* Platform orbit — scaled down */}
                <div className="flex-1 flex items-center justify-center px-10 z-10">
                    <div className="relative w-56 h-56">
                        {/* Centre */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-indigo-500/50 z-20 border border-indigo-400/30">
                            <span className="text-white font-bold text-base">MR</span>
                        </div>
                        {/* Lines */}
                        <svg className="absolute inset-0 w-full h-full -z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <line x1="50" y1="50" x2="50" y2="15" stroke="#4F46E5" strokeWidth="0.8" strokeDasharray="3" opacity="0.5" />
                            <line x1="50" y1="50" x2="85" y2="50" stroke="#4F46E5" strokeWidth="0.8" strokeDasharray="3" opacity="0.5" />
                            <line x1="50" y1="50" x2="50" y2="85" stroke="#4F46E5" strokeWidth="0.8" strokeDasharray="3" opacity="0.5" />
                            <line x1="50" y1="50" x2="15" y2="50" stroke="#4F46E5" strokeWidth="0.8" strokeDasharray="3" opacity="0.5" />
                        </svg>
                        <PlatformNode url="https://cdn.simpleicons.org/leetcode/FFA116" top="5%" left="50%" name="LeetCode" />
                        <PlatformNode url="https://cdn.simpleicons.org/github/ffffff" top="50%" left="95%" name="GitHub" />
                        <PlatformNode url="https://cdn.simpleicons.org/codeforces/1F8ACB" top="95%" left="50%" name="Codeforces" />
                        <PlatformNode url="https://cdn.simpleicons.org/hackerrank/2EC866" top="50%" left="5%" name="HackerRank" />
                    </div>
                </div>

                <div className="px-10 py-6 z-10 border-t border-slate-800">
                    <p className="text-xs text-slate-500">Supported: LeetCode · GitHub · Codeforces · CodeChef · HackerRank</p>
                </div>
            </div>

            {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
            {/* overflow-y-auto allows internal scroll on very small screens only */}
            <div className={`flex-1 flex flex-col h-full overflow-y-auto transition-colors duration-300 ${cardBg}`}>

                {/* Top bar */}
                <div className="flex-shrink-0 flex justify-between lg:justify-end items-center gap-4 px-6 py-3 border-b border-slate-100 dark:border-slate-800">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-2">
                        <img src="/logo.png" alt="MergeRank" className="w-7 h-7 object-contain" />
                        <span className={`font-bold text-sm ${text}`}>MergeRank</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <p className={`text-sm ${subText} hidden sm:block`}>
                            Already have an account?{' '}
                            <button onClick={() => navigate('/login')} className="text-indigo-500 hover:text-indigo-400 font-semibold transition-colors">
                                Log in
                            </button>
                        </p>
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className={`p-1.5 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 ${isDark ? 'bg-slate-700 text-slate-200 hover:bg-slate-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            aria-label="Toggle theme"
                        >
                            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Form — centred in remaining space */}
                <div className="flex-1 flex items-center justify-center px-6 py-4">
                    <div className="w-full max-w-md">


                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600 text-sm">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3">

                            {/* Name */}
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="First Name" isDark={isDark} labelCls={labelCls}>
                                    <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} placeholder="Alex" className={inputClass} />
                                </Field>
                                <Field label="Last Name" isDark={isDark} labelCls={labelCls}>
                                    <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} placeholder="Johnson" className={inputClass} />
                                </Field>
                            </div>

                            {/* Email */}
                            <Field label="College Email" isDark={isDark} labelCls={labelCls}>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="you@college.edu" className={inputClass} />
                            </Field>

                            {/* College */}
                            <Field label="College" isDark={isDark} labelCls={labelCls}>
                                <select name="college" required value={formData.college} onChange={handleChange} className={inputClass}>
                                    <option value="" disabled>Select College</option>
                                    {['Woxsen'].map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </Field>

                            {/* Academic */}
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Graduation Year" isDark={isDark} labelCls={labelCls}>
                                    <select name="gradYear" required value={formData.gradYear} onChange={handleChange} className={inputClass}>
                                        <option value="" disabled>Year</option>
                                        {[2025, 2026, 2027, 2028, 2029].map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </Field>
                                <Field label="Branch" isDark={isDark} labelCls={labelCls}>
                                    <select name="branch" required value={formData.branch} onChange={handleChange} className={inputClass}>
                                        <option value="" disabled>Branch</option>
                                        {[['CS', 'Computer Science'], ['IT', 'Info. Tech'], ['ECE', 'Electronics'], ['EE', 'Electrical'], ['ME', 'Mechanical']].map(([v, l]) => (
                                            <option key={v} value={v}>{l}</option>
                                        ))}
                                    </select>
                                </Field>
                            </div>

                            {/* Batch / Dept */}
                            {/* <Field label="Batch Invite Code" isDark={isDark} labelCls={labelCls}>
                                <input type="text" name="batchCode" required value={formData.batchCode} onChange={handleChange}
                                    placeholder="e.g. 2025-CS-A"
                                    className={inputClass} />
                            </Field> */}

                            {/* Password row */}
                            <div className="grid grid-cols-2 gap-3">
                                <Field label="Password" isDark={isDark} labelCls={labelCls}>
                                    <div className="relative">
                                        <input type={showPassword ? 'text' : 'password'} name="password" required
                                            value={formData.password} onChange={handleChange}
                                            placeholder="Min 8 chars" className={inputClass + ' pr-9'} />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                            className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${subText} hover:text-indigo-500`}>
                                            {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                    {formData.password.length > 0 && (
                                        <div className="mt-1 flex gap-1 h-1 rounded-full overflow-hidden">
                                            {[...Array(4)].map((_, i) => (
                                                <div key={i} className={`h-full w-1/4 rounded-full transition-colors duration-300 ${i < strength ? strengthColors[strength - 1] : isDark ? 'bg-slate-700' : 'bg-slate-200'}`} />
                                            ))}
                                        </div>
                                    )}
                                </Field>

                                <Field label="Confirm Password" isDark={isDark} labelCls={labelCls}>
                                    <div className="relative">
                                        <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" required
                                            value={formData.confirmPassword} onChange={handleChange}
                                            placeholder="Re-enter"
                                            className={`${inputClass} pr-9 ${formData.confirmPassword && formData.password !== formData.confirmPassword ? 'border-red-400' : ''}`} />
                                        <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                            className={`absolute right-2.5 top-1/2 -translate-y-1/2 ${subText} hover:text-indigo-500`}>
                                            {showConfirm ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                                        </button>
                                    </div>
                                    {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                        <p className="text-[10px] text-red-500 mt-0.5">Passwords don't match</p>
                                    )}
                                </Field>
                            </div>

                            {/* Submit */}
                            <button type="submit"
                                disabled={loading}
                                className="group w-full h-10 mt-1 bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed">
                                {loading ? 'Creating Account...' : 'Create Account'}
                                {!loading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                            </button>

                            {/* Terms */}
                            <p className={`text-center text-[11px] ${subText}`}>
                                By registering, you agree to our{' '}
                                <a href="#" className="underline hover:text-indigo-500">Terms of Service</a> and{' '}
                                <a href="#" className="underline hover:text-indigo-500">Privacy Policy</a>.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

/* tiny label+slot wrapper to keep the form DRY */
const Field = ({ label, labelCls, children }) => (
    <div>
        <label className={`block text-[11px] font-semibold uppercase tracking-wide mb-1 ${labelCls}`}>{label}</label>
        {children}
    </div>
);

/* Platform node for the branding visual */
const PlatformNode = ({ url, top, left, name }) => (
    <div className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20" style={{ top, left }}>
        <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-xl hover:scale-110 transition-transform cursor-pointer overflow-hidden">
            <img src={url} alt={name} className="w-6 h-6 object-contain" />
        </div>
        <div className="absolute top-12 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-700 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            {name}
        </div>
    </div>
);

export default Register;