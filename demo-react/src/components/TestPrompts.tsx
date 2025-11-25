import { useState, useEffect } from 'react';
import { samplePatients, sampleTestResults, testTypes } from '../data/dummyData';
import Modal from '../shared/ui/Modal';
import { PromptGenerator } from '../utils/PromptGenerator';
import { SimulationUtils } from '../utils/SimulationUtils';

function TestPrompts() {
    // State for Test Selection & Prompt
    const [selectedTestId, setSelectedTestId] = useState('');
    const [prompt, setPrompt] = useState('');
    const [showFullPrompt, setShowFullPrompt] = useState(false);

    // State for Patient Selection
    const [searchDate, setSearchDate] = useState('2025-05-02');
    const [filteredPatients, setFilteredPatients] = useState(samplePatients);
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

    // State for Analysis
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState('');

    // Derived State
    const selectedPatient = samplePatients.find(p => p.id === selectedPatientId);
    const selectedTestName = testTypes.find(t => t.id === selectedTestId)?.name || '';

    // Effect: Update prompt when test changes (load default/saved prompt)
    useEffect(() => {
        if (selectedTestId) {
            // In a real app, we would load the saved prompt for this test type
            // For now, we generate a template prompt without patient data to show the structure
            // or use the PromptGenerator with a dummy patient if needed to show the template.

            // Actually, the user wants to see the prompt that will be used. 
            // If a patient is selected, we should generate the full prompt.
            // If not, we might show a template or the last saved prompt.
            // Let's generate a prompt using the first available patient as a preview or just the template.

            // Let's use the PromptGenerator to get the template with specific hints
            // We'll pass a dummy patient to get the structure
            const dummyPatient = samplePatients[0];
            const generatedPrompt = PromptGenerator.generatePrompt(
                selectedTestName,
                dummyPatient,
                [], // No results yet
                undefined // Use default hints (which includes blood hints if applicable)
            );
            setPrompt(generatedPrompt);
        } else {
            setPrompt('');
        }
    }, [selectedTestId, selectedTestName]);

    // Effect: Update prompt when patient changes (to inject patient data)
    useEffect(() => {
        if (selectedPatientId && selectedTestId && selectedPatient) {
            const results = sampleTestResults[selectedPatientId]?.[selectedTestId];
            const generatedPrompt = PromptGenerator.generatePrompt(
                selectedTestName,
                selectedPatient,
                results || [],
                // We pass the current prompt's hints if we want to preserve edits to hints, 
                // but for now let's regenerate to ensure data is correct. 
                // To preserve custom hints, we'd need to parse the existing prompt.
                // For simplicity, we regenerate.
            );
            setPrompt(generatedPrompt);
        }
    }, [selectedPatientId, selectedTestId, selectedPatient, selectedTestName]);

    const handleSearchPatients = () => {
        const filtered = samplePatients.filter(p => p.date === searchDate);
        setFilteredPatients(filtered);
        setSelectedPatientId(null); // Reset selection
    };

    const handleAnalyze = () => {
        if (!selectedPatientId || !selectedTestId) {
            alert('검사 항목과 환자를 모두 선택해주세요.');
            return;
        }

        setIsAnalyzing(true);
        setAnalysisResult('');

        // Simulate AI Analysis
        setTimeout(() => {
            setIsAnalyzing(false);
            if (selectedPatient) {
                const results = sampleTestResults[selectedPatientId]?.[selectedTestId] || [];
                const simulationResult = SimulationUtils.simulateAIAnalysis(
                    selectedTestName,
                    results
                );
                setAnalysisResult(simulationResult);
            }
        }, 1500);
    };

    const renderTestResults = () => {
        if (!selectedPatientId) {
            return <p className="text-sm text-gray-400 text-center py-8">검진 대상자를 선택하세요</p>;
        }

        if (!selectedTestId) {
            return <p className="text-sm text-gray-400 text-center py-8">검사 항목을 선택하세요</p>;
        }

        const results = sampleTestResults[selectedPatientId]?.[selectedTestId];

        if (!results) {
            return <p className="text-sm text-gray-400 text-center py-8">해당 검사 결과가 없습니다</p>;
        }

        if (typeof results === 'string') {
            return (
                <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                    <pre className="text-gray-800 whitespace-pre-wrap text-sm font-sans">{results}</pre>
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
                        {results.map((item, index) => (
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
        <div id="page-test-prompts" className="page-content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" style={{ height: 'calc(100vh - 220px)' }}>
                {/* Left Panel: Test Selection & Prompt */}
                <div className="flex flex-col h-full">
                    <div className="bg-white rounded-xl p-6 card-shadow mb-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            <i className="fas fa-vials mr-2 text-purple-600"></i>검사 선택
                        </h2>
                        <select
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
                            value={selectedTestId}
                            onChange={(e) => setSelectedTestId(e.target.value)}
                        >
                            <option value="">검사를 선택하세요</option>
                            {testTypes.map(test => (
                                <option key={test.id} value={test.id}>{test.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-white rounded-xl p-6 card-shadow flex-1 flex flex-col overflow-hidden">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">
                                <i className="fas fa-edit mr-2 text-purple-600"></i>검사 분석 프롬프트
                            </h2>
                            <button
                                className="text-purple-600 hover:text-purple-700 font-semibold text-sm"
                                onClick={() => setShowFullPrompt(true)}
                            >
                                <i className="fas fa-expand-alt mr-1"></i>전체 보기
                            </button>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">사용자가 수정 가능한 프롬프트 영역</p>
                        <textarea
                            className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm resize-none"
                            placeholder="검사별 분석 프롬프트를 입력하세요..."
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                        ></textarea>
                        <div className="flex justify-end gap-2 mt-3">
                            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition text-sm">
                                <i className="fas fa-undo mr-1"></i>초기화
                            </button>
                            <button className="btn-primary text-white px-4 py-2 rounded-lg font-semibold text-sm">
                                <i className="fas fa-save mr-1"></i>저장
                            </button>
                        </div>
                    </div>
                </div>

                {/* Middle Panel: Patient Selection & Results */}
                <div className="flex flex-col h-full gap-4">
                    <div className="bg-white rounded-xl p-4 card-shadow" style={{ flex: '0 0 auto' }}>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">검진일 조회</h3>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                            />
                            <button
                                onClick={handleSearchPatients}
                                className="btn-primary text-white px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap"
                            >
                                <i className="fas fa-search mr-2"></i>조회
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 card-shadow overflow-hidden" style={{ flex: '1 1 0', minHeight: 0 }}>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">검진 대상자 조회 결과</h3>
                        <p className="text-xs text-gray-600 mb-2">선택된 검사가 존재하는 검진 대상자만 표시</p>
                        <div className="border border-gray-200 rounded-lg p-3 overflow-y-auto" style={{ height: 'calc(100% - 60px)' }}>
                            <div className="space-y-2">
                                {filteredPatients.length === 0 ? (
                                    <p className="text-sm text-gray-400 text-center py-4">조회된 환자가 없습니다.</p>
                                ) : (
                                    filteredPatients.map(patient => (
                                        <div
                                            key={patient.id}
                                            className={`p-3 border rounded-lg cursor-pointer transition ${selectedPatientId === patient.id ? 'bg-purple-100 border-purple-600' : 'border-gray-200 hover:bg-purple-50'}`}
                                            onClick={() => setSelectedPatientId(patient.id)}
                                        >
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    <p className="font-semibold text-sm">{patient.name}</p>
                                                    <p className="text-xs text-gray-600">{patient.id} | {patient.gender}/{patient.age}</p>
                                                </div>
                                                <i className="fas fa-chevron-right text-gray-400"></i>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 card-shadow overflow-hidden" style={{ flex: '1 1 0', minHeight: 0 }}>
                        <h3 className="text-lg font-bold text-gray-800 mb-3">검진 대상자 검사 결과</h3>
                        <div className="border border-gray-200 rounded-lg p-3 overflow-y-auto" style={{ height: 'calc(100% - 48px)' }}>
                            {renderTestResults()}
                        </div>
                    </div>
                </div>

                {/* Right Panel: AI Analysis */}
                <div className="flex flex-col h-full">
                    <div className="bg-white rounded-xl p-4 card-shadow mb-4">
                        <button
                            onClick={handleAnalyze}
                            className="btn-primary text-white px-6 py-3 rounded-lg font-semibold w-full text-lg"
                        >
                            <i className="fas fa-robot mr-2"></i>AI 분석
                        </button>
                    </div>

                    <div className="bg-white rounded-xl p-6 card-shadow flex-1 flex flex-col overflow-hidden">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">
                            <i className="fas fa-brain mr-2 text-purple-600"></i>검사 결과 AI 분석
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 flex-1 overflow-y-auto">
                            {isAnalyzing ? (
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="loading-spinner mb-4"></div>
                                    <p className="text-gray-600">AI 분석 중...</p>
                                </div>
                            ) : analysisResult ? (
                                <div dangerouslySetInnerHTML={{ __html: analysisResult }} />
                            ) : (
                                <p className="text-gray-500 text-center py-8">AI 분석 결과가 여기에 표시됩니다</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Full Prompt Modal */}
            <Modal isOpen={showFullPrompt} onClose={() => setShowFullPrompt(false)} title="전체 프롬프트 확인">
                <div className="p-4 bg-gray-100 rounded-md overflow-auto max-h-[60vh]">
                    <pre className="whitespace-pre-wrap text-sm font-mono text-gray-800">{prompt}</pre>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={() => setShowFullPrompt(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        닫기
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default TestPrompts;
