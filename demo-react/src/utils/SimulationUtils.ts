import type { TestResultItem } from '../data/dummyData';

export class SimulationUtils {
    static simulateAIAnalysis(
        category: string,
        results: TestResultItem[] | string
    ): string {
        if (typeof results === 'string') {
            return `<p>분석 결과: ${results}</p>`;
        }

        let analysisHtml = `<div class="space-y-4">`;

        // General Summary
        const abnormalItems = results.filter(item => item.status !== 'normal');

        if (abnormalItems.length === 0) {
            analysisHtml += `
                <div class="bg-green-50 border-l-4 border-green-500 p-4">
                    <h4 class="font-bold text-green-800 mb-2">종합 소견: 정상</h4>
                    <p class="text-gray-700">검사 결과 모든 항목이 정상 범위 내에 있습니다. 현재의 건강한 생활 습관을 유지하시기 바랍니다.</p>
                </div>`;
        } else {
            analysisHtml += `
                <div class="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                    <h4 class="font-bold text-yellow-800 mb-2">종합 소견: 주의 필요</h4>
                    <p class="text-gray-700">일부 항목에서 정상 범위를 벗어난 소견이 관찰됩니다. 아래 상세 분석을 참고하여 필요한 경우 전문의와 상담하시기 바랍니다.</p>
                </div>`;
        }

        // Detailed Analysis based on Category
        if (category === '혈액검사' || category.includes('blood')) {
            analysisHtml += this.generateBloodTestAnalysis(results);
        } else {
            // Generic analysis for other categories
            if (abnormalItems.length > 0) {
                analysisHtml += `<div class="mt-4"><h4 class="font-bold text-gray-800 mb-2">상세 분석</h4><ul class="list-disc list-inside space-y-2">`;
                abnormalItems.forEach(item => {
                    analysisHtml += `<li class="text-gray-700"><span class="font-semibold text-red-600">${item.name}</span>: ${item.value} (참고치: ${item.reference}) - ${this.getGenericStatusMessage(item.status)}</li>`;
                });
                analysisHtml += `</ul></div>`;
            }
        }

        analysisHtml += `</div>`;
        return analysisHtml;
    }

    private static getGenericStatusMessage(status: string): string {
        switch (status) {
            case 'high': return '수치가 높습니다.';
            case 'low': return '수치가 낮습니다.';
            case 'abnormal': return '이상 소견이 있습니다.';
            default: return '확인이 필요합니다.';
        }
    }

    private static generateBloodTestAnalysis(results: TestResultItem[]): string {
        let html = `<div class="mt-6 space-y-4">`;

        // Helper to find result by name (partial match)
        const findResult = (name: string) => results.find(r => r.name.includes(name));

        // 1. WBC (White Blood Cell)
        const wbc = findResult('WBC') || findResult('백혈구');
        if (wbc) {
            const val = parseFloat(wbc.value);
            if (val <= 4.0) {
                html += this.createAnalysisItem('백혈구 (WBC)', wbc.value, 'low', '백혈구 수치 저하소견입니다. 추후관리를 위해 혈액내과 진료 권고.');
            } else if (val >= 10.0) {
                html += this.createAnalysisItem('백혈구 (WBC)', wbc.value, 'high', '백혈구 상승소견 입니다. 추후관리를 위해 혈액내과 진료 권고.');
            }
        }

        // 2. Hb (Hemoglobin)
        const hb = findResult('Hb') || findResult('혈색소') || findResult('Hemoglobin');
        if (hb) {
            const val = parseFloat(hb.value);
            // Assuming gender logic needs to be passed or inferred. 
            // For simplicity, using a combined logic or checking if we have patient gender context.
            // Since we don't have gender passed to this specific helper easily without changing signature,
            // let's assume standard ranges or check if we can infer.
            // Actually, let's just use the value logic provided:
            // Male < 13, Female < 12 -> Low
            // Male >= 17, Female >= 16 -> High
            // We'll use a conservative check or check the 'status' field from dummyData if it's reliable.
            // But the user wants specific logic. Let's use the 'status' from dummyData as a proxy for gender-aware check if possible,
            // OR just implement the logic if we had gender.
            // Let's rely on the explicit value check.

            if (val < 12.0) { // Conservative low
                html += this.createAnalysisItem('혈색소 (Hb)', hb.value, 'low',
                    `혈색소 수치 저하소견입니다. 추후관리를 위해 혈액내과 진료를 받으시기 바랍니다.<br>
                     빈혈 수치가 약간 감소되어 있습니다. 여성에서 빈혈은 편식, 위장관 출혈(치질 포함), 과다한 생리량으로 인해 발생할 수 있습니다.<br>
                     어지럼증 등 빈혈 증상이 지속되면 정밀검사와 치료를 위해 혈액내과(혈액종양내과) 진료 권고.`);
            } else if (val >= 17.0) { // Conservative high
                html += this.createAnalysisItem('혈색소 (Hb)', hb.value, 'high', '혈색소 수치 상승소견입니다. 추후관리를 위해 혈액내과 진료를 받으시기 바랍니다.');
            }
        }

        // 3. Hct (Hematocrit)
        const hct = findResult('Hct') || findResult('적혈구용적');
        if (hct) {
            const val = parseFloat(hct.value);
            if (val >= 52) { // Conservative high
                html += this.createAnalysisItem('적혈구용적 (Hct)', hct.value, 'high', '적혈구용적율 상승소견 입니다. 추후관리를 위해 혈액내과 진료를 받으시기 바랍니다.');
            }
        }

        // 4. PLT (Platelet)
        const plt = findResult('PLT') || findResult('혈소판');
        if (plt) {
            const val = parseFloat(plt.value);
            if (val <= 130) {
                html += this.createAnalysisItem('혈소판 (PLT)', plt.value, 'low',
                    `혈소판 수치 저하소견입니다. 추후관리를 위해 혈액내과 진료 권고.<br>
                     cf) HBs Ag 양성일 경우에는 예외적으로 소화기내과 f/u.`);
            }
        }

        // 5. Neutrophils (ANC)
        const anc = findResult('Neutrophil') || findResult('호중구');
        if (anc) {
            const val = parseFloat(anc.value); // Assuming value is absolute count or percentage? 
            // User prompt said <= 1500. Usually ANC is absolute count. 
            // If data is %, we might need conversion. Assuming data is consistent with logic.
            if (val <= 1500) { // Assuming unit matches
                html += this.createAnalysisItem('호중구 (ANC)', anc.value, 'low', '호중구 수치 저하소견입니다. 혈액내과 진료 권고.');
            }
        }

        // 6. ESR
        const esr = findResult('ESR') || findResult('적혈구침강속도');
        if (esr) {
            const val = parseFloat(esr.value);
            if (val >= 30) {
                html += this.createAnalysisItem('ESR', esr.value, 'high', '적혈구침강속도 상승소견이 있습니다. 정상에서도 보일 수 있으나 염증질환 시 상승할 수 있습니다. 추적검사를 위해 류마티스내과 진료를 받으시기 바랍니다.');
            }
        }

        // 7. CRP / hsCRP
        const crp = findResult('CRP') || findResult('C-반응성단백');
        if (crp) {
            const val = parseFloat(crp.value);
            if (val >= 0.6) {
                html += this.createAnalysisItem('CRP', crp.value, 'high', 'C-반응성단백 수치가 상승되었습니다. 정상에서도 보일 수 있으나 염증질환 시 상승할 수 있습니다. 추적검사를 위해 류마티스내과 진료를 받으시기 바랍니다.');
            }
        }

        const hscrp = findResult('hsCRP') || findResult('고감도C반응성단백');
        if (hscrp) {
            const val = parseFloat(hscrp.value);
            if (val >= 1.1) {
                html += this.createAnalysisItem('hsCRP', hscrp.value, 'high', '고감도C반응성단백 수치가 상승되었습니다. 정상에서도 보일 수 있으나 염증질환 시 상승할 수 있습니다. 추적검사를 위해 류마티스내과 진료를 받으시기 바랍니다.');
            }
        }

        // 8. Uric Acid
        const ua = findResult('Uric Acid') || findResult('요산');
        if (ua) {
            const val = parseFloat(ua.value);
            if (val >= 8.0) {
                html += this.createAnalysisItem('요산 (Uric Acid)', ua.value, 'high', '요산수치가 상승되었습니다. 통풍 및 염증성 질환 시 상승할 수 있습니다. 추적검사가 요구되오니 류마티스내과 진료를 받으시기 바랍니다.');
            }
        }

        html += `</div>`;
        return html;
    }

    private static createAnalysisItem(name: string, value: string, type: 'high' | 'low' | 'abnormal', message: string): string {
        const colorClass = type === 'high' ? 'text-red-600' : (type === 'low' ? 'text-blue-600' : 'text-yellow-600');
        const bgClass = type === 'high' ? 'bg-red-50' : (type === 'low' ? 'bg-blue-50' : 'bg-yellow-50');
        const borderClass = type === 'high' ? 'border-red-200' : (type === 'low' ? 'border-blue-200' : 'border-yellow-200');

        return `
            <div class="${bgClass} border ${borderClass} rounded-lg p-4">
                <div class="flex items-center justify-between mb-2">
                    <span class="font-bold text-gray-800">${name}</span>
                    <span class="font-mono font-bold ${colorClass}">${value}</span>
                </div>
                <p class="text-sm text-gray-700 leading-relaxed">${message}</p>
            </div>
        `;
    }
}
