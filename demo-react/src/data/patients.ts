import type { Patient, Statistics, PatientStatus } from '../types';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: '01869517',
    name: '김건강',
    gender: 'M',
    age: 45,
    birthDate: '1980-03-15',
    examDate: '2025-11-07',
    status: 'completed',
    generatedAt: '2025-11-07 14:23:15',
    aiSummary: '과체중 및 고지혈증 초기 단계로 식이조절 및 운동 권고'
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
    aiSummary: '마른 비만으로 근육량 증가를 위한 운동 및 단백질 섭취 필요'
  },
  {
    id: '05550346',
    name: '박민수',
    gender: 'M',
    age: 38,
    birthDate: '1987-11-03',
    examDate: '2025-11-07',
    status: 'completed',
    generatedAt: '2025-11-07 16:45:30',
    aiSummary: '당뇨 전단계로 생활습관 개선 및 정기적인 혈당 모니터링 필요'
  },
  {
    id: '12345678',
    name: '최영희',
    gender: 'F',
    age: 52,
    birthDate: '1973-05-18',
    examDate: '2025-11-07',
    status: 'pending',
    generatedAt: null,
    aiSummary: null
  },
  {
    id: '23456789',
    name: '정태윤',
    gender: 'M',
    age: 41,
    birthDate: '1984-09-25',
    examDate: '2025-11-07',
    status: 'pending',
    generatedAt: null,
    aiSummary: null
  },
  {
    id: '34567890',
    name: '강수정',
    gender: 'F',
    age: 29,
    birthDate: '1996-12-08',
    examDate: '2025-11-07',
    status: 'pending',
    generatedAt: null,
    aiSummary: null
  }
];

// 유틸리티 함수들
export const getPatientById = (patientId: string): Patient | undefined => {
  return MOCK_PATIENTS.find(p => p.id === patientId);
};

export const getPatientsByDate = (date: string): Patient[] => {
  return MOCK_PATIENTS.filter(p => p.examDate === date);
};

export const getPatientsByStatus = (status: string): Patient[] => {
  if (status === '전체') return MOCK_PATIENTS;
  return MOCK_PATIENTS.filter(p => p.status === status);
};

export const searchPatients = (query: string): Patient[] => {
  const lowerQuery = query.toLowerCase();
  return MOCK_PATIENTS.filter(
    p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.id.includes(query)
  );
};

export const getStatistics = (): Statistics => {
  const total = MOCK_PATIENTS.length;
  const completed = MOCK_PATIENTS.filter(p => p.status === 'completed').length;
  const processing = MOCK_PATIENTS.filter(p => p.status === 'processing').length;
  const pending = MOCK_PATIENTS.filter(p => p.status === 'pending').length;

  return { total, completed, processing, pending };
};

export const getStatusText = (status: PatientStatus): string => {
  const statusMap: Record<PatientStatus, string> = {
    completed: '생성 완료',
    processing: '생성 중',
    pending: '생성 대기'
  };
  return statusMap[status];
};

export const getStatusClass = (status: PatientStatus): string => {
  return `status-${status}`;
};
