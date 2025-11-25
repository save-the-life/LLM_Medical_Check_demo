import { useParams, useNavigate } from 'react-router-dom';
import { samplePatients, sampleTestResults, sampleAiSummaries, sampleComprehensiveSummary } from '../data/dummyData';
import type { TestResultItem } from '../data/dummyData';

function Result() {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const patient = samplePatients.find(p => p.id === patientId);
    const testResults = patientId ? sampleTestResults[patientId] : null;
    const aiSummaries = patientId ? sampleAiSummaries[patientId] : null;
    const comprehensiveSummary = patientId ? sampleComprehensiveSummary[patientId] : null;

    if (!patient) {
        return <div className="p-8 text-center">환자 정보를 찾을 수 없습니다.</div>;
    }

    // Helper to render patient info bar
    const renderPatientInfoBar = () => (
        <div className="mb-6 border-b pb-4">
            <div className="flex justify-between items-center text-sm md:text-base">
                <div>
                    <span className="mr-4"><span className="font-semibold">등록번호:</span> {patient.id}</span>
                    <span><span className="font-semibold">성명:</span> {patient.name} ({patient.gender}/{patient.age})</span>
                </div>
                <div className="text-right">
                    <span><span className="font-semibold">건진일자:</span> {patient.date}</span>
                </div>
            </div>
        </div>
    );

    // Helper to render header
    const renderHeader = () => (
        <div className="flex items-center mb-6">
            <i className="fas fa-hospital text-3xl text-purple-600 mr-3"></i>
            <h2 className="text-2xl font-bold">한국대학병원</h2>
        </div>
    );

    const renderTestTable = (title: string, categoryKey: string, data: TestResultItem[] | undefined) => {
        if (!data || data.length === 0) return null;

        const aiSummary = aiSummaries ? aiSummaries[categoryKey] : null;

        return (
            <div className="mb-8 break-inside-avoid">
                <h3 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded">{title}</h3>
                <table className="w-full border-collapse mb-4 text-sm">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 w-1/4">검사 항목</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 w-1/4">기준</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 w-1/4">결과</th>
                            <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 w-1/4">관련질환 및 참고사항</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="border border-gray-300 px-3 py-2">{item.name} {item.unit && `(${item.unit})`}</td>
                                <td className="border border-gray-300 px-3 py-2">{item.reference}</td>
                                <td className={`border border-gray-300 px-3 py-2 ${item.status !== 'normal' ? 'text-red-600 font-bold' : ''}`}>
                                    {item.value}
                                </td>
                                <td className="border border-gray-300 px-3 py-2 text-gray-600 text-xs">{item.note || ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {aiSummary && (
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 mt-2">
                        <h4 className="font-bold mb-2 flex items-center text-blue-800">
                            <i className="fas fa-robot mr-2"></i>AI 분석 소견
                        </h4>
                        <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
                            {aiSummary}
                        </p>
                    </div>
                )}
            </div>
        );
    };

    const renderTextReport = (title: string, categoryKey: string, data: string | undefined) => {
        if (!data) return null;

        const aiSummary = aiSummaries ? aiSummaries[categoryKey] : null;

        return (
            <div className="border border-gray-300 rounded-lg p-6 mb-6 break-inside-avoid">
                <h4 className="font-bold text-lg mb-3">{title} ({patient.date})</h4>

                {/* Disclaimer for Ultrasound/Imaging if needed, hardcoded for demo matching reference */}
                {(categoryKey === 'ultrasound' || categoryKey === 'xray') && (
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
                        <p className="text-sm text-gray-700">
                            * 검사의 제한점이 존재할 수 있으며, 증상이 있을 시 추가적인 평가나 전문의 진료를 권장합니다.
                        </p>
                    </div>
                )}

                <div className="bg-white p-4 rounded-lg mb-4 border border-gray-100">
                    <pre className="text-gray-800 whitespace-pre-wrap text-sm font-sans leading-relaxed">{data}</pre>
                </div>

                {aiSummary && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <h5 className="font-bold mb-2 flex items-center text-blue-800">
                            <i className="fas fa-robot mr-2"></i>AI 분석 소견
                        </h5>
                        <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
                            {aiSummary}
                        </p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-gray-100 p-8 min-h-screen print:bg-white print:p-0">
            {/* Print Controls */}
            <div className="no-print mb-6 flex justify-between items-center max-w-5xl mx-auto">
                <button onClick={() => navigate('/')} className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center">
                    <i className="fas fa-arrow-left mr-2"></i>목록으로
                </button>
                <div className="flex gap-3">
                    <button onClick={() => alert('PDF 다운로드 기능이 실행됩니다.')} className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center">
                        <i className="fas fa-download mr-2"></i>PDF 다운로드
                    </button>
                    <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition flex items-center">
                        <i className="fas fa-print mr-2"></i>인쇄
                    </button>
                </div>
            </div>

            {/* Medical Document */}
            <div className="medical-document max-w-5xl mx-auto mb-8 bg-white shadow-lg print:shadow-none print:w-full print:max-w-none">

                {/* Cover Page */}
                <div className="page-break print:break-after-page min-h-[1123px] relative flex flex-col">
                    <div className="result-header bg-gradient-to-br from-[#667eea] to-[#764ba2] text-white p-8 text-center print:bg-none print:text-black print:border-b-2 print:border-black">
                        <div className="flex items-center justify-center mb-4">
                            <i className="fas fa-hospital text-5xl mr-4"></i>
                            <div>
                                <h1 className="text-4xl font-bold mb-2">한국대학병원</h1>
                                <p className="text-lg">KOREA UNIVERSITY HOSPITAL</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-12 text-center flex-1 flex flex-col justify-center">
                        <h2 className="text-5xl font-bold text-gray-800 mb-12">종 합 건 강 검 진 결 과</h2>

                        <div className="patient-info-box border-2 border-gray-200 bg-gray-50 p-8 inline-block text-left mx-auto mt-10 rounded-lg shadow-sm print:shadow-none">
                            <table className="text-lg border-separate border-spacing-y-4">
                                <tbody>
                                    <tr>
                                        <td className="font-semibold pr-12 text-gray-600">등 록 번 호</td>
                                        <td className="font-bold text-xl">{patient.id}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold pr-12 text-gray-600">검 사 일</td>
                                        <td className="font-bold text-xl">{patient.date}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold pr-12 text-gray-600">성 명</td>
                                        <td className="font-bold text-xl">{patient.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="font-semibold pr-12 text-gray-600">성 별 / 나 이</td>
                                        <td className="font-bold text-xl">{patient.gender} / {patient.age}세</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="p-8 text-center text-gray-500 text-sm">
                        한국대학병원 건강증진센터
                    </div>
                </div>

                {/* Summary Page */}
                {comprehensiveSummary && (
                    <div className="page-break print:break-after-page p-12 min-h-[1123px]">
                        {renderHeader()}
                        {renderPatientInfoBar()}

                        <div className="summary-section bg-[#F0F4FF] border-l-4 border-[#667eea] p-6 mb-8 rounded-r-lg">
                            <h3 className="text-2xl font-bold mb-6 flex items-center">
                                <i className="fas fa-clipboard-check mr-3 text-purple-600"></i>종 합 소 견
                            </h3>

                            <div className="space-y-6 text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                                {typeof comprehensiveSummary === 'string' ? (
                                    comprehensiveSummary.split('\n').map((line, index) => {
                                        // Section Headers
                                        if (line.includes('I. 가장 시급하게')) {
                                            return <h4 key={index} className="text-xl font-bold text-red-600 mt-8 mb-4 border-b border-red-200 pb-2">{line}</h4>;
                                        }
                                        if (line.includes('II. 추가 진료')) {
                                            return <h4 key={index} className="text-xl font-bold text-orange-600 mt-8 mb-4 border-b border-orange-200 pb-2">{line}</h4>;
                                        }
                                        if (line.includes('III. 검진자분께')) {
                                            return <h4 key={index} className="text-xl font-bold text-green-600 mt-8 mb-4 border-b border-green-200 pb-2">{line}</h4>;
                                        }

                                        // Bold text parsing
                                        const parts = line.split(/(\*\*.*?\*\*)/g);

                                        // Recommendation lines
                                        if (line.trim().startsWith('<권고>')) {
                                            return (
                                                <div key={index} className="bg-white bg-opacity-60 p-2 rounded ml-4 mt-1 mb-3 text-sm text-gray-700 border-l-2 border-gray-400">
                                                    <span className="font-bold mr-2">💡 권고:</span>
                                                    {line.replace('<권고>', '').trim()}
                                                </div>
                                            );
                                        }

                                        // List items
                                        if (line.trim().startsWith('•')) {
                                            return (
                                                <div key={index} className="pl-4 -indent-4 mb-1">
                                                    {parts.map((part, i) =>
                                                        part.startsWith('**') && part.endsWith('**') ?
                                                            <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong> :
                                                            part
                                                    )}
                                                </div>
                                            );
                                        }

                                        // Normal lines
                                        if (line.trim() === '') return <br key={index} />;

                                        return (
                                            <p key={index} className="mb-1">
                                                {parts.map((part, i) =>
                                                    part.startsWith('**') && part.endsWith('**') ?
                                                        <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong> :
                                                        part
                                                )}
                                            </p>
                                        );
                                    })
                                ) : (
                                    // Fallback for old object format if any
                                    <p>형식이 올바르지 않습니다.</p>
                                )}
                            </div>

                            <div className="border-t-2 border-gray-300 pt-6 mt-8">
                                <div className="flex justify-between items-center">
                                    <p className="font-semibold text-lg">판정의: ________________ (인)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Detailed Results Page */}
                <div className="page-break print:break-after-page p-12 min-h-[1123px]">
                    {renderHeader()}
                    {renderPatientInfoBar()}

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-purple-600 pb-2 mb-6">
                            검사 결과 상세
                        </h3>
                    </div>

                    {testResults ? (
                        <>
                            {renderTestTable('신체계측', 'basic', testResults['basic'] as TestResultItem[])}
                            {renderTestTable('혈액검사', 'blood', testResults['blood'] as TestResultItem[])}
                            {renderTestTable('고지혈검사', 'lipid', testResults['lipid'] as TestResultItem[])}
                            {renderTestTable('간기능검사', 'liver', testResults['liver'] as TestResultItem[])}
                            {renderTestTable('신장기능검사', 'kidney', testResults['kidney'] as TestResultItem[])}
                            {renderTestTable('당뇨검사', 'glucose', testResults['glucose'] as TestResultItem[])}
                            {renderTestTable('갑상선검사', 'thyroid', testResults['thyroid'] as TestResultItem[])}
                            {renderTestTable('소변검사', 'urine', testResults['urine'] as TestResultItem[])}
                            {renderTestTable('종양표지자', 'tumor', testResults['tumor'] as TestResultItem[])}
                        </>
                    ) : (
                        <div className="text-center py-8 text-gray-500">검사 결과가 없습니다.</div>
                    )}
                </div>

                {/* Imaging Results Page */}
                <div className="page-break print:break-after-page p-12 min-h-[1123px]">
                    {renderHeader()}
                    {renderPatientInfoBar()}

                    <div className="mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-purple-600 pb-2 mb-6">
                            영상 및 기타 검사 결과
                        </h3>
                    </div>

                    {testResults ? (
                        <>
                            <h3 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded">초음파 검사</h3>
                            {renderTextReport('상복부 초음파', 'ultrasound', testResults['ultrasound'] as string)}

                            <h3 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded mt-8">흉부촬영</h3>
                            {renderTextReport('흉부촬영', 'xray', testResults['xray'] as string)}

                            {/* Other text results if available */}
                            {testResults['ecg'] && (
                                <>
                                    <h3 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded mt-8">심전도</h3>
                                    {renderTextReport('심전도', 'ecg', testResults['ecg'] as string)}
                                </>
                            )}
                            {testResults['eye'] && (
                                <>
                                    <h3 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded mt-8">안과검사</h3>
                                    {renderTextReport('안과검사', 'eye', testResults['eye'] as string)}
                                </>
                            )}
                            {testResults['hearing'] && (
                                <>
                                    <h3 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded mt-8">청력검사</h3>
                                    {renderTextReport('청력검사', 'hearing', testResults['hearing'] as string)}
                                </>
                            )}
                            {testResults['endoscopy'] && (
                                <>
                                    <h3 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded mt-8">내시경검사</h3>
                                    {renderTextReport('내시경검사', 'endoscopy', testResults['endoscopy'] as string)}
                                </>
                            )}
                            {testResults['ct'] && (
                                <>
                                    <h3 className="text-xl font-bold mb-4 bg-gray-100 p-3 rounded mt-8">CT검사</h3>
                                    {renderTextReport('CT검사', 'ct', testResults['ct'] as string)}
                                </>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-8 text-gray-500">검사 결과가 없습니다.</div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-8 bg-gray-50 text-center text-sm text-gray-600 border-t print:bg-white">
                    <p className="mb-2">본 검진 결과는 AI 분석 시스템을 통해 생성되었으며, 최종 판정은 전문의의 검토를 거쳤습니다.</p>
                    <p>문의사항이 있으시면 한국대학병원 건강증진센터로 연락 주시기 바랍니다.</p>
                    <p className="mt-4 font-semibold text-lg">한국대학병원 건강증진센터</p>
                    <p>서울시 종로구 대학로 123 | Tel: 02-1234-5678</p>
                </div>
            </div>
        </div>
    );
}

export default Result;
