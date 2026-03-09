import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { leaderboardService, batchService } from '../services/api';
import { Trophy, Medal, Star, Github, Code2, Trophy as CFLogo, Filter, Search } from 'lucide-react';

const PLATFORMS = [
  { id: 'overall', name: 'Overall', icon: Trophy, color: 'text-indigo-600', bg: 'bg-indigo-50' },
  { id: 'leetcode', name: 'LeetCode', icon: Code2, color: 'text-amber-500', bg: 'bg-amber-50' },
  { id: 'codeforces', name: 'Codeforces', icon: CFLogo, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'codechef', name: 'CodeChef', icon: Star, color: 'text-rose-600', bg: 'bg-rose-50' },
  { id: 'github', name: 'GitHub', icon: Github, color: 'text-slate-800', bg: 'bg-slate-100' },
];

export function Leaderboard() {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState('overall');
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [batches, setBatches] = useState([]);
  const userRole = localStorage.getItem('role') || 'student';

  const [filterBranch, setFilterBranch] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch batches for filter dropdown
  useEffect(() => {
    batchService.getBatches().then(setBatches).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    leaderboardService.getLeaderboard(platform, filterBranch, filterYear)
      .then(data => {
        setStudents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [platform, filterBranch, filterYear]);

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankIcon = (rank) => {
    if (rank === 1) return <Medal className="w-6 h-6 text-amber-400 mx-auto" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-slate-400 mx-auto" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-700 mx-auto" />;
    return <span className="text-slate-400 font-bold">#{rank}</span>;
  };

  const getPlatMetric = (student) => {
    if (platform === 'overall') return <span className="font-bold text-indigo-600">{student.github}</span>;
    if (platform === 'leetcode') return <span className="font-bold text-amber-600">{student.solved}</span>;
    if (platform === 'codeforces') return <span className="font-bold text-blue-600">{student.rating}</span>;
    if (platform === 'codechef') return <span className="font-bold text-rose-600">{student.rating}</span>;
    if (platform === 'github') return <span className="font-bold text-slate-800">{student.contributions}</span>;
    return null;
  };

  const getHeaderMetric = () => {
    if (platform === 'overall') return 'GitHub Contributions';
    if (platform === 'leetcode') return 'Total Solved';
    if (platform === 'codeforces' || platform === 'codechef') return 'Rating';
    if (platform === 'github') return 'Contributions';
    return 'Score';
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Leaderboards</h2>
            <p className="text-slate-500 mt-1">Global and batch-specific rankings across all platforms.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">All Branches</option>
                {[...new Set(batches.map(b => b.branch))].map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Years</option>
              {[...new Set(batches.map(b => b.gradYear))].sort().map(y => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full sm:w-48"
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
          {PLATFORMS.map((plat) => {
            const Icon = plat.icon;
            const isActive = platform === plat.id;
            return (
              <button
                key={plat.id}
                onClick={() => setPlatform(plat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${isActive
                  ? `bg-white shadow-sm ${plat.color}`
                  : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {plat.name}
              </button>
            );
          })}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-slate-500 font-medium">Calculating ranks...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 w-20 text-center">Rank</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4 text-center">Batch</th>
                    <th className="px-6 py-4 text-center">{getHeaderMetric()}</th>
                    {platform === 'overall' && (
                      <>
                        <th className="px-6 py-4 text-center">LeetCode</th>
                        <th className="px-6 py-4 text-center">Codeforces</th>
                      </>
                    )}
                    {platform === 'leetcode' && (
                      <>
                        <th className="px-6 py-4 text-center">Easy</th>
                        <th className="px-6 py-4 text-center">Medium</th>
                        <th className="px-6 py-4 text-center">Hard</th>
                      </>
                    )}
                    {userRole === 'mentor' && (
                      <th className="px-6 py-4 text-right pr-10">Actions</th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.rank} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-center">
                        {getRankIcon(student.rank)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs">
                            {student.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{student.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="px-2.5 py-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
                          {student.branch}-{student.gradYear}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center font-mono">
                        {getPlatMetric(student)}
                      </td>

                      {platform === 'overall' && (
                        <>
                          <td className="px-6 py-4 text-center font-mono text-slate-600">{student.leetcode}</td>
                          <td className="px-6 py-4 text-center font-mono text-slate-600">{student.codeforces}</td>
                        </>
                      )}

                      {platform === 'leetcode' && (
                        <>
                          <td className="px-6 py-4 text-center text-emerald-600">{student.easy}</td>
                          <td className="px-6 py-4 text-center text-amber-600">{student.medium}</td>
                          <td className="px-6 py-4 text-center text-rose-600">{student.hard}</td>
                        </>
                      )}

                      {userRole === 'mentor' && (
                        <td className="px-6 py-4 text-right pr-6">
                          <button
                            onClick={() => navigate(`/student/profile/${student._id}`)}
                            className="text-indigo-600 hover:text-indigo-700 font-bold text-xs uppercase tracking-wider"
                          >
                            Profile
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                  {filteredStudents.length === 0 && (
                    <tr>
                      <td colSpan="10" className="p-20 text-center text-slate-400 italic">
                        No rankings found for this selection.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
