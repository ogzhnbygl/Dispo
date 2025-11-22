import React, { useState } from 'react';
import { PlusCircle, Save } from 'lucide-react';
import { db } from '../lib/db';
import { STRAINS, REMOVAL_REASONS } from '../lib/constants';

export function EntryForm({ onRecordAdded }) {
    const [selectedSpecies, setSelectedSpecies] = useState('Fare');
    const [showProject, setShowProject] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const record = {
            species: formData.get('species'),
            strain: formData.get('strain'),
            sex: formData.get('sex'),
            count: parseInt(formData.get('count')),
            dob: formData.get('dob'),
            removalDate: formData.get('removalDate'),
            reason: formData.get('reason'), // Store the code (e.g., "EXP-01")
            project: formData.get('project') || '-'
        };

        await db.animals.add(record);
        e.target.reset();

        // Reset defaults
        const today = new Date().toISOString().split('T')[0];
        document.querySelector('input[name="removalDate"]').value = today;
        setShowProject(false);
        setSelectedSpecies('Fare');
        setSelectedReason('');

        if (onRecordAdded) onRecordAdded();
    };

    const handleReasonChange = (e) => {
        const code = e.target.value;
        setSelectedReason(code);

        // Find the selected option to check if it requires a project
        let requiresProject = false;
        for (const category of REMOVAL_REASONS) {
            const option = category.options.find(opt => opt.code === code);
            if (option && option.requiresProject) {
                requiresProject = true;
                break;
            }
        }
        setShowProject(requiresProject);
    };

    // Helper to get description for selected reason
    const getSelectedReasonDescription = () => {
        if (!selectedReason) return null;
        for (const category of REMOVAL_REASONS) {
            const option = category.options.find(opt => opt.code === selectedReason);
            if (option) return option.description;
        }
        return null;
    };

    return (
        <div className="bg-white/95 backdrop-blur-sm border border-slate-200/50 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <PlusCircle className="text-indigo-600" size={20} /> Kayıt Ekle
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tür</label>
                        <select
                            name="species"
                            required
                            className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                            onChange={(e) => setSelectedSpecies(e.target.value)}
                            value={selectedSpecies}
                        >
                            <option value="Fare">Fare</option>
                            <option value="Sıçan">Sıçan</option>
                            <option value="Tavşan">Tavşan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Irk (Strain)</label>
                        <select
                            name="strain"
                            required
                            className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        >
                            {STRAINS[selectedSpecies]?.map(strain => (
                                <option key={strain} value={strain}>{strain}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Cinsiyet</label>
                        <select name="sex" required className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all">
                            <option value="Erkek">Erkek</option>
                            <option value="Dişi">Dişi</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Sayı</label>
                        <input type="number" name="count" min="1" defaultValue="1" required className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Doğum Tarihi</label>
                        <input type="date" name="dob" required className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Çıkış Tarihi</label>
                        <input type="date" name="removalDate" defaultValue={new Date().toISOString().split('T')[0]} required className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Çıkarılma Nedeni</label>
                    <select
                        name="reason"
                        onChange={handleReasonChange}
                        required
                        className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                        value={selectedReason}
                    >
                        <option value="">Seçiniz...</option>
                        {REMOVAL_REASONS.map(category => (
                            <optgroup key={category.id} label={category.label}>
                                {category.options.map(option => (
                                    <option key={option.code} value={option.code}>
                                        {option.label}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                    {selectedReason && (
                        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-600 italic">
                            {getSelectedReasonDescription()}
                        </div>
                    )}
                </div>

                {showProject && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Proje Adı / No</label>
                        <input type="text" name="project" placeholder="Örn: Proje XX" required className="w-full rounded-lg border-slate-300 border px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                )}

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                    <Save size={20} /> Kaydet
                </button>
            </form>
        </div>
    );
}
