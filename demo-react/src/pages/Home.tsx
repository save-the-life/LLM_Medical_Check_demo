import { useState } from 'react';
import Header from '../components/Header';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';
import PatientDetail from '../components/PatientDetail';
import TestPrompts from '../components/TestPrompts';
import SummaryPrompt from '../components/SummaryPrompt';
import type { Patient } from '../data/dummyData';

function Home() {
    const [activeTab, setActiveTab] = useState('generation');
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const renderContent = () => {
        switch (activeTab) {
            case 'generation':
                return (
                    <>
                        <Dashboard onSelectPatient={setSelectedPatient} />
                        {selectedPatient && (
                            <div id="patientDetailView">
                                <PatientDetail
                                    patient={selectedPatient}
                                    onClose={() => setSelectedPatient(null)}
                                />
                            </div>
                        )}
                    </>
                );
            case 'test-prompts':
                return <TestPrompts />;
            case 'summary-prompt':
                return <SummaryPrompt />;
            default:
                return <Dashboard onSelectPatient={setSelectedPatient} />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Navigation activeTab={activeTab} onTabChange={(tab) => { setActiveTab(tab); setSelectedPatient(null); }} />
            <main className="container mx-auto px-6 py-8">
                {renderContent()}
            </main>
        </div>
    );
}

export default Home;
