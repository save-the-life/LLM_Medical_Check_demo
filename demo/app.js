// Global State
let currentPage = 'generation';
let selectedTestGroup = '신체계측';
let currentFilters = {
    date: '2025-11-07',
    name: '',
    status: '전체'
};

// Page Navigation
function showPage(pageName) {
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
    document.getElementById(`page-${pageName}`).classList.remove('hidden');

    // Add active class to selected tab
    const activeTab = document.getElementById(`tab-${pageName}`);
    activeTab.classList.add('nav-active');
    activeTab.classList.remove('text-gray-600');

    currentPage = pageName;

    // Initialize page-specific content
    if (pageName === 'generation') {
        loadPatientList();
    } else if (pageName === 'test-prompts') {
        loadTestList();
        loadTestPatients();
    } else if (pageName === 'summary-prompt') {
        loadMasterPrompt();
        loadSummaryPatients();
    }
}

// Patient List Page Functions
function loadPatientList() {
    const patients = MOCK_PATIENTS;
    const stats = getStatistics();

    // Update statistics
    document.getElementById('stat-total').textContent = stats.total;
    document.getElementById('stat-completed').textContent = stats.completed;
    document.getElementById('stat-pending').textContent = stats.pending + stats.processing;

    // Render patient list
    const tbody = document.getElementById('patient-list');
    tbody.innerHTML = patients.map(patient => {
        const statusClass = `status-${patient.status}`;
        const statusText = {
            'completed': '생성 완료',
            'processing': '생성 중',
            'pending': '생성 대기'
        }[patient.status];

        return `
            <tr>
                <td>
                    <input type="checkbox" class="w-4 h-4 text-purple-600 rounded">
                </td>
                <td class="font-mono">${patient.id}</td>
                <td class="font-semibold">${patient.name}</td>
                <td>${patient.gender}/${patient.age}</td>
                <td>${patient.examDate}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${statusText}
                    </span>
                </td>
                <td class="text-sm text-gray-600">${patient.generatedAt || '-'}</td>
                <td>
                    <div class="flex gap-2">
                        ${patient.status === 'completed'
                            ? `<button onclick="viewResult('${patient.id}')" class="text-blue-600 hover:text-blue-800" title="결과 보기">
                                <i class="fas fa-eye"></i>
                              </button>
                              <button onclick="downloadPDF('${patient.id}')" class="text-green-600 hover:text-green-800" title="PDF 다운로드">
                                <i class="fas fa-download"></i>
                              </button>`
                            : `<button onclick="generateAI('${patient.id}')" class="text-purple-600 hover:text-purple-800" title="AI 생성">
                                <i class="fas fa-robot"></i>
                              </button>`
                        }
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function filterPatients() {
    currentFilters.date = document.getElementById('filter-date').value;
    currentFilters.name = document.getElementById('filter-name').value;
    currentFilters.status = document.getElementById('filter-status').value;

    let filtered = MOCK_PATIENTS;

    if (currentFilters.date) {
        filtered = filtered.filter(p => p.examDate === currentFilters.date);
    }

    if (currentFilters.name) {
        filtered = filtered.filter(p =>
            p.name.includes(currentFilters.name) ||
            p.id.includes(currentFilters.name)
        );
    }

    if (currentFilters.status !== '전체') {
        filtered = getPatientsByStatus(currentFilters.status);
    }

    // Render filtered results
    const tbody = document.getElementById('patient-list');
    tbody.innerHTML = filtered.map(patient => {
        const statusClass = `status-${patient.status}`;
        const statusText = {
            'completed': '생성 완료',
            'processing': '생성 중',
            'pending': '생성 대기'
        }[patient.status];

        return `
            <tr>
                <td>
                    <input type="checkbox" class="w-4 h-4 text-purple-600 rounded">
                </td>
                <td class="font-mono">${patient.id}</td>
                <td class="font-semibold">${patient.name}</td>
                <td>${patient.gender}/${patient.age}</td>
                <td>${patient.examDate}</td>
                <td>
                    <span class="status-badge ${statusClass}">
                        ${statusText}
                    </span>
                </td>
                <td class="text-sm text-gray-600">${patient.generatedAt || '-'}</td>
                <td>
                    <div class="flex gap-2">
                        ${patient.status === 'completed'
                            ? `<button onclick="viewResult('${patient.id}')" class="text-blue-600 hover:text-blue-800" title="결과 보기">
                                <i class="fas fa-eye"></i>
                              </button>
                              <button onclick="downloadPDF('${patient.id}')" class="text-green-600 hover:text-green-800" title="PDF 다운로드">
                                <i class="fas fa-download"></i>
                              </button>`
                            : `<button onclick="generateAI('${patient.id}')" class="text-purple-600 hover:text-purple-800" title="AI 생성">
                                <i class="fas fa-robot"></i>
                              </button>`
                        }
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function resetFilters() {
    document.getElementById('filter-date').value = '2025-11-07';
    document.getElementById('filter-name').value = '';
    document.getElementById('filter-status').value = '전체';
    currentFilters = { date: '2025-11-07', name: '', status: '전체' };
    loadPatientList();
}

function generateAI(patientId) {
    showProcessingModal();

    // Simulate AI generation with progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += 10;
        updateProgress(progress);

        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                hideProcessingModal();
                alert(`${patientId} 환자의 AI 소견이 생성되었습니다!\\n(데모 버전에서는 실제로 생성되지 않습니다)`);
            }, 500);
        }
    }, 500);
}

function batchGenerate() {
    const pending = MOCK_PATIENTS.filter(p => p.status === 'pending');
    if (pending.length === 0) {
        alert('생성 대기중인 환자가 없습니다.');
        return;
    }

    if (confirm(`${pending.length}명의 환자에 대해 AI 소견을 생성하시겠습니까?`)) {
        showProcessingModal();

        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            updateProgress(progress);

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    hideProcessingModal();
                    alert(`배치 생성이 완료되었습니다!\\n(데모 버전에서는 실제로 생성되지 않습니다)`);
                }, 500);
            }
        }, 300);
    }
}

function viewResult(patientId) {
    const patient = getPatientById(patientId);
    if (!patient) {
        alert('환자 정보를 찾을 수 없습니다.');
        return;
    }

    // Open result page in new window
    window.open(`result.html?patientId=${patientId}`, '_blank');
}

function downloadPDF(patientId) {
    const patient = getPatientById(patientId);
    if (!patient) {
        alert('환자 정보를 찾을 수 없습니다.');
        return;
    }

    alert(`${patient.name} 환자의 검진 결과 PDF를 다운로드합니다.\\n(데모 버전에서는 실제 파일이 다운로드되지 않습니다)`);
}

// Test Prompts Page Functions
function loadTestList() {
    const testList = document.getElementById('testList');
    testList.innerHTML = TEST_GROUPS.map((test, index) => {
        const isActive = test.name === selectedTestGroup;
        return `
            <button
                onclick="selectTest('${test.name}')"
                class="w-full text-left px-4 py-3 rounded-lg transition ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'hover:bg-gray-100'}"
            >
                <i class="fas ${test.icon} mr-2"></i>${test.name}
            </button>
        `;
    }).join('');

    // Load initial prompt
    selectTest(selectedTestGroup);
}

function selectTest(testName) {
    selectedTestGroup = testName;
    document.getElementById('selected-test-name').textContent = `${testName} 분석 프롬프트`;

    // Load prompt
    const prompt = loadPrompt('test', testName);
    document.getElementById('promptEditor').value = prompt;

    // Update test list UI
    loadTestList();
}

function saveTestPrompt() {
    const content = document.getElementById('promptEditor').value;
    savePrompt('test', content, selectedTestGroup);
    alert('프롬프트가 저장되었습니다.');
}

function resetTestPrompt() {
    const defaultPrompt = getPrompt('test', selectedTestGroup);
    document.getElementById('promptEditor').value = defaultPrompt;
}

function loadTestPatients() {
    const select = document.getElementById('test-patient');
    const completed = MOCK_PATIENTS.filter(p => p.status === 'completed');

    select.innerHTML = '<option value="">환자를 선택하세요</option>' +
        completed.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('');
}

function runTestAnalysis() {
    const patientId = document.getElementById('test-patient').value;

    if (!patientId) {
        alert('환자를 선택해주세요.');
        return;
    }

    showProcessingModal();

    // Simulate AI analysis
    setTimeout(() => {
        hideProcessingModal();

        const analysis = getAIAnalysisByGroup(patientId, selectedTestGroup);
        const resultDiv = document.getElementById('test-analysis-result');

        if (analysis) {
            resultDiv.innerHTML = `<div class="whitespace-pre-wrap text-gray-800">${analysis}</div>`;
        } else {
            resultDiv.innerHTML = `<p class="text-gray-500">해당 환자의 ${selectedTestGroup} 분석 결과가 없습니다.</p>`;
        }
    }, 2000);
}

// Summary Prompt Page Functions
function loadMasterPrompt() {
    const prompt = loadPrompt('master');
    document.getElementById('masterPromptEditor').value = prompt;
}

function saveMasterPrompt() {
    const content = document.getElementById('masterPromptEditor').value;
    savePrompt('master', content);
    alert('마스터 프롬프트가 저장되었습니다.');
}

function resetMasterPrompt() {
    const defaultPrompt = getPrompt('master');
    document.getElementById('masterPromptEditor').value = defaultPrompt;
}

function loadSummaryPatients() {
    const select = document.getElementById('summary-patient');
    const completed = MOCK_PATIENTS.filter(p => p.status === 'completed');

    select.innerHTML = '<option value="">환자를 선택하세요</option>' +
        completed.map(p => `<option value="${p.id}">${p.name} (${p.id})</option>`).join('');
}

function generateSummary() {
    const patientId = document.getElementById('summary-patient').value;

    if (!patientId) {
        alert('환자를 선택해주세요.');
        return;
    }

    showProcessingModal();

    // Simulate AI generation
    setTimeout(() => {
        hideProcessingModal();

        const analysis = getComprehensiveAnalysis(patientId);
        const previewDiv = document.getElementById('summary-preview');

        if (analysis) {
            previewDiv.innerHTML = `
                <div class="whitespace-pre-wrap text-gray-800">
                    ${analysis.summary}
                </div>
                <div class="mt-4 text-xs text-gray-500">
                    생성 일시: ${analysis.generatedAt}
                </div>
            `;
        } else {
            previewDiv.innerHTML = `<p class="text-gray-500">해당 환자의 종합소견이 없습니다.</p>`;
        }
    }, 3000);
}

// Modal Functions
function showProcessingModal() {
    document.getElementById('processingModal').classList.remove('hidden');
    updateProgress(0);
}

function hideProcessingModal() {
    document.getElementById('processingModal').classList.add('hidden');
}

function updateProgress(percent) {
    document.getElementById('progressBar').style.width = `${percent}%`;
    document.getElementById('progressText').textContent = `${percent}%`;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    showPage('generation');
});
