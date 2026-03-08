import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { studentService } from '../services/api';
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';

export function Leaderboard() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We can fetch default leaderboard (leetcode) 
    studentService.getBatchLeaderboard('leetcode').then(data => {
      setStudents(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Layout role="student"><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;

  return (
    <Layout role="student">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Batch Leaderboard</h2>
            <p className="text-slate-500 mt-1">Compare your progress with your peers in 2025-CS-A.</p>
          </div>
          <div className="flex items-center gap-3">
            <select className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Placement Readiness</option>
              <option>Total Solved</option>
              <option>LeetCode Rating</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              Top Performers
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 w-16 text-center">Rank</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4 text-center">Readiness Score</th>
                  <th className="px-6 py-4 text-center">Total Solved</th>
                  <th className="px-6 py-4 text-center">LeetCode Rating</th>
                  <th className="px-6 py-4 text-center">GitHub Commits</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {students.map((student, index) => {
                  const platforms = student.platforms || {};
                  const totalSolved = Object.values(platforms).reduce((acc, curr) =>
                    acc + (curr?.solved || curr?.totalSolved || 0), 0
                  );
                  const isCurrentUser = false; // Need auth context to properly identify current user

                  return (
                    <tr key={student.id} className={`hover:bg-slate-50 transition-colors ${isCurrentUser ? 'bg-indigo-50/50' : ''}`}>
                      <td className="px-6 py-4 text-center font-bold text-slate-700">
                        {index === 0 ? <Medal className="w-6 h-6 text-amber-400 mx-auto" /> :
                          index === 1 ? <Medal className="w-6 h-6 text-slate-400 mx-auto" /> :
                            index === 2 ? <Medal className="w-6 h-6 text-amber-700 mx-auto" /> :
                              `#${index + 1}`}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                            {student.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900 flex items-center gap-2">
                              {student.name}
                              {isCurrentUser && <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase tracking-wider">You</span>}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-slate-100 font-bold text-slate-700">
                          {student.placementReadiness}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center font-mono text-slate-600">{totalSolved}</td>
                      <td className="px-6 py-4 text-center font-mono text-slate-600">{student.platforms.leetcode.rating}</td>
                      <td className="px-6 py-4 text-center font-mono text-slate-600">{student.platforms.github.totalCommits}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
