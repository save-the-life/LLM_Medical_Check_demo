// Sample data
const samplePatients = [
    {
        id: '66666666',
        name: '테스트5',
        gender: 'F',
        age: 45,
        date: '2025-05-02',
        status: 'completed',
        generatedAt: '2025-05-02 14:30'
    },
    {
        id: '10605143',
        name: '김선례',
        gender: 'F',
        age: 46,
        date: '2025-05-02',
        status: 'processing',
        generatedAt: null
    },
    {
        id: '10605144',
        name: '이영희',
        gender: 'F',
        age: 52,
        date: '2025-05-02',
        status: 'pending',
        generatedAt: null
    },
    {
        id: '10605145',
        name: '박민수',
        gender: 'M',
        age: 38,
        date: '2025-05-02',
        status: 'completed',
        generatedAt: '2025-05-02 15:20'
    },
    {
        id: '10605146',
        name: '최수진',
        gender: 'F',
        age: 41,
        date: '2025-05-02',
        status: 'completed',
        generatedAt: '2025-05-02 16:10'
    },
    {
        id: '10605147',
        name: '정철수',
        gender: 'M',
        age: 55,
        date: '2025-05-02',
        status: 'pending',
        generatedAt: null
    },
    {
        id: '10605148',
        name: '강미영',
        gender: 'F',
        age: 48,
        date: '2025-05-02',
        status: 'completed',
        generatedAt: '2025-05-02 16:45'
    },
    {
        id: '10605149',
        name: '윤재호',
        gender: 'M',
        age: 62,
        date: '2025-05-02',
        status: 'pending',
        generatedAt: null
    },
    {
        id: '10605150',
        name: '송지현',
        gender: 'F',
        age: 35,
        date: '2025-05-02',
        status: 'completed',
        generatedAt: '2025-05-02 17:20'
    },
    {
        id: '10605151',
        name: '임동혁',
        gender: 'M',
        age: 44,
        date: '2025-05-02',
        status: 'processing',
        generatedAt: null
    }
];

const testTypes = [
    { id: 'blood', name: '혈액검사', icon: 'fa-vial' },
    { id: 'urine', name: '소변검사', icon: 'fa-flask' },
    { id: 'xray', name: '흉부촬영', icon: 'fa-x-ray' },
    { id: 'ultrasound', name: '초음파검사', icon: 'fa-wave-square' },
    { id: 'endoscopy', name: '내시경검사', icon: 'fa-microscope' },
    { id: 'ecg', name: '심전도', icon: 'fa-heartbeat' },
    { id: 'eye', name: '안과검사', icon: 'fa-eye' },
    { id: 'hearing', name: '청력검사', icon: 'fa-ear-listen' },
    { id: 'mammography', name: '유방촬영', icon: 'fa-user-nurse' }
];

const samplePrompts = {
    blood: `혈액검사 결과를 분석하여 다음 사항을 포함한 소견을 작성하세요:
1. 정상 범위를 벗어난 수치에 대한 설명
2. 임상적 의의
3. 추가 검사나 진료가 필요한 경우 권고사항
4. 생활습관 개선 조언`,
    urine: `소변검사 결과를 바탕으로 신장 기능 및 요로계 건강 상태를 평가하세요.`,
    xray: `흉부 X-ray 영상 판독 결과를 임상적 관점에서 해석하고 이상 소견이 있을 경우 추가 검사를 권고하세요.`,
    ultrasound: `초음파 검사 결과에서 발견된 소견의 임상적 의의를 설명하고 필요시 추적 검사 일정을 제안하세요.`,
    endoscopy: `내시경 검사에서 관찰된 병변에 대해 상세히 기술하고 조직검사 결과와 함께 종합적인 평가를 제공하세요.`,
    ecg: `심전도 검사 결과를 분석하여 심장 리듬 이상, 허혈성 변화 등을 평가하세요.`,
    eye: `안과 검사 결과(시력, 안압, 안저검사)를 종합하여 안과 질환 위험도를 평가하세요.`,
    hearing: `청력 검사 결과를 주파수별로 분석하고 청력 저하가 있을 경우 원인과 관리 방안을 제시하세요.`,
    mammography: `유방촬영 검사 결과를 BI-RADS 분류에 따라 평가하고 추가 검사 필요 여부를 판단하세요.`
};

// Sample test results data
const sampleTestResults = {
    '66666666': {
        blood: [
            { name: '백혈구(WBC)', unit: '×10³/㎕', reference: '4.0-10.0', value: '5.86', status: 'normal' },
            { name: '적혈구(RBC)', unit: '×10⁶/㎕', reference: '4.0-5.4', value: '4.91', status: 'normal' },
            { name: 'Hb(혈색소)', unit: 'g/dL', reference: '12.0-16.0', value: '15.0', status: 'normal' },
            { name: '적혈구용적(Hct)', unit: '%', reference: '36.0-48.0', value: '46.0', status: 'normal' },
            { name: '혈소판', unit: '×10³/㎕', reference: '130-350', value: '233', status: 'normal' },
            { name: '호중구', unit: '%', reference: '40.0-60.0', value: '78.5', status: 'high' },
            { name: '임파구', unit: '%', reference: '20.0-50.0', value: '15.0', status: 'low' },
            { name: 'ESR', unit: 'mm/h', reference: '0-20', value: '15', status: 'normal' }
        ],
        lipid: [
            { name: '총콜레스테롤', unit: 'mg/dL', reference: '<200', value: '216', status: 'high' },
            { name: 'HDL 콜레스테롤', unit: 'mg/dL', reference: 'Low<40, High>60', value: '104', status: 'high' },
            { name: 'LDL 콜레스테롤', unit: 'mg/dL', reference: '<130', value: '120', status: 'normal' },
            { name: '중성지방(TG)', unit: 'mg/dL', reference: '<150', value: '41', status: 'normal' }
        ],
        liver: [
            { name: 'AST(SGOT)', unit: 'U/L', reference: 'F<32', value: '28', status: 'normal' },
            { name: 'ALT(SGPT)', unit: 'U/L', reference: 'F<33', value: '25', status: 'normal' },
            { name: 'GGT(γ-GTP)', unit: 'U/L', reference: '6-42', value: '14', status: 'normal' },
            { name: '총빌리루빈', unit: 'mg/dL', reference: '<1.2', value: '0.6', status: 'normal' }
        ],
        kidney: [
            { name: 'BUN(요소질소)', unit: 'mg/dL', reference: '6-20', value: '10', status: 'normal' },
            { name: 'Creatinine', unit: 'mg/dL', reference: '0.50-0.90', value: '0.60', status: 'normal' },
            { name: 'eGFR', unit: 'mL/min/1.73m²', reference: '>60', value: '112.73', status: 'normal' }
        ],
        glucose: [
            { name: 'Glucose(공복혈당)', unit: 'mg/dL', reference: '<100', value: '80', status: 'normal' },
            { name: '당화혈색소', unit: '%', reference: '4.5-5.8', value: '4.8', status: 'normal' }
        ],
        thyroid: [
            { name: 'TSH', unit: 'μIU/mL', reference: '0.35-4.94', value: '1.190', status: 'normal' },
            { name: 'Free T4', unit: 'ng/dL', reference: '0.70-1.48', value: '0.92', status: 'normal' }
        ],
        urine: [
            { name: '요산도(PH)', reference: '5.0-7.0', value: '5.0', status: 'normal' },
            { name: '요단백', reference: '-', value: '-', status: 'normal' },
            { name: '요당', reference: '-', value: '-', status: 'normal' },
            { name: '케톤체', reference: '-', value: '1+', status: 'normal', note: '정상인도 공복시 양성반응' },
            { name: '요잠혈', reference: '-', value: '-', status: 'normal' },
            { name: '요비중', reference: '1.005-1.030', value: '1.036', status: 'high' }
        ],
        xray: '흉부촬영 PA: No active lung lesion. Normal shape and size of heart. 정상입니다.',
        ultrasound: 'S/P cholecystectomy (담낭 절제 상태). 특이소견 없음.',
        ecg: '특이 소견 없음',
        eye: '안저촬영: 특이 소견 없습니다.\n시력(교정): 좌 1.5, 우 1.5\n안압: 좌 16, 우 16 mmHg',
        hearing: '청력검사 PTA: 양측 정상',
        mammography: '1. Breast Composition: c. The breasts are heterogeneously dense\n2. Impression: A glandular asymmetry in right center\n3. BIRADS category: 0 (need additional imaging evaluation)'
    },
    '10605143': {
        blood: [
            { name: '백혈구(WBC)', unit: '×10³/㎕', reference: '4.0-10.0', value: '6.2', status: 'normal' },
            { name: '적혈구(RBC)', unit: '×10⁶/㎕', reference: '4.0-5.4', value: '4.5', status: 'normal' },
            { name: 'Hb(혈색소)', unit: 'g/dL', reference: '12.0-16.0', value: '13.8', status: 'normal' },
            { name: '호중구', unit: '%', reference: '40.0-60.0', value: '55.2', status: 'normal' },
            { name: '임파구', unit: '%', reference: '20.0-50.0', value: '32.1', status: 'normal' }
        ],
        lipid: [
            { name: '총콜레스테롤', unit: 'mg/dL', reference: '<200', value: '185', status: 'normal' },
            { name: 'HDL 콜레스테롤', unit: 'mg/dL', reference: 'Low<40, High>60', value: '58', status: 'normal' },
            { name: 'LDL 콜레스테롤', unit: 'mg/dL', reference: '<130', value: '110', status: 'normal' }
        ]
    }
};

const masterPrompt = `아래는 환자의 종합건강검진 결과입니다. 각 검사별 AI 분석 결과를 종합하여 전체적인 건강 상태를 평가하고, 주요 소견과 권고사항을 포함한 종합소견을 작성하세요.

[종합소견 작성 가이드라인]
1. 주요 이상 소견을 우선순위에 따라 명확하게 기술
2. 정상 소견도 간략하게 언급하여 전체적인 건강 상태 파악
3. 위험 요인과 예방적 관리가 필요한 사항 강조
4. 추가 검사나 전문과 진료가 필요한 경우 구체적으로 명시
5. 생활습관 개선 권고사항 포함
6. 다음 검진 일정 제안

[톤 및 스타일]
- 전문적이면서도 이해하기 쉬운 언어 사용
- 환자의 불안을 최소화하면서도 중요한 사항은 명확히 전달
- 긍정적이고 격려하는 톤 유지`;

// Page navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });
    
    // Remove active class from all tabs
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.classList.remove('nav-active');
        tab.classList.add('text-gray-600');
    });
    
    // Show selected page
    document.getElementById(`page-${pageId}`).classList.remove('hidden');
    
    // Add active class to selected tab
    const activeTab = document.getElementById(`tab-${pageId}`);
    activeTab.classList.add('nav-active');
    activeTab.classList.remove('text-gray-600');
}

// Initialize patient table
function initPatientTable() {
    const tbody = document.querySelector('#patientTable tbody');
    tbody.innerHTML = '';
    
    samplePatients.forEach(patient => {
        const tr = document.createElement('tr');
        tr.className = 'cursor-pointer hover:bg-purple-50 transition';
        
        let statusBadge = '';
        let statusIcon = '';
        
        if (patient.status === 'completed') {
            statusBadge = '<span class="status-badge status-completed"><i class="fas fa-check-circle"></i>생성 완료</span>';
            statusIcon = '✅';
        } else if (patient.status === 'processing') {
            statusBadge = '<span class="status-badge status-processing"><i class="fas fa-spinner fa-spin"></i>생성 중</span>';
            statusIcon = '🔄';
        } else {
            statusBadge = '<span class="status-badge status-pending"><i class="fas fa-clock"></i>대기중</span>';
            statusIcon = '⏳';
        }
        
        tr.innerHTML = `
            <td onclick="event.stopPropagation()">
                <input type="checkbox" class="w-4 h-4 text-purple-600 rounded focus:ring-purple-500">
            </td>
            <td class="font-semibold">${patient.id}</td>
            <td>${patient.name}</td>
            <td>${patient.gender}/${patient.age}</td>
            <td>${patient.date}</td>
            <td>${statusBadge}</td>
            <td class="text-gray-600">${patient.generatedAt || '-'}</td>
            <td onclick="event.stopPropagation()">
                <div class="flex gap-2">
                    ${patient.status === 'completed' ? 
                        `<button onclick="viewResult('${patient.id}')" class="text-blue-600 hover:text-blue-800" title="결과 보기">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button onclick="downloadPDF('${patient.id}')" class="text-green-600 hover:text-green-800" title="PDF 다운로드">
                            <i class="fas fa-download"></i>
                        </button>` : 
                        `<button onclick="generateSummary('${patient.id}')" class="text-purple-600 hover:text-purple-800" title="소견 생성">
                            <i class="fas fa-robot"></i>
                        </button>`
                    }
                    <button onclick="showPatientDetail('${patient.id}')" class="text-gray-600 hover:text-gray-800" title="상세 정보">
                        <i class="fas fa-info-circle"></i>
                    </button>
                </div>
            </td>
        `;
        
        // Add click event to row (except on buttons)
        tr.addEventListener('click', function(e) {
            if (!e.target.closest('button') && !e.target.closest('input')) {
                showPatientDetail(patient.id);
            }
        });
        
        tbody.appendChild(tr);
    });
}

// Initialize test list (dropdown)
function initTestList() {
    const select = document.getElementById('testTypeSelect');
    select.innerHTML = '<option value="">검사를 선택하세요</option>';
    
    testTypes.forEach(test => {
        const option = document.createElement('option');
        option.value = test.id;
        option.textContent = test.name;
        select.appendChild(option);
    });
}

// Select test from dropdown
function selectTestFromDropdown() {
    const select = document.getElementById('testTypeSelect');
    const testId = select.value;
    
    if (!testId) {
        document.getElementById('promptEditor').value = '';
        return;
    }
    
    currentTestType = testId;
    
    // Load corresponding prompt
    document.getElementById('promptEditor').value = samplePrompts[testId] || '';
    
    // If patient is selected, update test results
    if (selectedTestPatient) {
        displayTestResults(selectedTestPatient, testId);
    }
}

// Initialize test patient list
function initTestPatientList() {
    const list = document.getElementById('testPatientList');
    list.innerHTML = '<p class="text-sm text-gray-400 text-center py-4">조회 버튼을 클릭하세요</p>';
}

// Load test patients (for test prompt page)
let selectedTestPatient = null;
let currentTestType = 'blood';

function loadTestPatients() {
    const list = document.getElementById('testPatientList');
    list.innerHTML = '';
    
    // Show more patients for scroll test
    samplePatients.slice(0, 8).forEach(patient => {
        const div = document.createElement('div');
        div.className = 'p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition';
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-semibold text-sm">${patient.name}</p>
                    <p class="text-xs text-gray-600">${patient.id} | ${patient.gender}/${patient.age}</p>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </div>
        `;
        div.onclick = () => selectTestPatient(patient.id);
        list.appendChild(div);
    });
}

function selectTestPatient(patientId) {
    selectedTestPatient = patientId;
    const patient = samplePatients.find(p => p.id === patientId);
    const testResults = sampleTestResults[patientId];
    
    if (!testResults) {
        alert('해당 환자의 검사 결과가 없습니다.');
        return;
    }
    
    // Highlight selected patient
    document.querySelectorAll('#testPatientList > div').forEach(div => {
        div.classList.remove('bg-purple-100', 'border-purple-600');
        div.classList.add('border-gray-200');
    });
    event.currentTarget.classList.add('bg-purple-100', 'border-purple-600');
    event.currentTarget.classList.remove('border-gray-200');
    
    // Display test results
    displayTestResults(patientId, currentTestType);
}

function displayTestResults(patientId, testType) {
    const testResults = sampleTestResults[patientId];
    const container = document.getElementById('selectedPatientTestResult');
    
    if (!testResults) {
        container.innerHTML = '<p class="text-sm text-gray-400 text-center py-8">검사 결과가 없습니다</p>';
        return;
    }
    
    const patient = samplePatients.find(p => p.id === patientId);
    
    // Patient info header
    let html = `
        <div class="bg-purple-50 border-l-4 border-purple-600 p-4 mb-4">
            <h4 class="font-bold text-gray-800 mb-2">환자 정보</h4>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <p><span class="text-gray-600">등록번호:</span> ${patient.id}</p>
                <p><span class="text-gray-600">성명:</span> ${patient.name}</p>
                <p><span class="text-gray-600">성별/나이:</span> ${patient.gender}/${patient.age}</p>
                <p><span class="text-gray-600">검진일:</span> ${patient.date}</p>
            </div>
        </div>
    `;
    
    // Get test category data
    const testCategoryMap = {
        'blood': 'blood',
        'urine': 'urine',
        'xray': 'xray',
        'ultrasound': 'ultrasound',
        'endoscopy': 'endoscopy',
        'ecg': 'ecg',
        'eye': 'eye',
        'hearing': 'hearing',
        'mammography': 'mammography'
    };
    
    const categoryKey = testCategoryMap[testType] || 'blood';
    const data = testResults[categoryKey];
    
    if (!data) {
        html += '<p class="text-sm text-gray-500 text-center py-4">해당 검사 결과가 없습니다</p>';
        container.innerHTML = html;
        return;
    }
    
    html += '<h4 class="font-bold text-gray-800 mb-3">검사 결과</h4>';
    
    if (Array.isArray(data)) {
        // Numeric results
        html += `
            <div class="overflow-x-auto">
                <table class="w-full text-sm border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-3 py-2 text-left">검사항목</th>
                            <th class="border border-gray-300 px-3 py-2 text-left">참고치</th>
                            <th class="border border-gray-300 px-3 py-2 text-left">결과</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        data.forEach(item => {
            const isOutOfRange = item.status === 'high' || item.status === 'low';
            const valueClass = isOutOfRange ? 'text-red-600 font-bold' : '';
            
            html += `
                <tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-3 py-2">${item.name}${item.unit ? ' (' + item.unit + ')' : ''}</td>
                    <td class="border border-gray-300 px-3 py-2">${item.reference}</td>
                    <td class="border border-gray-300 px-3 py-2 ${valueClass}">${item.value}</td>
                </tr>
            `;
        });
        
        html += `
                    </tbody>
                </table>
            </div>
        `;
    } else {
        // Descriptive results
        html += `
            <div class="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <pre class="text-gray-800 whitespace-pre-wrap text-sm">${data}</pre>
            </div>
        `;
    }
    
    container.innerHTML = html;
}

function runAIAnalysis() {
    if (!selectedTestPatient) {
        alert('검진 대상자를 먼저 선택하세요.');
        return;
    }
    
    const patient = samplePatients.find(p => p.id === selectedTestPatient);
    showProcessing();
    
    setTimeout(() => {
        hideProcessing();
        document.getElementById('aiAnalysisResult').innerHTML = `
            <div class="space-y-4">
                <div class="border-l-4 border-purple-600 pl-4">
                    <h4 class="font-bold text-gray-800 mb-2">환자 정보</h4>
                    <p class="text-sm text-gray-600">${patient.name} (${patient.gender}/${patient.age}세) - ${patient.id}</p>
                </div>
                <div class="border-l-4 border-blue-600 pl-4">
                    <h4 class="font-bold text-gray-800 mb-2">AI 분석 결과</h4>
                    <p class="text-sm text-gray-700 leading-relaxed">
                        ${currentTestType === 'blood' ? 
                            '혈액검사 결과 호중구가 78.5%로 참고치(40-60%) 범위를 벗어나 증가되어 있으며, 임파구는 15.0%로 감소되어 있습니다. 이는 스트레스, 급성 염증 또는 최근 감염의 가능성을 시사합니다.' :
                            '검사 결과에 대한 AI 분석이 완료되었습니다. 주요 소견 및 권고사항을 확인하세요.'
                        }
                        <br><br>
                        총콜레스테롤 216 mg/dL로 경도 상승(정상 &lt;200)되어 있어 고지혈증 초기 단계로 판단됩니다. 식이조절과 운동을 통한 관리가 필요합니다.
                    </p>
                </div>
                <div class="border-l-4 border-green-600 pl-4">
                    <h4 class="font-bold text-gray-800 mb-2">권고사항</h4>
                    <ul class="text-sm text-gray-700 space-y-1 list-disc list-inside">
                        <li>콜레스테롤 관리를 위한 저지방 식이 및 규칙적인 운동 권장</li>
                        <li>3개월 후 추적 혈액검사로 호중구/임파구 비율 재확인 필요</li>
                        <li>충분한 휴식과 스트레스 관리</li>
                    </ul>
                </div>
            </div>
        `;
    }, 2000);
}

// Initialize summary patient list
function initSummaryPatientList() {
    const list = document.getElementById('summaryPatientList');
    list.innerHTML = '<p class="text-sm text-gray-400 text-center py-4">조회 버튼을 클릭하세요</p>';
}

// Load summary patients
let selectedSummaryPatient = null;

function loadSummaryPatients() {
    const list = document.getElementById('summaryPatientList');
    list.innerHTML = '';
    
    // Show all patients for scroll test
    samplePatients.forEach(patient => {
        const div = document.createElement('div');
        div.className = 'p-3 border border-gray-200 rounded-lg hover:bg-purple-50 cursor-pointer transition';
        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <p class="font-semibold text-sm">${patient.name}</p>
                    <p class="text-xs text-gray-600">${patient.id} | ${patient.date}</p>
                </div>
                <i class="fas fa-chevron-right text-gray-400"></i>
            </div>
        `;
        div.onclick = () => selectSummaryPatient(patient.id);
        list.appendChild(div);
    });
}

function selectSummaryPatient(patientId) {
    selectedSummaryPatient = patientId;
    
    // Highlight selected patient
    document.querySelectorAll('#summaryPatientList > div').forEach(div => {
        div.classList.remove('bg-purple-100', 'border-purple-600');
        div.classList.add('border-gray-200');
    });
    event.currentTarget.classList.add('bg-purple-100', 'border-purple-600');
    event.currentTarget.classList.remove('border-gray-200');
    
    // Display all test results
    displayAllTestResults(patientId);
}

function displayAllTestResults(patientId) {
    const testResults = sampleTestResults[patientId];
    const container = document.getElementById('allTestResultsView');
    
    if (!testResults) {
        container.innerHTML = '<p class="text-sm text-gray-400 text-center py-8">검사 결과가 없습니다</p>';
        return;
    }
    
    const patient = samplePatients.find(p => p.id === patientId);
    
    let html = `
        <div class="bg-purple-50 border-l-4 border-purple-600 p-4 mb-4">
            <h4 class="font-bold text-gray-800 mb-2">환자 정보</h4>
            <div class="grid grid-cols-2 gap-2 text-sm">
                <p><span class="text-gray-600">등록번호:</span> ${patient.id}</p>
                <p><span class="text-gray-600">성명:</span> ${patient.name}</p>
                <p><span class="text-gray-600">성별/나이:</span> ${patient.gender}/${patient.age}</p>
                <p><span class="text-gray-600">검진일:</span> ${patient.date}</p>
            </div>
        </div>
    `;
    
    // Display each test category
    const categories = [
        { key: 'blood', name: '혈액검사' },
        { key: 'lipid', name: '고지혈검사' },
        { key: 'liver', name: '간기능검사' },
        { key: 'kidney', name: '신장기능검사' },
        { key: 'glucose', name: '당뇨검사' },
        { key: 'thyroid', name: '갑상선검사' },
        { key: 'urine', name: '소변검사' }
    ];
    
    categories.forEach(cat => {
        const data = testResults[cat.key];
        if (!data) return;
        
        html += `<div class="mb-6">`;
        html += `<h4 class="font-bold text-gray-800 mb-2 bg-gray-100 px-3 py-2 rounded">${cat.name}</h4>`;
        
        if (Array.isArray(data)) {
            html += `
                <div class="overflow-x-auto">
                    <table class="w-full text-sm border-collapse mb-2">
                        <thead>
                            <tr class="bg-gray-50">
                                <th class="border border-gray-300 px-3 py-1 text-left">검사항목</th>
                                <th class="border border-gray-300 px-3 py-1 text-left">참고치</th>
                                <th class="border border-gray-300 px-3 py-1 text-left">결과</th>
                            </tr>
                        </thead>
                        <tbody>
            `;
            
            // Show only out-of-range or important items (up to 5)
            const importantItems = data.filter(item => item.status !== 'normal').slice(0, 5);
            if (importantItems.length === 0) {
                importantItems.push(...data.slice(0, 3)); // Show first 3 if all normal
            }
            
            importantItems.forEach(item => {
                const isOutOfRange = item.status === 'high' || item.status === 'low';
                const valueClass = isOutOfRange ? 'text-red-600 font-bold' : '';
                
                html += `
                    <tr class="hover:bg-gray-50">
                        <td class="border border-gray-300 px-3 py-1">${item.name}</td>
                        <td class="border border-gray-300 px-3 py-1">${item.reference}</td>
                        <td class="border border-gray-300 px-3 py-1 ${valueClass}">${item.value}${item.unit ? ' ' + item.unit : ''}</td>
                    </tr>
                `;
            });
            
            if (data.length > importantItems.length) {
                html += `
                    <tr>
                        <td colspan="3" class="border border-gray-300 px-3 py-1 text-center text-gray-500 text-xs">
                            외 ${data.length - importantItems.length}개 항목 (모두 정상)
                        </td>
                    </tr>
                `;
            }
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
        } else {
            html += `
                <div class="bg-blue-50 border-l-4 border-blue-600 p-3 rounded text-sm">
                    <pre class="text-gray-800 whitespace-pre-wrap">${data}</pre>
                </div>
            `;
        }
        
        html += `</div>`;
    });
    
    container.innerHTML = html;
}

function generateComprehensiveSummary() {
    if (!selectedSummaryPatient) {
        alert('검진 대상자를 먼저 선택하세요.');
        return;
    }
    
    const patient = samplePatients.find(p => p.id === selectedSummaryPatient);
    showProcessing();
    
    setTimeout(() => {
        hideProcessing();
        document.getElementById('summaryPreview').innerHTML = `
            <div class="space-y-4">
                <div class="bg-white border-l-4 border-purple-600 p-4 rounded">
                    <h4 class="font-bold text-gray-800 mb-2">환자 정보</h4>
                    <p class="text-sm text-gray-600">${patient.name} (${patient.gender}/${patient.age}세)</p>
                    <p class="text-sm text-gray-600">등록번호: ${patient.id}</p>
                    <p class="text-sm text-gray-600">검진일: ${patient.date}</p>
                </div>
                
                <div class="bg-white border-l-4 border-blue-600 p-4 rounded">
                    <h4 class="font-bold text-gray-800 mb-2">주요 소견</h4>
                    <p class="text-sm text-gray-700 leading-relaxed">
                        과체중(BMI 24.9)이고 고혈압 전단계 소견입니다. 식이조절과 규칙적인 운동, 
                        잦은 혈압측정을 하시고 지속적으로 혈압이 높을 경우 심장내과 진료받으시기 바랍니다.
                    </p>
                </div>
                
                <div class="bg-white border-l-4 border-yellow-600 p-4 rounded">
                    <h4 class="font-bold text-gray-800 mb-2">주의 소견</h4>
                    <p class="text-sm text-gray-700 leading-relaxed">
                        유방촬영 검사에서 치밀유방이며 우측 유방에 비대칭 소견이 있습니다. 
                        유방초음파에서 우측 유방 유륜하부 근처에 다수의 낭종들(6mm)이 관찰되어 
                        조기 추적검사가 요구됩니다. 유방외과 진료를 받으시기 바랍니다.
                    </p>
                </div>
                
                <div class="bg-white border-l-4 border-green-600 p-4 rounded">
                    <h4 class="font-bold text-gray-800 mb-2">종합 판정</h4>
                    <ul class="text-sm text-gray-700 space-y-2 list-disc list-inside">
                        <li class="font-semibold text-red-600">적극적인 혈압관리 요함</li>
                        <li class="font-semibold text-red-600">우측 유방 비대칭 및 유방병변 의심 -- 유방외과 진료 권고</li>
                    </ul>
                </div>
                
                <div class="bg-gray-100 p-4 rounded">
                    <p class="text-sm text-gray-600">다음 건진일: 2026/${patient.date.substring(5)}</p>
                </div>
            </div>
        `;
    }, 3000);
}

// Select test type
// Show full prompt modal
function showFullPrompt() {
    const modal = document.getElementById('fullPromptModal');
    const content = document.getElementById('fullPromptContent');
    
    const userPrompt = document.getElementById('promptEditor').value;
    const basePrompt = `[시스템 기본 프롬프트]
당신은 종합건강검진 결과를 분석하는 전문 의료 AI입니다.
검사 결과를 정확하고 이해하기 쉽게 설명하며, 임상적으로 유의미한 소견에 집중합니다.

[사용자 정의 프롬프트]
${userPrompt}

[출력 형식]
- 명확하고 간결한 문장 사용
- 의학 용어 사용 시 쉬운 설명 병기
- 정상/비정상 소견 구분
- 추가 조치 필요 사항 강조`;
    
    content.innerHTML = `<pre class="whitespace-pre-wrap">${basePrompt}</pre>`;
    modal.classList.remove('hidden');
}

function closeFullPrompt() {
    document.getElementById('fullPromptModal').classList.add('hidden');
}

// Generate summary
function generateSummary(patientId) {
    const patient = samplePatients.find(p => p.id === patientId);
    if (!patient) return;
    
    if (confirm(`${patient.name} 환자의 종합소견을 생성하시겠습니까?\n소요시간: 약 5분`)) {
        showProcessing();
        
        // Simulate AI processing
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressText').textContent = Math.floor(progress) + '%';
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    hideProcessing();
                    alert('종합소견 생성이 완료되었습니다!');
                    patient.status = 'completed';
                    patient.generatedAt = new Date().toLocaleString('ko-KR');
                    initPatientTable();
                }, 500);
            }
        }, 300);
    }
}

// View result
function viewResult(patientId) {
    // result.html 페이지로 이동 (실제로는 patientId를 쿼리스트링으로 전달)
    window.open(`result.html?patientId=${patientId}`, '_blank');
}

// Show patient detail in main page
function showPatientDetail(patientId) {
    const patient = samplePatients.find(p => p.id === patientId);
    if (!patient) return;
    
    const testResults = sampleTestResults[patientId];
    if (!testResults) {
        alert('해당 환자의 검사 결과가 없습니다.');
        return;
    }
    
    // Show detail view
    document.getElementById('patientDetailView').classList.remove('hidden');
    
    // Populate patient info
    const infoSummary = document.getElementById('patientInfoSummary');
    infoSummary.innerHTML = `
        <div>
            <p class="text-sm text-gray-600">등록번호</p>
            <p class="font-semibold">${patient.id}</p>
        </div>
        <div>
            <p class="text-sm text-gray-600">성명</p>
            <p class="font-semibold">${patient.name}</p>
        </div>
        <div>
            <p class="text-sm text-gray-600">성별/나이</p>
            <p class="font-semibold">${patient.gender}/${patient.age}</p>
        </div>
        <div>
            <p class="text-sm text-gray-600">검진일</p>
            <p class="font-semibold">${patient.date}</p>
        </div>
    `;
    
    // Create tabs for test results
    const tabs = document.getElementById('testResultTabs');
    tabs.innerHTML = '';
    
    const testCategories = [
        { key: 'blood', name: '혈액검사', icon: 'fa-vial' },
        { key: 'lipid', name: '고지혈검사', icon: 'fa-heartbeat' },
        { key: 'liver', name: '간기능검사', icon: 'fa-prescription-bottle' },
        { key: 'kidney', name: '신장기능검사', icon: 'fa-kidneys' },
        { key: 'glucose', name: '당뇨검사', icon: 'fa-syringe' },
        { key: 'thyroid', name: '갑상선검사', icon: 'fa-pills' },
        { key: 'urine', name: '소변검사', icon: 'fa-flask' },
        { key: 'xray', name: '영상검사', icon: 'fa-x-ray' }
    ];
    
    testCategories.forEach((cat, index) => {
        if (testResults[cat.key]) {
            const button = document.createElement('button');
            button.className = `px-4 py-2 rounded-t-lg font-semibold transition whitespace-nowrap ${index === 0 ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`;
            button.innerHTML = `<i class="fas ${cat.icon} mr-2"></i>${cat.name}`;
            button.onclick = () => showTestCategory(patientId, cat.key, button);
            tabs.appendChild(button);
        }
    });
    
    // Show first category by default
    const firstCategory = testCategories.find(cat => testResults[cat.key]);
    if (firstCategory) {
        showTestCategory(patientId, firstCategory.key);
    }
    
    // Scroll to detail view
    document.getElementById('patientDetailView').scrollIntoView({ behavior: 'smooth' });
}

function closePatientDetail() {
    document.getElementById('patientDetailView').classList.add('hidden');
}

function showTestCategory(patientId, category, clickedButton = null) {
    const testResults = sampleTestResults[patientId];
    const content = document.getElementById('testResultsContent');
    
    // Update tab active state
    if (clickedButton) {
        document.querySelectorAll('#testResultTabs button').forEach(btn => {
            btn.className = 'px-4 py-2 rounded-t-lg font-semibold transition whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200';
        });
        clickedButton.className = 'px-4 py-2 rounded-t-lg font-semibold transition whitespace-nowrap bg-purple-600 text-white';
    }
    
    const data = testResults[category];
    
    if (Array.isArray(data)) {
        // Numeric test results
        let tableHTML = `
            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2 text-left">검사 항목</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">단위</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">참고치</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">결과</th>
                            <th class="border border-gray-300 px-4 py-2 text-left">비고</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        
        data.forEach(item => {
            const isOutOfRange = item.status === 'high' || item.status === 'low';
            const valueClass = isOutOfRange ? 'text-red-600 font-bold' : '';
            const statusText = item.status === 'high' ? '↑ 높음' : item.status === 'low' ? '↓ 낮음' : '';
            
            tableHTML += `
                <tr class="hover:bg-gray-50">
                    <td class="border border-gray-300 px-4 py-2">${item.name}</td>
                    <td class="border border-gray-300 px-4 py-2 text-sm">${item.unit || ''}</td>
                    <td class="border border-gray-300 px-4 py-2 text-sm">${item.reference}</td>
                    <td class="border border-gray-300 px-4 py-2 ${valueClass}">${item.value}</td>
                    <td class="border border-gray-300 px-4 py-2 text-sm ${isOutOfRange ? 'text-red-600 font-semibold' : ''}">${item.note || statusText}</td>
                </tr>
            `;
        });
        
        tableHTML += `
                    </tbody>
                </table>
            </div>
        `;
        
        content.innerHTML = tableHTML;
    } else {
        // Descriptive test results
        content.innerHTML = `
            <div class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                <h4 class="font-bold mb-3 text-gray-800">검사 결과</h4>
                <pre class="text-gray-800 whitespace-pre-wrap leading-relaxed">${data}</pre>
            </div>
        `;
    }
}

// Download PDF
function downloadPDF(patientId) {
    alert(`${patientId} 환자의 종합소견을 PDF로 다운로드합니다.\n(실제 구현 시 PDF 생성 및 다운로드)`);
}

// Show/hide processing modal
function showProcessing() {
    document.getElementById('processingModal').classList.remove('hidden');
    document.getElementById('progressBar').style.width = '0%';
    document.getElementById('progressText').textContent = '0%';
}

function hideProcessing() {
    document.getElementById('processingModal').classList.add('hidden');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initPatientTable();
    initTestList();
    initTestPatientList();
    initSummaryPatientList();
    
    // Load default prompts
    document.getElementById('promptEditor').value = samplePrompts.blood;
    document.getElementById('summaryPromptEditor').value = masterPrompt;
    
    // Close modal on outside click
    document.getElementById('fullPromptModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeFullPrompt();
        }
    });
    
    document.getElementById('processingModal').addEventListener('click', function(e) {
        if (e.target === this) {
            // Don't allow closing during processing
        }
    });
});
