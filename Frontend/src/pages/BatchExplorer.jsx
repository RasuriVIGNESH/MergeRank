import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { batchService } from '../services/api';
import { Users, GraduationCap, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function BatchExplorer() {
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        batchService.getBatches().then(data => {
            setBatches(data);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, []);

    const filteredBatches = batches.filter(b =>
        b.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.gradYear.toString().includes(searchTerm)
    );

    if (loading) return <Layout><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">Batch Explorer</h2>
                        <p className="text-slate-500 mt-1">Explore all student batches across branches and years.</p>
                    </div>
                    <div className="relative">
                        <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search branch or year..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBatches.map((batch, index) => (
                        <div
                            key={index}
                            onClick={() => navigate(`/batches/${batch.branch}/${batch.gradYear}`)}
                            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    {batch.branch}
                                </div>
                                <div className="flex items-center gap-1 text-slate-400">
                                    <span className="text-xs font-medium uppercase tracking-wider">Class</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-1">{batch.branch} - {batch.gradYear}</h3>
                            <p className="text-sm text-slate-500 mb-6 flex items-center gap-2">
                                <GraduationCap className="w-4 h-4" />
                                Batch of {batch.gradYear}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-2">
                                    <Users className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-semibold text-slate-700">{batch.studentCount} Students</span>
                                </div>
                                <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Active</span>
                            </div>
                        </div>
                    ))}
                    {filteredBatches.length === 0 && (
                        <div className="col-span-full py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                            <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <p className="text-slate-500">No batches found matching your search.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}
