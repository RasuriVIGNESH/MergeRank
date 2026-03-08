import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { studentService } from '../services/api';
import { Lightbulb, Target, BrainCircuit, ArrowRight, CheckCircle2 } from 'lucide-react';

export function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentService.getStudentSuggestions().then(data => {
      setSuggestions(data.suggestions || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <Layout role="student"><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;

  return (
    <Layout role="student">
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-indigo-600" />
              AI Recommendations
            </h2>
            <p className="text-slate-500 mt-1">Personalized study plan based on your recent performance.</p>
          </div>
        </div>

        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-indigo-900">Weekly Goal</h3>
            <p className="text-indigo-700 mt-1">
              Your placement readiness score is 82. To reach 90+, focus on improving your solve rate in <strong>Graphs</strong> and <strong>Dynamic Programming</strong>. Try to solve 5 medium problems in these topics this week.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800">Targeted Topics</h3>
          {(suggestions || []).map((suggestion, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">{suggestion.topic}</h4>
                    <p className="text-slate-600 mt-1">{suggestion.tip}</p>

                    <div className="mt-6">
                      <h5 className="text-sm font-medium text-slate-700 mb-3 uppercase tracking-wider">Recommended Problems</h5>
                      <div className="space-y-2">
                        {(suggestion.problems || []).map((prob, i) => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors group cursor-pointer">
                            <div className="flex items-center gap-3">
                              <CheckCircle2 className="w-5 h-5 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                              <span className="font-medium text-slate-700">{prob}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                          </div>
                        ))}
                      </div>
                    </div>
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
