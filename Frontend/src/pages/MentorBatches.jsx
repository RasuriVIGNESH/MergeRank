import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { mentorService } from '../services/api';
import { Users, Plus, MoreVertical, Copy, CheckCircle2 } from 'lucide-react';

export function MentorBatches() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    mentorService.getMentorDashboard('m1').then(res => {
      setData(res);
      setLoading(false);
    });
  }, []);

  if (loading) return <Layout role="mentor"><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <Layout role="mentor">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Manage Batches</h2>
            <p className="text-slate-500 mt-1">Organize your students into batches.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors">
            <Plus className="w-5 h-5" />
            Create Batch
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.batches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {batch.name.substring(0, 2)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{batch.name}</h3>
                    <p className="text-xs text-slate-500">{batch.college} • {batch.year}</p>
                  </div>
                </div>
                <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-5 h-5 text-slate-400" />
                    <span className="font-medium">{batch.students.length} Students</span>
                  </div>
                  <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View All</button>
                </div>
                
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Invite Code</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-slate-100 rounded-lg text-sm font-mono text-slate-700 border border-slate-200">
                      {batch.inviteCode}
                    </code>
                    <button 
                      onClick={() => handleCopy(batch.inviteCode)}
                      className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors border border-slate-200"
                      title="Copy Invite Code"
                    >
                      {copied === batch.inviteCode ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
