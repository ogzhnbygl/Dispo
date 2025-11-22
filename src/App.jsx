import React, { useEffect, useState, useMemo } from 'react';
import { db } from './lib/db';
import { Layout } from './components/Layout';
import { EntryForm } from './components/EntryForm';
import { StatsCard } from './components/StatsCard';
import { RecordList } from './components/RecordList';
import { DataTransfer } from './components/DataTransfer';
import { Dashboard } from './components/Dashboard';
import { Database } from 'lucide-react';

function App() {
    const [records, setRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [showDataTransfer, setShowDataTransfer] = useState(false);
    const [view, setView] = useState('home');

    const fetchRecords = async () => {
        try {
            const data = await db.animals.toArray();
            setRecords(data);
        } catch (error) {
            console.error('Error fetching records:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, []);

    // Filter records locally
    const filteredRecords = useMemo(() => {
        if (!searchQuery) return records;
        const lowerQuery = searchQuery.toLowerCase();
        return records.filter(item =>
            item.species.toLowerCase().includes(lowerQuery) ||
            item.strain.toLowerCase().includes(lowerQuery) ||
            item.project.toLowerCase().includes(lowerQuery) ||
            item.reason.toLowerCase().includes(lowerQuery)
        );
    }, [records, searchQuery]);

    // Stats calculations
    const stats = useMemo(() => {
        if (!records) return { total: 0, month: 0, project: 0 };

        const currentMonth = new Date().getMonth();
        return {
            total: records.reduce((sum, item) => sum + item.count, 0),
            month: records
                .filter(item => new Date(item.removalDate).getMonth() === currentMonth)
                .reduce((sum, item) => sum + item.count, 0),
            project: records
                .filter(item => ['EXP-01', 'EXP-02', 'EXP-03', 'EXP-04', 'MORT-02', 'ADM-02'].includes(item.reason))
                .reduce((sum, item) => sum + item.count, 0)
        };
    }, [records]);

    return (
        <Layout currentView={view} onViewChange={setView}>
            {view === 'dashboard' ? (
                <Dashboard />
            ) : (
                <>
                    <div className="flex justify-end mb-4">
                        <button
                            onClick={() => setShowDataTransfer(true)}
                            className="text-sm text-slate-500 hover:text-indigo-600 flex items-center gap-1 transition-colors"
                        >
                            <Database size={16} /> Veri İçe/Dışa Aktar
                        </button>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Left Column: Entry Form */}
                        <div className="lg:col-span-4 space-y-6">
                            <EntryForm onRecordAdded={fetchRecords} />
                        </div>

                        {/* Right Column: Dashboard & List */}
                        <div className="lg:col-span-8 space-y-6">
                            {/* Stats Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <StatsCard title="Toplam Çıkarılan" value={stats.total} colorClass="text-slate-800" />
                                <StatsCard title="Bu Ay" value={stats.month} colorClass="text-indigo-600" />
                                <StatsCard title="Proje Kullanımı" value={stats.project} colorClass="text-emerald-600" />
                            </div>

                            {/* Records List */}
                            <RecordList
                                records={filteredRecords}
                                onSearch={setSearchQuery}
                                onDelete={fetchRecords}
                            />
                        </div>
                    </div>

                    {showDataTransfer && (
                        <DataTransfer
                            records={records}
                            onClose={() => setShowDataTransfer(false)}
                            onImportComplete={() => {
                                fetchRecords();
                            }}
                        />
                    )}
                </>
            )}
        </Layout>
    );
}

export default App;
