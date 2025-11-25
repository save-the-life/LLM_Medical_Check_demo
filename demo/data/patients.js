// Mock 환자 데이터
const MOCK_PATIENTS = [
    {
        id: '01869517',
        name: '김건강',
        gender: 'M',
        age: 45,
        birthDate: '1980-03-15',
        examDate: '2025-11-07',
        status: 'completed', // completed, processing, pending
        generatedAt: '2025-11-07 14:23:15',
        aiSummary: '과체중이며 체지방율이 높은 상태입니다. 혈압은 정상 범위이나 허리둘레 관리가 필요합니다.'
    },
    {
        id: '04739580',
        name: '이슬기',
        gender: 'F',
        age: 32,
        birthDate: '1993-07-22',
        examDate: '2025-11-07',
        status: 'completed',
        generatedAt: '2025-11-07 15:10:42',
        aiSummary: '저체중이나 체지방율이 높은 마른비만 상태입니다. 근육량 증가를 위한 운동과 단백질 섭취가 필요합니다.'
    },
    {
        id: '05550346',
        name: '박민수',
        gender: 'M',
        age: 38,
        birthDate: '1987-11-30',
        examDate: '2025-11-07',
        status: 'completed',
        generatedAt: '2025-11-07 16:05:18',
        aiSummary: 'BMI는 정상 범위 상한이나 체지방율이 높습니다. 심혈관 건강을 위한 유산소 운동이 권장됩니다.'
    },
    {
        id: '12345678',
        name: '최영희',
        gender: 'F',
        age: 52,
        birthDate: '1973-05-08',
        examDate: '2025-11-08',
        status: 'processing',
        generatedAt: null,
        aiSummary: null
    },
    {
        id: '23456789',
        name: '정태윤',
        gender: 'M',
        age: 41,
        birthDate: '1984-09-12',
        examDate: '2025-11-08',
        status: 'pending',
        generatedAt: null,
        aiSummary: null
    },
    {
        id: '34567890',
        name: '강수정',
        gender: 'F',
        age: 29,
        birthDate: '1996-12-25',
        examDate: '2025-11-08',
        status: 'pending',
        generatedAt: null,
        aiSummary: null
    }
];

// 날짜별 환자 필터링 함수
function getPatientsByDate(date) {
    if (!date) return MOCK_PATIENTS;
    return MOCK_PATIENTS.filter(p => p.examDate === date);
}

// 상태별 환자 필터링 함수
function getPatientsByStatus(status) {
    if (!status || status === '전체') return MOCK_PATIENTS;
    const statusMap = {
        '생성 완료': 'completed',
        '생성 대기': 'pending',
        '생성 중': 'processing'
    };
    return MOCK_PATIENTS.filter(p => p.status === statusMap[status]);
}

// 환자 검색 함수
function searchPatients(keyword) {
    if (!keyword) return MOCK_PATIENTS;
    return MOCK_PATIENTS.filter(p =>
        p.name.includes(keyword) ||
        p.id.includes(keyword)
    );
}

// 특정 환자 조회
function getPatientById(patientId) {
    return MOCK_PATIENTS.find(p => p.id === patientId);
}

// 통계 데이터 계산
function getStatistics() {
    return {
        total: MOCK_PATIENTS.length,
        completed: MOCK_PATIENTS.filter(p => p.status === 'completed').length,
        processing: MOCK_PATIENTS.filter(p => p.status === 'processing').length,
        pending: MOCK_PATIENTS.filter(p => p.status === 'pending').length
    };
}
