import React, { useEffect, useState, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { db } from './lib/db';
import { Layout } from './components/Layout';
import { EntryForm } from './components/EntryForm';
import { StatsCard } from './components/StatsCard';
import { RecordList } from './components/RecordList';
import { DataTransfer } from './components/DataTransfer';
import { Dashboard } from './components/Dashboard';
import { Database } from 'lucide-react';

function HomeView({ records, fetchRecords, stats, filteredRecords, searchQuery, setSearchQuery, showDataTransfer, setShowDataTransfer }) {
    return (
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
                        searchQuery={searchQuery}
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
    );
}

function App() {
    const [records, setRecords] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [showDataTransfer, setShowDataTransfer] = useState(false);

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
        const lowerQuery = searchQuery.toLowerCase().trim();
        if (!lowerQuery) return records;
        return records.filter(item =>
            (item.species || '').toLowerCase().includes(lowerQuery) ||
            (item.strain || '').toLowerCase().includes(lowerQuery) ||
            (item.project || '').toLowerCase().includes(lowerQuery) ||
            (item.reason || '').toLowerCase().includes(lowerQuery) ||
            (item.transferInstitution || '').toLowerCase().includes(lowerQuery)
        );
    }, [records, searchQuery]);

    // Stats calculations
    const stats = useMemo(() => {
        if (!records) return { total: 0, month: 0, project: 0 };

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const isCurrentYearMonth = (dateStr) => {
            if (!dateStr) return false;
            const match = String(dateStr).match(/^(\d{4})-(\d{2})/);
            if (match) {
                return Number(match[1]) === currentYear && Number(match[2]) === currentMonth;
            }
            const parsed = new Date(dateStr);
            return (
                !Number.isNaN(parsed.getTime()) &&
                parsed.getFullYear() === currentYear &&
                parsed.getMonth() + 1 === currentMonth
            );
        };

        return {
            total: records.reduce((sum, item) => sum + (Number(item.count) || 0), 0),
            month: records
                .filter(item => isCurrentYearMonth(item.removalDate))
                .reduce((sum, item) => sum + (Number(item.count) || 0), 0),
            project: records
                .filter(item => ['EXP-01', 'EXP-02', 'EXP-03', 'EXP-04', 'MORT-02', 'ADM-02'].includes(item.reason))
                .reduce((sum, item) => sum + (Number(item.count) || 0), 0)
        };
    }, [records]);

    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={
                        <HomeView
                            records={records}
                            fetchRecords={fetchRecords}
                            stats={stats}
                            filteredRecords={filteredRecords}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            showDataTransfer={showDataTransfer}
                            setShowDataTransfer={setShowDataTransfer}
                        />
                    } />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
