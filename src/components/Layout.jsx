import React from 'react';
import { PawPrint } from 'lucide-react';

export function Layout({ children, currentView, onViewChange }) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            {/* Header */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="bg-indigo-600 p-2 rounded-lg text-white">
                            <PawPrint size={24} />
                        </div>
                        <h1 className="text-xl font-bold text-slate-800">Dispo Raporlama</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex gap-1 bg-slate-100/50 p-1 rounded-lg">
                        <button
                            onClick={() => onViewChange('home')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${currentView === 'home'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Ana Sayfa
                        </button>
                        <button
                            onClick={() => onViewChange('dashboard')}
                            className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${currentView === 'dashboard'
                                ? 'bg-white text-indigo-600 shadow-sm'
                                : 'text-slate-500 hover:text-slate-700'
                                }`}
                        >
                            Dashboard
                        </button>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                {children}
            </main>
        </div>
    );
}
