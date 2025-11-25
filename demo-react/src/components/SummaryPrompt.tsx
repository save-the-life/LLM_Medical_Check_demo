import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { samplePatients, sampleTestResults, masterPrompt, sampleComprehensiveSummary } from '../data/dummyData';
import { PromptGenerator } from '../utils/PromptGenerator';
import Modal from '../shared/ui/Modal';
import ReportContent from './ReportContent';

function SummaryPrompt() {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    });
    const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);
    const [prompt, setPrompt] = useState(masterPrompt);
    const [isGenerating, setIsGenerating] = useState(false);
    const [summaryResult, setSummaryResult] = useState('');
    const [showFullPrompt, setShowFullPrompt] = useState(false);
    const [showReportModal, setShowReportModal] = useState(false);
    const [filteredPatients, setFilteredPatients] = useState<typeof samplePatients>([]);
    const [savedPrompts, setSavedPrompts] = useState<{ name: string; content: string; timestamp: number }[]>([]);

    // Load saved prompts from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('saved_summary_prompts');
        if (saved) {
            try {
                setSavedPrompts(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse saved prompts', e);
            }
        }
    }, []);

    const handleSavePrompt = () => {
        const name = window.prompt('프롬프트 저장 이름을 입력하세요:');
        if (!name) return;

        const newPrompt = {
            name,
            content: prompt,
            timestamp: Date.now()
        };

        const updatedPrompts = [...savedPrompts, newPrompt];
        setSavedPrompts(updatedPrompts);
        localStorage.setItem('saved_summary_prompts', JSON.stringify(updatedPrompts));
        alert('프롬프트가 저장되었습니다.');
    };

    const handleLoadPrompt = (name: string) => {
        const found = savedPrompts.find(p => p.name === name);
        if (found) {
            if (window.confirm(`'${name}' 프롬프트를 불러오시겠습니까? 현재 작성 중인 내용은 사라집니다.`)) {
                setPrompt(found.content);
            }
        }
    };

    // Filter patients by date and existence of results
    const handleSearch = () => {
        const filtered = samplePatients.filter(p => {
            // Check date match
            if (p.date !== selectedDate) return false;

            // Check if patient has any results
            const results = sampleTestResults[p.id];
            return results && Object.keys(results).length > 0;
        });
        setFilteredPatients(filtered);
        setSelectedPatientId(null);
    };

    const selectedPatient = samplePatients.find(p => p.id === selectedPatientId);

    useEffect(() => {
        if (selectedPatient) {
            // Generate comprehensive prompt dynamically
            // In a real app, we would fetch actual category summaries.
            // Here we simulate them based on available test results.
            const patientResults = sampleTestResults[selectedPatient.id] || {};
            const mockCategorySummaries = Object.entries(patientResults).map(([category, results]) => {
                let summaryText = '';
                if (typeof results === 'string') {
                    summaryText = results;
                } else {
                    if (Array.isArray(results)) {
                        const abnormalItems = results.filter(r => r.status !== 'normal');
                        if (abnormalItems.length > 0) {
                            summaryText = `${category} 검사 결과: ${results.length}개 항목 중 ${abnormalItems.length}개 비정상.\n`;
                            summaryText += abnormalItems.map(item => `- ${item.name}: ${item.value} ${item.unit} (${item.status})`).join('\n');
                        } else {
                            summaryText = `${category} 검사 결과: ${results.length}개 항목 측정됨. 특이 소견 없음.`;
                        }
                    } else {
                        summaryText = results;
                    }
                }
                return {
                    category: category,
                    summary: summaryText
                };
            });

            const generatedPrompt = PromptGenerator.generateComprehensiveSummaryPrompt(
                selectedPatient,
                mockCategorySummaries
            );
            setPrompt(generatedPrompt);
        }
    }, [selectedPatientId]);

    const handleGenerate = () => {
        if (!selectedPatient) {
            alert('검진 대상자를 선택해주세요.');
            return;
        }

        setIsGenerating(true);
        setSummaryResult('');

        // Simulate AI Generation
        setTimeout(() => {
            setIsGenerating(false);
            // Use the sample comprehensive summary from dummyData if available, otherwise a default template
            const summary = sampleComprehensiveSummary[selectedPatientId!] || `검진자분 건강검진 결과 요약

**I. 가장 시급하게 전문의 진료 및 관리 필요한 항목 (빨간불!)**
• **(예시) 뇌 MRI (뇌 백질 변화)** — 뇌 MRI 검사에서 경미한 변화가 관찰됩니다.
  <권고> 신경과 전문의 진료 필요

**II. 추가 진료 및 확인이 필요한 항목**
• **(예시) 혈액검사 (콜레스테롤)** — 총콜레스테롤 수치가 다소 높습니다.
  <권고> 식습관 개선 및 6개월 후 재검사

**III. 검진자분께 드리는 조언**
전반적인 건강 상태는 양호합니다. 규칙적인 운동과 식습관 관리를 권장합니다.`;

            // Update global dummy data so Result page can see it
            if (selectedPatientId) {
                sampleComprehensiveSummary[selectedPatientId] = summary;
            }

            // Convert Markdown to HTML for preview (Simple conversion)
            const htmlContent = summary.split('\n').map((line: string) => {
                let styledLine = line;

                // Bold
                styledLine = styledLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

                // Headers
                if (line.includes('I. 가장 시급하게')) {
                    return `<h4 class="text-lg font-bold text-red-600 mt-4 mb-2 border-b border-red-200 pb-1">${styledLine}</h4>`;
                }
                if (line.includes('II. 추가 진료')) {
                    return `<h4 class="text-lg font-bold text-orange-600 mt-4 mb-2 border-b border-orange-200 pb-1">${styledLine}</h4>`;
                }
                if (line.includes('III. 검진자분께')) {
                    return `<h4 class="text-lg font-bold text-green-600 mt-4 mb-2 border-b border-green-200 pb-1">${styledLine}</h4>`;
                }

                // Recommendation
                if (line.trim().startsWith('<권고>')) {
                    return `<div class="bg-gray-50 p-2 rounded ml-4 mb-2 text-sm text-gray-700 border-l-2 border-gray-400"><span class="font-bold mr-1">💡 권고:</span>${styledLine.replace('<권고>', '')}</div>`;
                }

                // Bullet points
                if (line.trim().startsWith('•')) {
                    return `<div class="pl-4 -indent-4 mb-1">${styledLine}</div>`;
                }

                if (line.trim() === '') return '<br>';

                return `<p class="mb-1">${styledLine}</p>`;
            }).join('');

            setSummaryResult(`<div class="space-y-2 text-gray-800 leading-relaxed font-sans">${htmlContent}</div>`);
        }, 3000);
    };

    const renderAllTestResults = () => {
        if (!selectedPatientId) {
            return <p className="text-sm text-gray-400 text-center py-8">검진 대상자를 선택하세요</p>;
        }

        const results = sampleTestResults[selectedPatientId];
        if (!results) {
            return <p className="text-sm text-gray-400 text-center py-8">검사 결과가 없습니다.</p>;
        }

        return (
            <div className="space-y-6">
                {Object.entries(results).map(([category, categoryResults]) => (
                    <div key={category} className="border-b border-gray-100 pb-4 last:border-0">
                        <h4 className="font-bold text-gray-700 mb-2 capitalize flex items-center">
                            <i className="fas fa-vial mr-2 text-purple-500 text-xs"></i>
                            {category}
                        </h4>
                        {typeof categoryResults === 'string' ? (
                            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{categoryResults}</p>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-xs">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-500">
                                            <th className="px-2 py-1 text-left">항목</th>
                                            <th className="px-2 py-1 text-right">결과</th>
                                            <th className="px-2 py-1 text-right">참고치</th>
                                            <th className="px-2 py-1 text-center">판정</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categoryResults.map((item, idx) => (
                                            <tr key={idx} className="border-b border-gray-50 last:border-0 hover:bg-gray-50">
                                                <td className="px-2 py-1 font-medium">{item.name}</td>
                                                <td className={`px-2 py-1 text-right ${item.status !== 'normal' ? 'font-bold' : ''}`}>
                                                    {item.value} <span className="text-gray-400 text-[10px]">{item.unit}</span>
                                                </td>
                                                <td className="px-2 py-1 text-right text-gray-400">{item.reference}</td>
                                                <td className="px-2 py-1 text-center">
                                                    {item.status !== 'normal' && (
                                                        <span className={`inline-block w-2 h-2 rounded-full ${item.status === 'high' ? 'bg-red-500' :
                                                            item.status === 'low' ? 'bg-blue-500' : 'bg-yellow-500'
                                                            }`}></span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-220px)]">
            {/* Left Panel: Prompt Editor */}
            <div className="flex flex-col h-full">
                <div className="bg-white rounded-xl p-6 shadow-sm h-full flex flex-col overflow-hidden border border-gray-100">
                    <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                        <i className="fas fa-file-alt mr-2 text-purple-600"></i>종합소견 생성 프롬프트
                    </h2>
                    <p className="text-sm text-gray-600 mb-3">사용자가 입력 가능한 프롬프트 영역</p>
                    <textarea
                        id="summaryPromptEditor"
                        className="flex-1 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm resize-none bg-gray-50"
                        placeholder="종합소견 생성을 위한 마스터 프롬프트를 입력하세요..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between items-center mt-3">
                        <div className="flex-1 mr-2">
                            <select
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500"
                                onChange={(e) => {
                                    if (e.target.value) {
                                        handleLoadPrompt(e.target.value);
                                        e.target.value = ''; // Reset selection
                                    }
                                }}
                                defaultValue=""
                            >
                                <option value="" disabled>💾 저장된 프롬프트 불러오기</option>
                                {savedPrompts.map((p, idx) => (
                                    <option key={idx} value={p.name}>
                                        {p.name} ({new Date(p.timestamp).toLocaleDateString()})
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <button
                                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold transition text-sm"
                                onClick={() => setPrompt(masterPrompt)}
                            >
                                <i className="fas fa-undo mr-1"></i>초기화
                            </button>
                            <button
                                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
                                onClick={handleSavePrompt}
                            >
                                <i className="fas fa-save mr-1"></i>저장
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Middle Panel: Patient Selection & Test Results */}
            <div className="flex flex-col h-full gap-4">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100" style={{ flex: '0 0 auto' }}>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">검진일 조회</h3>
                    <div className="flex gap-2">
                        <input
                            type="date"
                            id="summaryDate"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition"
                        >
                            <i className="fas fa-search mr-2"></i>조회
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 overflow-hidden" style={{ flex: '1 1 0', minHeight: 0 }}>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">검진 대상자 조회 결과</h3>
                    <p className="text-xs text-gray-600 mb-2">조회된 검진 대상자 목록</p>
                    <div className="border border-gray-200 rounded-lg p-3 overflow-y-auto h-[calc(100%-60px)]">
                        <div className="space-y-2" id="summaryPatientList">
                            {filteredPatients.length === 0 ? (
                                <p className="text-sm text-gray-400 text-center py-4">해당 날짜의 검진 대상자가 없습니다.</p>
                            ) : (
                                filteredPatients.map(patient => (
                                    <div
                                        key={patient.id}
                                        onClick={() => setSelectedPatientId(patient.id)}
                                        className={`p-3 rounded-lg border cursor-pointer transition-all ${selectedPatientId === patient.id
                                            ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500'
                                            : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-gray-800">{patient.name}</span>
                                            <span className={`text-xs px-2 py-0.5 rounded-full ${patient.status === 'completed' ? 'bg-green-100 text-green-700' :
                                                patient.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-yellow-100 text-yellow-700'
                                                }`}>
                                                {patient.status === 'completed' ? '완료' :
                                                    patient.status === 'processing' ? '대기' : '예정'}
                                            </span>
                                        </div>
                                        <div className="text-xs text-gray-500 flex justify-between">
                                            <span>{patient.gender}/{patient.age}세</span>
                                            <span>{patient.id}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* All Test Results for Selected Patient */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 overflow-hidden" style={{ flex: '1 1 0', minHeight: 0 }}>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">검진 대상자 검사 결과</h3>
                    <p className="text-xs text-gray-600 mb-2">선택된 검진 대상자의 모든 검사결과 표시</p>
                    <div className="border border-gray-200 rounded-lg p-3 overflow-y-auto h-[calc(100%-60px)]">
                        <div id="allTestResultsView">
                            {renderAllTestResults()}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel: AI Generation & Preview */}
            <div className="flex flex-col h-full">
                <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                    <button
                        onClick={handleGenerate}
                        disabled={isGenerating || !selectedPatientId}
                        className={`w-full px-6 py-3 rounded-lg font-semibold text-lg text-white transition flex justify-center items-center ${isGenerating || !selectedPatientId
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg transform hover:-translate-y-0.5'
                            }`}
                    >
                        {isGenerating ? (
                            <>
                                <i className="fas fa-spinner fa-spin mr-2"></i>분석 중...
                            </>
                        ) : (
                            <>
                                <i className="fas fa-robot mr-2"></i>AI 분석
                            </>
                        )}
                    </button>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex-1 flex flex-col overflow-hidden">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800 flex items-center">
                            <i className="fas fa-eye mr-2 text-purple-600"></i>검사 결과 AI 분석
                        </h3>
                        {summaryResult && (
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setShowReportModal(true)}
                                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition flex items-center"
                                >
                                    <i className="fas fa-window-maximize mr-2"></i>상세보기 (모달)
                                </button>
                                <button
                                    onClick={() => navigate(`/result/${selectedPatientId}`)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-semibold transition flex items-center"
                                >
                                    <i className="fas fa-external-link-alt mr-2"></i>상세보기 (페이지)
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 flex-1 overflow-y-auto" id="summaryPreview">
                        {summaryResult ? (
                            <div dangerouslySetInnerHTML={{ __html: summaryResult }} />
                        ) : (
                            <p className="text-gray-500 text-center py-8 flex flex-col items-center">
                                <i className="fas fa-clipboard-list text-4xl mb-3 opacity-20"></i>
                                <span>종합소견 생성 결과가 여기에 표시됩니다</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <Modal isOpen={showFullPrompt} onClose={() => setShowFullPrompt(false)} title="전체 마스터 프롬프트">
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

            {/* Report Modal */}
            {showReportModal && selectedPatientId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 print:p-0">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col print:h-auto print:w-full print:max-w-none print:rounded-none print:shadow-none">
                        <div className="flex justify-between items-center p-4 border-b print:hidden">
                            <h3 className="text-xl font-bold text-gray-800">종합건강검진 결과 리포트</h3>
                            <button
                                onClick={() => setShowReportModal(false)}
                                className="text-gray-500 hover:text-gray-700 transition"
                            >
                                <i className="fas fa-times text-2xl"></i>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto bg-gray-100 p-4 print:p-0 print:overflow-visible">
                            <ReportContent
                                patientId={selectedPatientId}
                                isModal={true}
                                onClose={() => setShowReportModal(false)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SummaryPrompt;
