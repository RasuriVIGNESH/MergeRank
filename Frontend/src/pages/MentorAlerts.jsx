import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { mentorService } from '../services/api';
import { AlertTriangle, Clock, MessageSquare, CheckCircle2 } from 'lucide-react';

export function MentorAlerts() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mentorService.getMentorDashboard('m1').then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <Layout role="mentor"><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;

  const inactiveStudents = data.students.filter((s) => {
    const lastActive = new Date(s.lastActive);
    const now = new Date('2026-03-04T08:00:00Z'); // Mock current time
    const diffTime = Math.abs(now.getTime() - lastActive.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return diffDays > 7;
  });

  const strugglingStudents = data.students.filter((s) => s.placementReadiness < 60);

  return (
    <Layout role="mentor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Actionable Alerts</h2>
            <p className="text-slate-500 mt-1">Students requiring your attention.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Inactive Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-amber-50">
              <h3 className="text-lg font-semibold text-amber-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                Inactive Students (7+ Days)
              </h3>
              <span className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">{inactiveStudents.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {inactiveStudents.length > 0 ? inactiveStudents.map((student) => (
                <div key={student.id} className="p-6 flex items-start justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                      {student.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{student.name}</h4>
                      <p className="text-sm text-slate-500">Last active: {new Date(student.lastActive).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-100" title="Send Message">
                      <MessageSquare className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors border border-emerald-100" title="Mark Resolved">
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-slate-500">No inactive students. Great job!</div>
              )}
            </div>
          </div>

          {/* Struggling Alerts */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-rose-50">
              <h3 className="text-lg font-semibold text-rose-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                Struggling Students (Readiness &lt; 60)
              </h3>
              <span className="px-2.5 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold">{strugglingStudents.length}</span>
            </div>
            <div className="divide-y divide-slate-100">
              {strugglingStudents.length > 0 ? strugglingStudents.map((student) => (
                <div key={student.id} className="p-6 flex items-start justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-sm">
                      {student.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">{student.name}</h4>
                      <p className="text-sm text-rose-600 font-medium">Score: {student.placementReadiness}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-indigo-100" title="View Profile">
                      View
                    </button>
                  </div>
                </div>
              )) : (
                <div className="p-8 text-center text-slate-500">No struggling students. Excellent!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
