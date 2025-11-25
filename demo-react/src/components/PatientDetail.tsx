import { useState } from 'react';
import { sampleTestResults } from '../data/dummyData';
import type { Patient, TestResultItem } from '../data/dummyData';

interface PatientDetailProps {
    patient: Patient;
    onClose: () => void;
}

const PatientDetail = ({ patient, onClose }: PatientDetailProps) => {
    const [activeTab, setActiveTab] = useState('blood');
    const testResults = sampleTestResults[patient.id];

    const tabs = [
        { id: 'blood', label: '혈액검사' },
        { id: 'lipid', label: '고지혈검사' },
        { id: 'liver', label: '간기능검사' },
        { id: 'kidney', label: '신장기능검사' },
        { id: 'glucose', label: '당뇨검사' },
        { id: 'thyroid', label: '갑상선검사' },
        { id: 'urine', label: '소변검사' },
        { id: 'tumor', label: '종양표지자' },
        { id: 'xray', label: '흉부촬영' },
        { id: 'ultrasound', label: '초음파검사' },
        { id: 'ecg', label: '심전도' },
        { id: 'eye', label: '안과검사' },
        { id: 'hearing', label: '청력검사' },
        { id: 'endoscopy', label: '내시경검사' },
        { id: 'ct', label: 'CT검사' }
    ];

    const renderContent = () => {
        if (!testResults) {
            return <div className="p-8 text-center text-gray-500">검사 결과가 없습니다.</div>;
        }

        const data = testResults[activeTab];

        if (!data) {
            return <div className="p-8 text-center text-gray-500">해당 검사 결과가 없습니다.</div>;
        }

        if (typeof data === 'string') {
            return (
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                    <pre className="text-gray-800 whitespace-pre-wrap text-sm font-sans">{data}</pre>
                </div>
            );
        }

        return (
            <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-3 py-2 text-left">검사항목</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">참고치</th>
                            <th className="border border-gray-300 px-3 py-2 text-left">결과</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(data as TestResultItem[]).map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-3 py-2">{item.name} {item.unit && `(${item.unit})`}</td>
                                <td className="border border-gray-300 px-3 py-2">{item.reference}</td>
                                <td className={`border border-gray-300 px-3 py-2 ${item.status !== 'normal' ? 'text-red-600 font-bold' : ''}`}>
                                    {item.value}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gray-50">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                            <i className="fas fa-user-circle mr-3 text-purple-600"></i>
                            {patient.name} 님의 검진 결과
                        </h2>
                        <p className="text-sm text-gray-600 mt-1 ml-9">
                            {patient.id} | {patient.gender}/{patient.age}세 | 검진일: {patient.date}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-200"
                    >
                        <i className="fas fa-times text-2xl"></i>
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 overflow-x-auto bg-white px-6 pt-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-3 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id
                                    ? 'border-purple-600 text-purple-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto bg-white flex-1">
                    {renderContent()}
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                        닫기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PatientDetail;
