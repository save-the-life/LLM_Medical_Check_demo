import React from 'react';

interface ComprehensiveSummaryReportProps {
    summary: string;
}

const ComprehensiveSummaryReport: React.FC<ComprehensiveSummaryReportProps> = ({ summary }) => {
    if (!summary) return null;

    return (
        <div className="bg-[#F0F4FF] border-l-4 border-[#667eea] p-6 rounded-r-lg shadow-sm">
            <h3 className="text-2xl font-bold mb-6 flex items-center text-gray-800">
                <i className="fas fa-clipboard-check mr-3 text-purple-600"></i>종 합 소 견
            </h3>

            <div className="space-y-6 text-gray-800 leading-relaxed whitespace-pre-wrap font-sans">
                {summary.split('\n').map((line, index) => {
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
                })}
            </div>

            <div className="border-t-2 border-gray-300 pt-6 mt-8">
                <div className="flex justify-between items-center">
                    <p className="font-semibold text-lg text-gray-700">판정의: ________________ (인)</p>
                </div>
            </div>
        </div>
    );
};

export default ComprehensiveSummaryReport;
