import { create } from 'zustand';
import type { Patient, FilterOptions, PageType } from '../types';
import { MOCK_PATIENTS } from '../data/patients';

interface AppState {
  // 현재 페이지
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;

  // 필터 옵션
  filters: FilterOptions;
  setFilters: (filters: Partial<FilterOptions>) => void;
  resetFilters: () => void;

  // 선택된 검사 그룹 (검사별 프롬프트 페이지)
  selectedTestGroup: string;
  setSelectedTestGroup: (testGroup: string) => void;

  // 선택된 환자 (테스트용)
  selectedPatientId: string;
  setSelectedPatientId: (patientId: string) => void;

  // 프로세싱 모달
  isProcessing: boolean;
  processingProgress: number;
  setProcessing: (isProcessing: boolean, progress?: number) => void;

  // 필터링된 환자 목록
  getFilteredPatients: () => Patient[];
}

const initialFilters: FilterOptions = {
  date: '2025-11-07',
  name: '',
  status: '전체'
};

export const useAppStore = create<AppState>((set, get) => ({
  // 초기 상태
  currentPage: 'generation',
  filters: initialFilters,
  selectedTestGroup: '신체계측',
  selectedPatientId: '',
  isProcessing: false,
  processingProgress: 0,

  // 액션
  setCurrentPage: (page) => set({ currentPage: page }),

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    })),

  resetFilters: () => set({ filters: initialFilters }),

  setSelectedTestGroup: (testGroup) => set({ selectedTestGroup: testGroup }),

  setSelectedPatientId: (patientId) => set({ selectedPatientId: patientId }),

  setProcessing: (isProcessing, progress = 0) =>
    set({ isProcessing, processingProgress: progress }),

  getFilteredPatients: () => {
    const { filters } = get();
    let filtered = [...MOCK_PATIENTS];

    // 날짜 필터
    if (filters.date) {
      filtered = filtered.filter((p) => p.examDate === filters.date);
    }

    // 이름/등록번호 검색
    if (filters.name) {
      const query = filters.name.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.id.includes(filters.name)
      );
    }

    // 상태 필터
    if (filters.status !== '전체') {
      const statusMap: Record<string, string> = {
        '생성 완료': 'completed',
        '생성 중': 'processing',
        '생성 대기': 'pending'
      };
      const status = statusMap[filters.status];
      if (status) {
        filtered = filtered.filter((p) => p.status === status);
      }
    }

    return filtered;
  }
}));
