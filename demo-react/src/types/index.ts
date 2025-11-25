// 환자 상태 타입
export type PatientStatus = 'completed' | 'processing' | 'pending';

// 검사 결과 상태 타입
export type TestResultStatus = 'normal' | 'high' | 'low' | 'abnormal';

// 환자 정보 타입
export interface Patient {
  id: string;
  name: string;
  gender: 'M' | 'F';
  age: number;
  birthDate: string;
  examDate: string;
  status: PatientStatus;
  generatedAt: string | null;
  aiSummary: string | null;
}

// 검사 항목 결과 타입
export interface TestResultItem {
  name: string;
  value: string;
  unit: string;
  reference: string;
  status: TestResultStatus;
}

// 검사 그룹 타입
export interface TestResultGroup {
  groupName: string;
  results: TestResultItem[];
}

// 환자별 검사 결과 타입
export interface TestResults {
  groups: TestResultGroup[];
}

// AI 분석 결과 (종합소견) 타입
export interface ComprehensiveAnalysis {
  summary: string;
  generatedAt: string;
}

// AI 분석 결과 (그룹별) 타입
export interface AIAnalysisByGroup {
  [groupName: string]: string;
}

// AI 분석 결과 전체 타입
export interface AIAnalysis {
  comprehensive: ComprehensiveAnalysis;
  byGroup: AIAnalysisByGroup;
}

// 검사 그룹 정보 타입
export interface TestGroup {
  name: string;
  icon: string;
}

// 프롬프트 타입
export interface Prompts {
  master: string;
  tests: {
    [testName: string]: string;
  };
}

// 필터 옵션 타입
export interface FilterOptions {
  date: string;
  name: string;
  status: string;
}

// 통계 타입
export interface Statistics {
  total: number;
  completed: number;
  processing: number;
  pending: number;
}

// 페이지 타입
export type PageType = 'generation' | 'test-prompts' | 'summary-prompt';
