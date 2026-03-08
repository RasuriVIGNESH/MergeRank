import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { studentService } from '../services/api';
import { Github, Code2, Trophy, Award, BookOpen, Star, RefreshCw } from 'lucide-react';

export function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await studentService.getStudentProfile();
      setStudent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSync = async () => {
    if (syncLoading) return;
    setSyncLoading(true);
    try {
      await studentService.syncData();
      await fetchProfile();
    } catch (err) {
      alert("Sync failed: " + (err.response?.data?.message || err.message));
    } finally {
      setSyncLoading(false);
    }
  };

  if (loading) return <Layout role="student"><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;
  if (!student) return <Layout role="student"><div className="text-center p-10"><h2 className="text-xl font-bold">Failed to load profile.</h2></div></Layout>;

  // Merge default values to prevent crashes from missing DB fields
  const safePlatforms = student.platforms || {
    leetcode: { rating: 0, streak: 0, totalSolved: 0, lastSynced: new Date() },
    github: { totalCommits: 0, repos: 0, stars: 0, lastSynced: new Date() },
    codeforces: { rating: 0, rank: 'N/A', solved: 0, lastSynced: new Date() },
    codechef: { rating: 0, stars: '0*', solved: 0, lastSynced: new Date() },
    hackerrank: { badges: 0, certificates: 0, solved: 0, lastSynced: new Date() }
  };

  const platforms = [
    {
      name: 'LeetCode',
      icon: Code2,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      stats: [
        { label: 'Rating', value: safePlatforms.leetcode?.rating || 0 },
        { label: 'Solved', value: safePlatforms.leetcode?.totalSolved || 0 },
        { label: 'Streak', value: `${safePlatforms.leetcode?.streak || 0} days` }
      ],
      lastSynced: safePlatforms.leetcode?.lastSynced
    },
    {
      name: 'GitHub',
      icon: Github,
      color: 'text-slate-800',
      bg: 'bg-slate-100',
      border: 'border-slate-200',
      stats: [
        { label: 'Commits', value: safePlatforms.github?.totalCommits || 0 },
        { label: 'Repos', value: safePlatforms.github?.repos || 0 },
        { label: 'Stars', value: safePlatforms.github?.stars || 0 }
      ],
      lastSynced: safePlatforms.github?.lastSynced
    },
    {
      name: 'Codeforces',
      icon: Trophy,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      stats: [
        { label: 'Rating', value: safePlatforms.codeforces?.rating || 0 },
        { label: 'Rank', value: safePlatforms.codeforces?.rank || 'N/A' },
        { label: 'Solved', value: safePlatforms.codeforces?.solved || 0 }
      ],
      lastSynced: safePlatforms.codeforces?.lastSynced
    },
    {
      name: 'CodeChef',
      icon: BookOpen,
      color: 'text-rose-600',
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      stats: [
        { label: 'Rating', value: safePlatforms.codechef?.rating || 0 },
        { label: 'Stars', value: safePlatforms.codechef?.stars || '0*' },
        { label: 'Solved', value: safePlatforms.codechef?.solved || 0 }
      ],
      lastSynced: safePlatforms.codechef?.lastSynced
    },
    {
      name: 'HackerRank',
      icon: Award,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      stats: [
        { label: 'Badges', value: safePlatforms.hackerrank?.badges || 0 },
        { label: 'Certificates', value: safePlatforms.hackerrank?.certificates || 0 },
        { label: 'Solved', value: safePlatforms.hackerrank?.solved || 0 }
      ],
      lastSynced: safePlatforms.hackerrank?.lastSynced
    }
  ];

  return (
    <Layout role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Platform Integrations</h2>
            <p className="text-slate-500 mt-1">Manage your connected accounts and sync data.</p>
          </div>
          <button
            onClick={handleSync}
            disabled={syncLoading}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${syncLoading ? 'animate-spin' : ''}`} />
            {syncLoading ? 'Syncing...' : 'Sync All Now'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, idx) => (
            <div key={idx} className={`bg-white rounded-2xl border ${platform.border} shadow-sm overflow-hidden flex flex-col`}>
              <div className={`p-6 ${platform.bg} border-b ${platform.border} flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <platform.icon className={`w-6 h-6 ${platform.color}`} />
                  <h3 className={`font-bold ${platform.color}`}>{platform.name}</h3>
                </div>
                <span className="px-2.5 py-1 bg-white rounded-full text-xs font-medium text-slate-600 shadow-sm">Connected</span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {platform.stats.map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                      <div className="font-bold text-slate-900">{stat.value}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Last synced: {new Date(platform.lastSynced).toLocaleString()}</span>
                  <button
                    onClick={handleSync}
                    disabled={syncLoading}
                    className="font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                  >
                    {syncLoading ? '...' : 'Sync'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
