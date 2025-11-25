import type { TestResults } from '../types';

// Mock 검사 결과 데이터
export const MOCK_TEST_RESULTS: Record<string, TestResults> = {
  '01869517': {
    groups: [
      {
        groupName: '신체계측',
        results: [
          { name: '신장', value: '167', unit: 'cm', reference: '-', status: 'normal' },
          { name: '체중', value: '69.7', unit: 'kg', reference: '-', status: 'normal' },
          { name: '체질량지수(BMI)', value: '25.0', unit: 'kg/m2', reference: '18.5~22.9', status: 'high' },
          { name: '체지방율', value: '22.2', unit: '%', reference: '11~20', status: 'high' },
          { name: '허리둘레', value: '89', unit: 'cm', reference: '0~90', status: 'normal' }
        ]
      },
      {
        groupName: '혈압',
        results: [
          { name: '혈압(수축기)', value: '132', unit: 'mmHg', reference: '100~140', status: 'normal' },
          { name: '혈압(이완기)', value: '79', unit: 'mmHg', reference: '60~90', status: 'normal' },
          { name: '맥박', value: '73', unit: '', reference: '60~100', status: 'normal' }
        ]
      },
      {
        groupName: '혈액검사',
        results: [
          { name: '백혈구(WBC)', value: '6.8', unit: '×10³/㎕', reference: '4.0~10.0', status: 'normal' },
          { name: '적혈구(RBC)', value: '5.2', unit: '×10⁶/㎕', reference: '4.0~5.4', status: 'normal' },
          { name: 'Hb(혈색소)', value: '15.2', unit: 'g/dL', reference: '12.0~16.0', status: 'normal' },
          { name: '혈소판', value: '235', unit: '×10³/㎕', reference: '150~450', status: 'normal' }
        ]
      },
      {
        groupName: '간기능검사',
        results: [
          { name: 'AST', value: '28', unit: 'U/L', reference: '0~40', status: 'normal' },
          { name: 'ALT', value: '32', unit: 'U/L', reference: '0~40', status: 'normal' },
          { name: 'r-GTP', value: '35', unit: 'U/L', reference: '0~50', status: 'normal' }
        ]
      },
      {
        groupName: '신기능검사',
        results: [
          { name: 'BUN', value: '15', unit: 'mg/dL', reference: '8~20', status: 'normal' },
          { name: 'Creatinine', value: '1.0', unit: 'mg/dL', reference: '0.6~1.2', status: 'normal' }
        ]
      },
      {
        groupName: '고지혈검사',
        results: [
          { name: '총콜레스테롤', value: '210', unit: 'mg/dL', reference: '<200', status: 'high' },
          { name: 'HDL 콜레스테롤', value: '48', unit: 'mg/dL', reference: '>40', status: 'normal' },
          { name: 'LDL 콜레스테롤', value: '135', unit: 'mg/dL', reference: '<130', status: 'high' },
          { name: '중성지방(TG)', value: '145', unit: 'mg/dL', reference: '<150', status: 'normal' }
        ]
      },
      {
        groupName: '당뇨검사',
        results: [
          { name: '공복혈당', value: '98', unit: 'mg/dL', reference: '70~100', status: 'normal' },
          { name: 'HbA1c', value: '5.6', unit: '%', reference: '4.0~5.6', status: 'normal' }
        ]
      }
    ]
  },
  '04739580': {
    groups: [
      {
        groupName: '신체계측',
        results: [
          { name: '신장', value: '165', unit: 'cm', reference: '-', status: 'normal' },
          { name: '체중', value: '49.8', unit: 'kg', reference: '-', status: 'normal' },
          { name: '체질량지수(BMI)', value: '18.3', unit: 'kg/m2', reference: '18.5~22.9', status: 'low' },
          { name: '체지방율', value: '31.2', unit: '%', reference: '21~30', status: 'high' },
          { name: '허리둘레', value: '68', unit: 'cm', reference: '0~85', status: 'normal' }
        ]
      },
      {
        groupName: '혈압',
        results: [
          { name: '혈압(수축기)', value: '108', unit: 'mmHg', reference: '100~140', status: 'normal' },
          { name: '혈압(이완기)', value: '68', unit: 'mmHg', reference: '60~90', status: 'normal' },
          { name: '맥박', value: '65', unit: '', reference: '60~100', status: 'normal' }
        ]
      },
      {
        groupName: '혈액검사',
        results: [
          { name: '백혈구(WBC)', value: '5.2', unit: '×10³/㎕', reference: '4.0~10.0', status: 'normal' },
          { name: '적혈구(RBC)', value: '4.3', unit: '×10⁶/㎕', reference: '4.0~5.4', status: 'normal' },
          { name: 'Hb(혈색소)', value: '12.5', unit: 'g/dL', reference: '12.0~16.0', status: 'normal' },
          { name: '혈소판', value: '198', unit: '×10³/㎕', reference: '150~450', status: 'normal' }
        ]
      },
      {
        groupName: '갑상선기능검사',
        results: [
          { name: 'TSH', value: '2.8', unit: 'μIU/mL', reference: '0.4~4.0', status: 'normal' },
          { name: 'Free T4', value: '1.2', unit: 'ng/dL', reference: '0.8~1.8', status: 'normal' }
        ]
      }
    ]
  },
  '05550346': {
    groups: [
      {
        groupName: '신체계측',
        results: [
          { name: '신장', value: '172', unit: 'cm', reference: '-', status: 'normal' },
          { name: '체중', value: '78.5', unit: 'kg', reference: '-', status: 'normal' },
          { name: '체질량지수(BMI)', value: '26.5', unit: 'kg/m2', reference: '18.5~22.9', status: 'high' },
          { name: '체지방율', value: '25.8', unit: '%', reference: '11~20', status: 'high' },
          { name: '허리둘레', value: '95', unit: 'cm', reference: '0~90', status: 'high' }
        ]
      },
      {
        groupName: '혈압',
        results: [
          { name: '혈압(수축기)', value: '138', unit: 'mmHg', reference: '100~140', status: 'normal' },
          { name: '혈압(이완기)', value: '88', unit: 'mmHg', reference: '60~90', status: 'normal' },
          { name: '맥박', value: '78', unit: '', reference: '60~100', status: 'normal' }
        ]
      },
      {
        groupName: '혈액검사',
        results: [
          { name: '백혈구(WBC)', value: '7.2', unit: '×10³/㎕', reference: '4.0~10.0', status: 'normal' },
          { name: '적혈구(RBC)', value: '5.0', unit: '×10⁶/㎕', reference: '4.0~5.4', status: 'normal' },
          { name: 'Hb(혈색소)', value: '14.8', unit: 'g/dL', reference: '12.0~16.0', status: 'normal' },
          { name: '혈소판', value: '220', unit: '×10³/㎕', reference: '150~450', status: 'normal' }
        ]
      },
      {
        groupName: '간기능검사',
        results: [
          { name: 'AST', value: '38', unit: 'U/L', reference: '0~40', status: 'normal' },
          { name: 'ALT', value: '45', unit: 'U/L', reference: '0~40', status: 'high' },
          { name: 'r-GTP', value: '52', unit: 'U/L', reference: '0~50', status: 'high' }
        ]
      },
      {
        groupName: '신기능검사',
        results: [
          { name: 'BUN', value: '18', unit: 'mg/dL', reference: '8~20', status: 'normal' },
          { name: 'Creatinine', value: '1.1', unit: 'mg/dL', reference: '0.6~1.2', status: 'normal' }
        ]
      },
      {
        groupName: '고지혈검사',
        results: [
          { name: '총콜레스테롤', value: '195', unit: 'mg/dL', reference: '<200', status: 'normal' },
          { name: 'HDL 콜레스테롤', value: '45', unit: 'mg/dL', reference: '>40', status: 'normal' },
          { name: 'LDL 콜레스테롤', value: '125', unit: 'mg/dL', reference: '<130', status: 'normal' },
          { name: '중성지방(TG)', value: '160', unit: 'mg/dL', reference: '<150', status: 'high' }
        ]
      },
      {
        groupName: '당뇨검사',
        results: [
          { name: '공복혈당', value: '108', unit: 'mg/dL', reference: '70~100', status: 'high' },
          { name: 'HbA1c', value: '5.9', unit: '%', reference: '4.0~5.6', status: 'high' }
        ]
      }
    ]
  }
};

// 유틸리티 함수
export const getTestResults = (patientId: string): TestResults | null => {
  return MOCK_TEST_RESULTS[patientId] || null;
};

export const getTestResultsByGroup = (
  patientId: string,
  groupName: string
): TestResults['groups'][0] | null => {
  const results = MOCK_TEST_RESULTS[patientId];
  if (!results) return null;

  return results.groups.find(g => g.groupName === groupName) || null;
};
