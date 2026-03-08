import React, { useState, useEffect } from 'react';
import { Sun, Moon, CheckCircle2, XCircle, Loader2, ChevronRight, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { studentService } from '../services/api';


const platformsConfig = [
    {
        id: 'leetcode',
        name: 'LeetCode',
        urlPrefix: 'leetcode.com/',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png',
        theme: 'focus:border-orange-500 focus:ring-orange-500/20',
    },
    {
        id: 'github',
        name: 'GitHub',
        urlPrefix: 'github.com/',
        logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
        theme: 'focus:border-slate-800 focus:ring-slate-800/20 dark:focus:border-slate-400 dark:focus:ring-slate-400/20',
    },
    {
        id: 'codeforces',
        name: 'Codeforces',
        urlPrefix: 'codeforces.com/profile/',
        logo: 'https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3628695-3029920.png',
        theme: 'focus:border-blue-500 focus:ring-blue-500/20',
    },
    {
        id: 'codechef',
        name: 'CodeChef',
        urlPrefix: 'codechef.com/users/',
        // Using a reliable high-res alternative for CodeChef
        logo: 'https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cb860f4.png',
        theme: 'focus:border-amber-700 focus:ring-amber-700/20',
    },
    {
        id: 'hackerrank',
        name: 'HackerRank',
        urlPrefix: 'hackerrank.com/',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/65/HackerRank_logo.png',
        theme: 'focus:border-green-500 focus:ring-green-500/20',
    }
];

const StudentOnboarding = () => {
    const navigate = useNavigate();
    const [isDark, setIsDark] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // States for inputs and validation statuses
    const [usernames, setUsernames] = useState({
        leetcode: '', github: '', codeforces: '', codechef: '', hackerrank: ''
    });

    // Status can be: 'idle', 'loading', 'success', 'error'
    const [statuses, setStatuses] = useState({
        leetcode: 'idle', github: 'idle', codeforces: 'idle', codechef: 'idle', hackerrank: 'idle'
    });

    const [errors, setErrors] = useState({});

    // Toggle Theme
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const handleInputChange = (platformId, value) => {
        setUsernames(prev => ({ ...prev, [platformId]: value }));
        // Reset status to idle if user starts typing again after an error/success
        if (statuses[platformId] !== 'idle') {
            setStatuses(prev => ({ ...prev, [platformId]: 'idle' }));
            setErrors(prev => ({ ...prev, [platformId]: '' }));
        }
    };

    const handleVerify = async (platformId) => {
        const username = usernames[platformId].trim();
        if (!username) return;

        setStatuses(prev => ({ ...prev, [platformId]: 'loading' }));

        // Call the external service
        try {
            const response = await studentService.verifyPlatform(platformId, username);

            if (response.isValid) {
                setStatuses(prev => ({ ...prev, [platformId]: 'success' }));
                setErrors(prev => ({ ...prev, [platformId]: '' }));
            } else {
                setStatuses(prev => ({ ...prev, [platformId]: 'error' }));
                setErrors(prev => ({ ...prev, [platformId]: response.message }));
            }
        } catch (error) {
            setStatuses(prev => ({ ...prev, [platformId]: 'error' }));
            setErrors(prev => ({ ...prev, [platformId]: error.response?.data?.message || 'Verification failed due to an error' }));
        }
    };

    // Check if at least one platform is verified successfully
    const canProceed = Object.values(statuses).includes('success');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canProceed) return;

        setIsSubmitting(true);
        // Map verified usernames, keep null for empty/unverified
        const payload = {
            leetcode: statuses.leetcode === 'success' ? usernames.leetcode.trim() : null,
            github: statuses.github === 'success' ? usernames.github.trim() : null,
            codeforces: statuses.codeforces === 'success' ? usernames.codeforces.trim() : null,
            codechef: statuses.codechef === 'success' ? usernames.codechef.trim() : null,
            hackerrank: statuses.hackerrank === 'success' ? usernames.hackerrank.trim() : null
        };

        console.log('Proceeding with verified accounts:', payload);

        try {
            await studentService.updatePlatforms(payload);
            await studentService.syncData();
            navigate('/student');
        } catch (error) {
            console.error('Failed to save platforms:', error);
            // You can set a global error state here if needed
            setIsSubmitting(false);
        }
    };

    return (
        <div className={`min-h-screen w-full transition-colors duration-300 font-sans flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${isDark ? 'dark bg-[#0B1120]' : 'bg-slate-50'}`}>

            {/* Absolute Background Pattern */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px]"></div>
                <div className="absolute top-[60%] -right-[10%] w-[40%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px]"></div>
            </div>

            {/* Top bar */}
            <div className="absolute top-0 right-0 w-full p-6 flex justify-end items-center z-20">
                <button
                    onClick={() => setIsDark(!isDark)}
                    className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm border border-slate-200 dark:border-slate-700 transition-all focus:outline-none"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
            </div>

            {/* Main Card */}
            <div className="w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/40 border border-slate-200 dark:border-slate-800 z-10 overflow-hidden flex flex-col">

                {/* Header Section */}
                <div className="px-8 pt-10 pb-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">Connect your profiles</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Link your competitive programming accounts to build your MergeRank profile.
                        <span className="block mt-1 font-medium text-indigo-600 dark:text-indigo-400">
                            You must verify at least one platform to continue.
                        </span>
                    </p>
                </div>

                {/* Platforms List */}
                <div className="p-8 space-y-6 flex-1">
                    {platformsConfig.map((platform) => {
                        const status = statuses[platform.id];
                        const username = usernames[platform.id];

                        return (
                            <div key={platform.id} className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md dark:hover:shadow-indigo-500/10 transition-all bg-white dark:bg-slate-800/50">

                                {/* Logo & Name */}
                                <div className="flex items-center gap-4 sm:w-48 shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2">
                                        <img src={platform.logo} alt={platform.name} className="w-full h-full object-contain" />
                                    </div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{platform.name}</span>
                                </div>

                                {/* Input Area */}
                                <div className="flex-1 relative">
                                    <div className="flex rounded-xl shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus-within:ring-2 focus-within:ring-inset overflow-hidden bg-slate-50 dark:bg-slate-900 transition-shadow">
                                        <span className="flex select-none items-center pl-4 pr-2 text-slate-400 sm:text-sm bg-transparent">
                                            {platform.urlPrefix}
                                        </span>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => handleInputChange(platform.id, e.target.value)}
                                            disabled={status === 'success' || status === 'loading'}
                                            className={`block flex-1 border-0 bg-transparent py-3 pl-1 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                                            placeholder="username"
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {status === 'error' && (
                                        <p className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium flex items-center gap-1">
                                            <AlertCircle className="w-3 h-3" /> {errors[platform.id]}
                                        </p>
                                    )}
                                </div>

                                {/* Action Button / Status */}
                                <div className="sm:w-32 shrink-0 flex justify-end">
                                    {status === 'idle' && (
                                        <button
                                            onClick={() => handleVerify(platform.id)}
                                            disabled={!username.trim()}
                                            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                                        >
                                            <LinkIcon className="w-4 h-4" /> Verify
                                        </button>
                                    )}

                                    {status === 'loading' && (
                                        <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" /> Verifying...
                                        </div>
                                    )}

                                    {status === 'success' && (
                                        <div className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-500/20">
                                            <CheckCircle2 className="w-4 h-4" /> Verified
                                        </div>
                                    )}

                                    {status === 'error' && (
                                        <button
                                            onClick={() => setStatuses(prev => ({ ...prev, [platform.id]: 'idle' }))}
                                            className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 border border-red-200 dark:border-red-500/20"
                                        >
                                            <XCircle className="w-4 h-4" /> Retry
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        {!canProceed ? (
                            <span className="flex items-center gap-1"><AlertCircle className="w-4 h-4 text-amber-500" /> Verify at least 1 platform</span>
                        ) : (
                            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Ready to go</span>
                        )}
                    </div>

                    <button
                        onClick={handleSubmit}
                        disabled={!canProceed || isSubmitting}
                        className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 ${canProceed && !isSubmitting
                            ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/25 active:scale-95'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
                            }`}
                    >
                        {isSubmitting ? (
                            <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
                        ) : (
                            <>Complete Setup <ChevronRight className="w-5 h-5" /></>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentOnboarding;