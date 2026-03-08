import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { studentService } from '../services/api';
import { Activity, Code2, GitCommit, Trophy, TrendingUp, AlertCircle, CheckCircle2, Lightbulb } from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

export function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      studentService.getStudentProfile(),
      studentService.getAnalytics()
    ]).then(([profileData, analyticsData]) => {
      setStudent(profileData);
      setAnalytics(analyticsData);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Layout role="student"><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;
  if (!student) return <Layout role="student"><div className="text-center p-10"><h2 className="text-xl font-bold">Failed to load student data.</h2></div></Layout>;

  // Merge default values to prevent crashes from missing DB fields
  const safeStudent = {
    ...student,
    platforms: student.platforms || {
      leetcode: { rating: 0, streak: 0, totalSolved: 0 },
      github: { totalCommits: 0 },
      codeforces: { rating: 0 },
      codechef: { rating: 0 },
      hackerrank: { solved: 0 }
    },
    contestHistory: student.contestHistory || [],
    aiSuggestions: student.aiSuggestions || []
  };

  const topicData = analytics?.leetcode ? [
    { topic: 'Arrays', solved: analytics.leetcode.arrays || 0 },
    { topic: 'Strings', solved: analytics.leetcode.strings || 0 },
    { topic: 'DP', solved: analytics.leetcode.dp || 0 },
    { topic: 'Graphs', solved: analytics.leetcode.graphs || 0 },
    { topic: 'Trees', solved: analytics.leetcode.trees || 0 }
  ] : safeStudent.topicStats || [
    { topic: 'Arrays', solved: 0 },
    { topic: 'Strings', solved: 0 },
    { topic: 'DP', solved: 0 },
    { topic: 'Graphs', solved: 0 },
    { topic: 'Trees', solved: 0 }
  ];

  const githubContributions = analytics?.github?.totalContributions || safeStudent.platforms.github?.totalContributions || 0;

  const totalSolved = Object.values(safeStudent.platforms).reduce((acc, curr) =>
    acc + (curr?.solved || curr?.totalSolved || 0), 0
  );

  const maxSolved = Math.max(...topicData.map(d => d.solved), 10);

  return (
    <Layout role="student">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Welcome back, {safeStudent.name?.split(' ')[0]}</h2>
            <p className="text-slate-500 mt-1">Here's your competitive programming overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-medium flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Placement Readiness: {safeStudent.placementReadiness || 0}/100
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard title="Total Solved" value={totalSolved} icon={Code2} trend="+0 this week" color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard title="LeetCode Rating" value={safeStudent.platforms.leetcode?.rating || 0} icon={TrendingUp} trend="Active" color="text-amber-600" bg="bg-amber-50" />
          <StatCard title="GitHub Contributions" value={githubContributions} icon={GitCommit} trend="This year" color="text-slate-700" bg="bg-slate-100" />
          <StatCard title="Current Streak" value={`${safeStudent.platforms.leetcode?.streak || 0} days`} icon={Activity} trend="Keep it up!" color="text-rose-600" bg="bg-rose-50" />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Topic Breakdown */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Topic Mastery</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topicData}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="topic" tick={{ fill: '#64748b', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, maxSolved]} tick={false} axisLine={false} />
                  <Radar name="Solved" dataKey="solved" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Contest History */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Contest Rating History</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                {safeStudent.contestHistory.length > 0 ? (
                  <BarChart data={safeStudent.contestHistory}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short' })} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis domain={['dataMin - 100', 'dataMax + 100']} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} dx={-10} />
                    <Tooltip
                      cursor={{ fill: '#f8fafc' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="rating" fill="#4f46e5" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  </BarChart>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-400">
                    <Trophy className="w-12 h-12 mb-2 opacity-20" />
                    <p>No contest history found.</p>
                  </div>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* AI Suggestions Preview */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              AI Recommendations
            </h3>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeStudent.aiSuggestions.length > 0 ? (
              safeStudent.aiSuggestions.map((suggestion, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-100 bg-slate-50">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <AlertCircle className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Focus on {suggestion.topic}</h4>
                      <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-600">
                        {suggestion.problems.map((prob, i) => (
                          <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-slate-200 text-xs font-medium text-slate-700">
                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                            {prob}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic p-4">Sync your platforms to receive AI recommendations.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

function StatCard({ title, value, icon: Icon, trend, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${bg} ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-auto">
        <div className="text-3xl font-bold text-slate-900">{value}</div>
        <div className="text-sm font-medium text-emerald-600 mt-1">{trend}</div>
      </div>
    </div>
  );
}
