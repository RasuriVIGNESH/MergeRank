import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { studentService } from '../services/api';
import { useParams } from 'react-router-dom';
import { Github, Code2, Trophy, Award, BookOpen, Star, RefreshCw, Users } from 'lucide-react';

export function StudentProfile() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [syncLoading, setSyncLoading] = useState(false);
  const [newPlatformInputs, setNewPlatformInputs] = useState({});
  const [connectingPlatform, setConnectingPlatform] = useState(null);

  const fetchProfile = async () => {
    try {
      const data = await studentService.getStudentProfile(id);
      setStudent(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [id]);

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

  const handleConnect = async (platformId) => {
    const username = newPlatformInputs[platformId];
    if (!username) return;
    setConnectingPlatform(platformId);
    try {
      const verifyRes = await studentService.verifyPlatform(platformId, username);
      if (!verifyRes.isValid) {
        alert(verifyRes.message || "Invalid username");
        setConnectingPlatform(null);
        return;
      }
      const updatedPlatforms = {
        leetcode: safePlatforms.leetcode?.username || null,
        github: safePlatforms.github?.username || null,
        codeforces: safePlatforms.codeforces?.username || null,
        codechef: safePlatforms.codechef?.username || null,
        hackerrank: safePlatforms.hackerrank?.username || null,
        [platformId]: username
      };
      await studentService.updatePlatforms(updatedPlatforms);
      await studentService.syncData();
      await fetchProfile();
      setNewPlatformInputs(prev => ({ ...prev, [platformId]: '' }));
    } catch (err) {
      alert("Failed to connect: " + (err.response?.data?.message || err.message));
    } finally {
      setConnectingPlatform(null);
    }
  };

  if (loading) return <Layout><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;
  if (!student) return <Layout><div className="text-center p-10"><h2 className="text-xl font-bold">Failed to load profile.</h2></div></Layout>;

  // Merge default values to prevent crashes from missing DB fields
  const safePlatforms = student.platforms || {
    leetcode: { easy: 0, medium: 0, hard: 0, totalSolved: 0, lastSynced: null },
    github: { totalContributions: 0, publicRepos: 0, totalStars: 0, lastSynced: null },
    codeforces: { rating: 0, rank: 'N/A', solved: 0, lastSynced: null },
    codechef: { rating: 0, stars: '0*', solved: 0, lastSynced: null },
    hackerrank: { badges: 0, certificates: 0, solved: 0, lastSynced: null }
  };

  const platforms = [
    {
      id: 'leetcode',
      name: 'LeetCode',
      username: safePlatforms.leetcode?.username,
      isConnected: !!safePlatforms.leetcode?.username,
      icon: Code2,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      stats: [
        { label: 'Total', value: safePlatforms.leetcode?.totalSolved || 0 },
        { label: 'Easy', value: safePlatforms.leetcode?.easy || 0 },
        { label: 'Med', value: safePlatforms.leetcode?.medium || 0 },
        { label: 'Hard', value: safePlatforms.leetcode?.hard || 0 }
      ],
      lastSynced: safePlatforms.leetcode?.lastSynced
    },
    {
      id: 'github',
      name: 'GitHub',
      username: safePlatforms.github?.username,
      isConnected: !!safePlatforms.github?.username,
      icon: Github,
      color: 'text-slate-800',
      bg: 'bg-slate-100',
      border: 'border-slate-200',
      stats: [
        { label: 'Contributions', value: safePlatforms.github?.totalContributions || 0 },
        { label: 'Repos', value: safePlatforms.github?.publicRepos || 0 },
        { label: 'Stars', value: safePlatforms.github?.totalStars || 0 }
      ],
      lastSynced: safePlatforms.github?.lastSynced
    },
    {
      id: 'codeforces',
      name: 'Codeforces',
      username: safePlatforms.codeforces?.username,
      isConnected: !!safePlatforms.codeforces?.username,
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
      id: 'codechef',
      name: 'CodeChef',
      username: safePlatforms.codechef?.username,
      isConnected: !!safePlatforms.codechef?.username,
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
      id: 'hackerrank',
      name: 'HackerRank',
      username: safePlatforms.hackerrank?.username,
      isConnected: !!safePlatforms.hackerrank?.username,
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
    <Layout>
      <div className="space-y-8">
        {/* User Details Section */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-indigo-50/50 to-white">
            <div className="w-24 h-24 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-4xl font-bold shadow-xl shadow-indigo-200 shrink-0">
              {student.name ? student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '??'}
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-900 mb-1">{student.name}</h2>
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-3">
                <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-sm">
                  <RefreshCw className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">{student.email}</span>
                </div>
                {student.branch && (
                  <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-sm">
                    <span className="font-medium">{student.branch}-{student.gradYear}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm text-sm">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span className="font-medium">Batch: {student.batch || (student.branch && student.gradYear ? `${student.branch}-${student.gradYear}` : 'Unassigned')}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold border border-emerald-100 flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Score: {student.placementReadiness || 0}
              </div>
              <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Student Profile</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Platform Integrations</h2>
            <p className="text-slate-500 mt-1">Manage your connected accounts and sync data.</p>
          </div>
          {!id && (
            <button
              onClick={handleSync}
              disabled={syncLoading}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-medium hover:bg-indigo-100 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${syncLoading ? 'animate-spin' : ''}`} />
              {syncLoading ? 'Syncing...' : 'Sync All Now'}
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platforms.map((platform, idx) => (
            <div key={idx} className={`bg-white rounded-2xl border ${platform.border} shadow-sm overflow-hidden flex flex-col`}>
              <div className={`p-6 ${platform.bg} border-b ${platform.border} flex items-center justify-between`}>
                <div className="flex flex-col">
                  <div className="flex items-center gap-3">
                    <platform.icon className={`w-6 h-6 ${platform.color}`} />
                    <h3 className={`font-bold ${platform.color}`}>{platform.name}</h3>
                  </div>
                  {platform.isConnected && platform.username && (
                    <span className="text-sm mt-1 ml-9 font-medium text-slate-500">@{platform.username}</span>
                  )}
                </div>
                {platform.isConnected ? (
                  <span className="px-2.5 py-1 bg-white rounded-full text-xs font-medium text-emerald-600 border border-emerald-100 shadow-sm">Connected</span>
                ) : (
                  <span className="px-2.5 py-1 bg-white rounded-full text-xs font-medium text-slate-400 border border-slate-100 shadow-sm">Not Connected</span>
                )}
              </div>

              {platform.isConnected ? (
                <div className="p-6 flex-1 flex flex-col">
                  <div className={`grid ${platform.stats.length === 4 ? 'grid-cols-4' : 'grid-cols-3'} gap-2 mb-6`}>
                    {platform.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <div className="text-[10px] sm:text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">{stat.label}</div>
                        <div className="font-bold text-slate-900">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>Last synced: {platform.lastSynced ? new Date(platform.lastSynced).toLocaleString() : 'Not synced'}</span>
                    {!id && (
                      <button
                        onClick={handleSync}
                        disabled={syncLoading}
                        className="font-medium text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                      >
                        {syncLoading ? '...' : 'Sync'}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 flex-1 flex flex-col justify-center">
                  <div className="flex flex-col gap-3">
                    <input
                      type="text"
                      placeholder={`Enter ${platform.name} username`}
                      value={newPlatformInputs[platform.id] || ''}
                      onChange={(e) => setNewPlatformInputs(prev => ({ ...prev, [platform.id]: e.target.value }))}
                      onKeyDown={(e) => { if (e.key === 'Enter') handleConnect(platform.id) }}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                    />
                    <button
                      onClick={() => handleConnect(platform.id)}
                      disabled={connectingPlatform === platform.id || !newPlatformInputs[platform.id]}
                      className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                    >
                      {connectingPlatform === platform.id ? 'Connecting...' : 'Connect'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
