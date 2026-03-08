import { useEffect, useState } from 'react';
import { Layout } from '../components/Layout';
import { batchService } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Users, ArrowLeft, Trophy, Search, Activity, Target } from 'lucide-react';

export default function BatchStudents() {
    const { branch, year } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        batchService.getBatchStudents(branch, year).then(res => {
            setData(res);
            setLoading(false);
        }).catch(err => {
            console.error(err);
            setLoading(false);
        });
    }, [branch, year]);

    const filteredStudents = data?.students?.filter(s =>
        s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.email.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

    if (loading) return <Layout><div className="flex items-center justify-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div></Layout>;

    return (
        <Layout>
            <div className="space-y-6">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/batches')}
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-slate-600" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900">{branch} Batch of {year}</h2>
                        <p className="text-slate-500 mt-1">Viewing all {data?.count || 0} students enrolled in this batch.</p>
                    </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-lg font-semibold text-slate-800">Student List</h3>
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search students..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-64"
                            />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                                <tr>
                                    <th className="px-6 py-4">Student</th>
                                    <th className="px-6 py-4 text-center">Activity</th>
                                    <th className="px-6 py-4 text-center">Consistency</th>
                                    <th className="px-6 py-4 text-center">LC Solved</th>
                                    <th className="px-6 py-4 text-center">CF Rating</th>
                                    <th className="px-6 py-4 text-right pr-10">Profile</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200">
                                {filteredStudents.map((student) => {
                                    const initials = student.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

                                    return (
                                        <tr key={student._id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs shrink-0">
                                                        {initials}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-slate-900">{student.name}</div>
                                                        <div className="text-slate-500 text-xs">{student.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-50 text-emerald-700 font-medium">
                                                    <Activity className="w-3.5 h-3.5" />
                                                    {student.activityScore || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 font-medium">
                                                    <Target className="w-3.5 h-3.5" />
                                                    {student.consistencyScore || 0}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center font-mono text-slate-700">
                                                {student.platforms?.leetcode?.totalSolved || 0}
                                            </td>
                                            <td className="px-6 py-4 text-center font-mono text-slate-700">
                                                {student.platforms?.codeforces?.rating || 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-right pr-6">
                                                <button
                                                    onClick={() => navigate(`/student/profile/${student._id}`)}
                                                    className="text-indigo-600 hover:text-indigo-700 font-semibold"
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredStudents.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-slate-500 italic">
                                            No students found in this batch.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
