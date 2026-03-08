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
        logo: 'data:image/jpeg;base64,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',
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
                            <div
                                key={platform.id}
                                className="group flex items-center gap-6 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 
                                hover:border-indigo-300 dark:hover:border-indigo-500/50 hover:shadow-md 
                                dark:hover:shadow-indigo-500/10 transition-all bg-white dark:bg-slate-800/50"
                            >

                                {/* Logo & Name */}
                                <div className="flex items-center gap-4 w-44 shrink-0">
                                    <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-center overflow-hidden shrink-0 p-2">
                                        <img src={platform.logo} alt={platform.name} className="w-full h-full object-contain" />
                                    </div>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{platform.name}</span>
                                </div>

                                {/* Input Area */}
                                <div className="w-full max-w-md">
                                    <div className="flex rounded-xl shadow-sm ring-1 ring-inset ring-slate-300 dark:ring-slate-700 focus-within:ring-2 focus-within:ring-inset overflow-hidden bg-slate-50 dark:bg-slate-900 transition-shadow">
                                        {/* <span className="flex select-none items-center pl-4 pr-2 text-slate-400 sm:text-sm bg-transparent">
                                            {platform.urlPrefix}
                                        </span> */}
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
                                    <div className="min-h-[18px] mt-1">
                                        {status === "error" && (
                                            <p className="text-xs text-red-500 font-medium flex items-center gap-1">
                                                <AlertCircle className="w-3 h-3" />
                                                {errors[platform.id]}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Action Button / Status */}
                                <div className="w-32 shrink-0 flex justify-end">
                                    {status === "idle" && (
                                        <button
                                            onClick={() => handleVerify(platform.id)}
                                            disabled={!username.trim()}
                                            className="w-full h-10 px-4 rounded-xl text-sm font-medium
                                                    text-slate-700 dark:text-slate-200
                                                    bg-slate-100 dark:bg-slate-700
                                                    hover:bg-slate-200 dark:hover:bg-slate-600
                                                    disabled:opacity-50 disabled:cursor-not-allowed
                                                    transition-colors flex items-center justify-center gap-2"
                                        >
                                            <LinkIcon className="w-4 h-4" />
                                            Verify
                                        </button>
                                    )}

                                    {status === "loading" && (
                                        <div className="w-full h-10 px-4 rounded-xl text-sm font-medium
                                                    text-indigo-600 dark:text-indigo-400
                                                    bg-indigo-50 dark:bg-indigo-500/10
                                                    flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Verifying...
                                        </div>
                                    )}

                                    {status === "success" && (
                                        <div className="w-full h-10 px-4 rounded-xl text-sm font-medium
                                                    text-emerald-600 dark:text-emerald-400
                                                    bg-emerald-50 dark:bg-emerald-500/10
                                                    border border-emerald-200 dark:border-emerald-500/20
                                                    flex items-center justify-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            Verified
                                        </div>
                                    )}

                                    {status === "error" && (
                                        <button
                                            onClick={() =>
                                                setStatuses(prev => ({ ...prev, [platform.id]: "idle" }))
                                            }
                                            className="w-full h-10 px-4 rounded-xl text-sm font-medium
                                                        text-red-600 dark:text-red-400
                                                        bg-red-50 dark:bg-red-500/10
                                                        hover:bg-red-100 dark:hover:bg-red-500/20
                                                        border border-red-200 dark:border-red-500/20
                                                        transition-colors flex items-center justify-center gap-2"
                                        >
                                            <XCircle className="w-4 h-4" />
                                            Retry
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