import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { mentorService } from '../services/api';
import { Users, AlertTriangle, TrendingUp, Search, Filter, MoreVertical, ChevronRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getStatusColor, getStatusText, getStatusBgColor } from '../utils/statusHelper';

export function MentorDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mentorService.getMentorDashboard().then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  const handleExport = () => {
    if (!data || !data.students) return;

    const headers = ["Student Name", "Email", "Batch", "Total Solved", "LeetCode Rating", "Readiness", "Status"];
    const csvContent = [
      headers.join(","),
      ...data.students.map(student => {
        const totalSolved = Object.values(student.platforms).reduce((acc, curr) => acc + (curr.solved || curr.totalSolved || 0), 0);
        return [
          `"${student.name}"`,
          `"${student.email}"`,
          `"${student.batch}"`,
          totalSolved,
          student.platforms.leetcode.rating,
          student.placementReadiness,
          getStatusText(student.placementReadiness)
        ].join(",");
      })
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `student_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <Layout role="mentor"><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;

  const totalStudents = data.students.length;
  // Based on Backend Readiness Calculator
  const atRiskStudents = data.students.filter((s) => s.placementReadiness < 40).length;
  const placementReady = data.students.filter((s) => s.placementReadiness >= 80).length;

  return (
    <Layout role="mentor">
      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Class Overview</h2>
            <p className="text-slate-500 mt-1">Monitor your batches and student progress.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Students" value={totalStudents} icon={Users} color="text-indigo-600" bg="bg-indigo-50" />
          <StatCard title="Placement Ready (80+)" value={placementReady} icon={TrendingUp} color="text-emerald-600" bg="bg-emerald-50" />
          <StatCard title="At Risk (< 40)" value={atRiskStudents} icon={AlertTriangle} color="text-rose-600" bg="bg-rose-50" />
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-800">Student Performance</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search students..."
                  className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <button className="p-2 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50">
                <Filter className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Batch</th>
                  <th className="px-6 py-4">Total Solved</th>
                  <th className="px-6 py-4">LeetCode Rating</th>
                  <th className="px-6 py-4">Readiness</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.students.map((student) => {
                  const totalSolved = Object.values(student.platforms).reduce((acc, curr) => acc + (curr.solved || curr.totalSolved || 0), 0);
                  const readiness = student.placementReadiness;

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                            {student.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <div className="font-medium text-slate-900">{student.name}</div>
                            <div className="text-slate-500 text-xs">{student.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{student.batch}</td>
                      <td className="px-6 py-4 font-mono text-slate-700">{totalSolved}</td>
                      <td className="px-6 py-4 font-mono text-slate-700">{student.platforms.leetcode.rating}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${getStatusBgColor(readiness)}`}
                              style={{ width: `${readiness}%` }}
                            />
                          </div>
                          <span className="font-medium text-slate-700">{readiness}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(readiness)}`}>
                          {getStatusText(readiness)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/student/${student.id}`} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                        </Link>
                      </td>
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

function StatCard({ title, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg} ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className="text-2xl font-bold text-slate-900 mt-1">{value}</div>
      </div>
    </div>
  );
}
