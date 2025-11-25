export interface Patient {
  id: string;
  name: string;
  gender: string;
  age: number;
  date: string;
  status: 'completed' | 'processing' | 'pending';
  generatedAt: string | null;
}

export interface TestResultItem {
  name: string;
  unit?: string;
  reference?: string;
  value: string;
  status: 'normal' | 'high' | 'low' | 'abnormal';
  note?: string;
}

export interface TestResults {
  [key: string]: TestResultItem[] | string; // key is category (blood, urine, etc.), value is array of items or text string
}

export interface PatientTestResults {
  [patientId: string]: TestResults;
}

export const samplePatients: Patient[] = [
  {
    id: '20251107-01869517',
    name: '홍길동', // Name not in JSON, using placeholder
    gender: 'M',    // Gender not in JSON, using placeholder
    age: 45,        // Age not in JSON, using placeholder
    date: '2025-11-07',
    status: 'completed',
    generatedAt: '2025-11-07 14:30'
  },
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
  // Case 1: Infection (High WBC, High CRP)
  {
    id: 'case-infection',
    name: '박감염',
    gender: 'M',
    age: 35,
    date: '2025-05-02',
    status: 'completed',
    generatedAt: '2025-05-02 10:00'
  },
  // Case 2: Anemia (Low Hb, Low Hct)
  {
    id: 'case-anemia',
    name: '이빈혈',
    gender: 'F',
    age: 28,
    date: '2025-05-02',
    status: 'completed',
    generatedAt: '2025-05-02 10:15'
  },
  // Case 3: Gout/Inflammation (High Uric Acid, High ESR)
  {
    id: 'case-gout',
    name: '최통풍',
    gender: 'M',
    age: 50,
    date: '2025-05-02',
    status: 'completed',
    generatedAt: '2025-05-02 10:30'
  },
  // Case 4: Normal (All Normal)
  {
    id: 'case-normal',
    name: '정상인',
    gender: 'F',
    age: 42,
    date: '2025-05-02',
    status: 'completed',
    generatedAt: '2025-05-02 10:45'
  },
  // Case 1: Infection (High WBC, High CRP)
  {
    id: 'case-infection',
    name: '박감염',
    gender: 'M',
    age: 35,
    date: '2025-05-02',
    status: 'completed',
    generatedAt: '2025-05-02 10:00'
  },
  // Case 2: Anemia (Low Hb, Low Hct)
  {
    id: 'case-anemia',
    name: '이빈혈',
    gender: 'F',
    age: 28,
    date: '2025-05-02',
    status: 'completed',
    generatedAt: '2025-05-02 10:15'
  },
  // Case 3: Gout/Inflammation (High Uric Acid, High ESR)
  {
    id: 'case-gout',
    name: '최통풍',
    gender: 'M',
    age: 50,
    date: '2025-05-02',
    status: 'completed',
    generatedAt: '2025-05-02 10:30'
  },
  // Case 4: Normal (All Normal)
  {
    id: 'case-normal',
    name: '정상인',
    gender: 'F',
    age: 42,
    date: '2025-05-02',
    status: 'completed',
    generatedAt: '2025-05-02 10:45'
  }
];

export const testTypes = [
  { id: 'basic', name: '신체계측', icon: 'fa-ruler-vertical' },
  { id: 'blood', name: '혈액검사', icon: 'fa-vial' },
  { id: 'urine', name: '소변검사', icon: 'fa-flask' },
  { id: 'liver', name: '간기능', icon: 'fa-procedures' }, // Added
  { id: 'lipid', name: '고지혈', icon: 'fa-burger' }, // Added
  { id: 'kidney', name: '신장기능', icon: 'fa-filter' }, // Added
  { id: 'glucose', name: '당뇨', icon: 'fa-candy-cane' }, // Added
  { id: 'thyroid', name: '갑상선', icon: 'fa-butterfly' }, // Added
  { id: 'tumor', name: '종양표지자', icon: 'fa-disease' }, // Added
  { id: 'xray', name: '흉부촬영', icon: 'fa-x-ray' },
  { id: 'ultrasound', name: '초음파검사', icon: 'fa-wave-square' },
  { id: 'endoscopy', name: '내시경검사', icon: 'fa-microscope' },
  { id: 'ecg', name: '심전도', icon: 'fa-heartbeat' },
  { id: 'eye', name: '안과검사', icon: 'fa-eye' },
  { id: 'hearing', name: '청력검사', icon: 'fa-ear-listen' },
  { id: 'mammography', name: '유방촬영', icon: 'fa-user-nurse' },
  { id: 'ct', name: 'CT검사', icon: 'fa-ring' } // Added
];

export const samplePrompts: { [key: string]: string } = {
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

export const masterPrompt = `아래는 환자의 종합건강검진 결과입니다. 각 검사별 AI 분석 결과를 종합하여 전체적인 건강 상태를 평가하고, 주요 소견과 권고사항을 포함한 종합소견을 작성하세요.

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

export const sampleTestResults: PatientTestResults = {
  '20251107-01869517': {
    basic: [
      { name: '체성분측정', value: '-', unit: '', reference: '-', status: 'normal' },
      { name: '신장', value: '167', unit: 'cm', reference: '-', status: 'normal' },
      { name: '체중', value: '69.7', unit: 'kg', reference: '-', status: 'normal' },
      { name: '적정체중', value: '63.8', unit: 'kg', reference: '-', status: 'normal' },
      { name: '체질량지수(BMI)', value: '25', unit: 'kg/m2', reference: '18.5~22.9', status: 'high' },
      { name: '체지방율', value: '22.2', unit: '%', reference: '11~20', status: 'high' },
      { name: '허리둘레', value: '89', unit: 'cm', reference: '0~90', status: 'normal' }
    ],
    blood: [ // Combined '혈압' and '혈액검사' for simplicity or keep separate if UI supports it. Keeping separate based on keys.
      // Actually 'blood' usually refers to CBC. 'basic' has BP in previous dummy data.
      // Let's map '혈압' group to 'basic' or a new 'bp' group?
      // Previous dummy data put BP in 'basic'. Let's append BP to 'basic' for consistency with previous structure.
    ],
    // Re-mapping based on JSON content provided in context
    // Group: 혈압 -> Merged into basic for display consistency with previous dummy data
    // Group: 소변검사 -> urine
    urine: [
      { name: '요산도(PH)', value: '7.0', unit: '', reference: '5.0~7.0', status: 'normal' },
      { name: '요단백검사(Protein)', value: '±', unit: '', reference: '-', status: 'abnormal' },
      { name: '요당(Glucose)', value: '-', unit: '', reference: '-', status: 'normal' },
      { name: '케톤체(Ketone)', value: '-', unit: '', reference: '-', status: 'normal' },
      { name: '요잠혈(Occult Blood)', value: '-', unit: '', reference: '-', status: 'normal' },
      { name: '요비중', value: '1.023', unit: '', reference: '1.005~1.030', status: 'normal' }
    ],
    // Group: 혈액검사 -> blood
    blood_cbc: [ // Renaming to avoid conflict if we want to separate. But UI expects 'blood'.
      { name: '백혈구(WBC)', value: '6.36', unit: '×10³/㎕', reference: '4.0~10.0', status: 'normal' },
      { name: '적혈구(RBC)', value: '5.19', unit: '×10^6/㎕', reference: '4.2~6.3', status: 'normal' },
      { name: 'Hb(혈색소)', value: '15.3', unit: 'g/dL', reference: '13.0~17.0', status: 'normal' },
      { name: '적혈구용적(Hematocrit)', value: '45.8', unit: '%', reference: '39.0~52.0', status: 'normal' },
      { name: '혈소판', value: '325', unit: '×10³/㎕', reference: '130~350', status: 'normal' },
      { name: '호중구(Neutrophils)', value: '51.0', unit: '%', reference: '40.0~60.0', status: 'normal' },
      { name: '임파구(Lymphocytes)', value: '37.0', unit: '%', reference: '20.0~50.0', status: 'normal' },
      { name: 'ESR(적혈구침강속도)', value: '12', unit: 'mm/h', reference: '0~15', status: 'normal' }
    ],
    // Group: 당뇨검사 -> glucose
    glucose: [
      { name: 'Glucose(공복혈당)', value: '106', unit: 'mg/dl', reference: '< 100', status: 'high' },
      { name: '당화혈색소', value: '6.5', unit: '', reference: '4.5~5.8', status: 'high' }
    ],
    // Group: 간 및 신장 기능검사 -> Split into liver and kidney
    liver: [
      { name: 'Total Protein(총단백)', value: '7.3', unit: 'g/dl', reference: '6.6~8.7', status: 'normal' },
      { name: 'Albumin(알부민)', value: '5.0', unit: 'g/dl', reference: '3.5~5.2', status: 'normal' },
      { name: 'AST(SGOT)', value: '28', unit: 'U/L', reference: 'F<32', status: 'normal' },
      { name: 'ALT(SGPT)', value: '34', unit: 'U/L', reference: 'F<33', status: 'high' },
      { name: 'GGT(γ-GTP)', value: '22', unit: 'U/L', reference: '10~71', status: 'normal' },
      { name: '총빌리루빈', value: '1.1', unit: 'mg/dl', reference: '< 1.2', status: 'normal' },
      { name: 'ALP(알카리포스파타제)', value: '66', unit: 'U/L', reference: '35-104', status: 'normal' }
    ],
    kidney: [
      { name: 'BUN(요소질소)', value: '21', unit: 'mg/dl', reference: '6~20', status: 'high' },
      { name: 'Creatinine(크레아티닌)', value: '0.90', unit: 'mg/dl', reference: '0.70~1.20', status: 'normal' },
      { name: 'CKD-EPI-eGFR', value: '98.39', unit: 'mL/min/1.73m2', reference: '>60', status: 'normal' }
    ],
    // Group: 고지혈검사 -> lipid
    lipid: [
      { name: '총콜레스테롤', value: '143', unit: 'mg/dl', reference: '<200', status: 'normal' },
      { name: 'HDL 콜레스테롤', value: '64', unit: 'mg/dl', reference: 'Low<40, High>60', status: 'normal' },
      { name: 'LDL-콜레스테롤', value: '68', unit: 'mg/dl', reference: '< 130', status: 'normal' },
      { name: '중성지방(TG)', value: '111', unit: 'mg/dl', reference: '< 150', status: 'normal' }
    ],
    // Group: 갑상선 검사 -> thyroid
    thyroid: [
      { name: 'TSH(갑상선자극호르몬)', value: '0.770', unit: 'μIU/mL', reference: '0.35~4.94', status: 'normal' },
      { name: 'Free T4', value: '0.99', unit: 'ng/dL', reference: '0.70~1.48', status: 'normal' }
    ],
    // Group: 특수혈액검사(종양표지자) -> tumor
    tumor: [
      { name: 'AFP', value: '< 1.82', unit: 'ng/mL', reference: '<8.0', status: 'normal' },
      { name: 'CEA', value: '3.8', unit: 'ng/mL', reference: '<5.0', status: 'normal' },
      { name: 'CA 19-9', value: '5.4', unit: 'U/mL', reference: '<37', status: 'normal' },
      { name: 'PSA(남)', value: '2.706', unit: 'ng/mL', reference: '<3.0', status: 'normal' }
    ],
    // Text Results
    eye: `안저촬영: 우안 망막 드루젠 소견 관찰됩니다. 시력적으로 불편하시면 망막 분과 진료 받아보십시오.`,
    hearing: `청력검사 PTA(puretone audiometry): 양측 경도난청`,
    xray: `흉부촬영PA: No active lung lesion. Normal shape and size of heart. 정상입니다`,
    ultrasound: `상복부 초음파:
* 복강내 가스와 지방의 정도, 장기의 위치로 인해 평가에 제한이 존재합니다. (특히 췌장,총담관,간)증상이 있을시 추가적인 평가를 권장합니다.

경도 지방간
간 좌엽 다수의 낭종들

담낭 절제 상태

양측 신장에 석회화들을 동반한 다수의 신장 낭종들 (< 1.5cm) 
좌측 신장에 결석 의심 (6mm)`,
    endoscopy: `상부위내시경: 1. Atrophic gastritis with intestinal metaplasia (장상피화생을 동반한 위축성 위염)`,
    ct: `저선량폐CT:
* 2015년 저선량 폐 CT 검사와 비교

좌상엽에 작은 결절, 변화없음, 양성으로 보임
양측 폐에 다수의 국소 늑막하 섬유화
우상엽에 국소 폐기종

=> 1년 후 저선량 폐 CT 추적검사 요함

좌측전하행동맥 관상동맥 석회화 
심장칼슘스코어링CT 검사 요함

담낭 절제 상태`,
    ecg: `심전도(EKG): 정상입니다`
  },
  '66666666': {
    // Mapped from 20251107-01869517_converted_results.json
    basic: [
      { name: '신장', value: '167', unit: 'cm', reference: '-', status: 'normal' },
      { name: '체중', value: '69.7', unit: 'kg', reference: '-', status: 'normal' },
      { name: '체질량지수(BMI)', value: '25', unit: 'kg/m2', reference: '18.5~22.9', status: 'high' },
      { name: '체지방율', value: '22.2', unit: '%', reference: '11~20', status: 'high' },
      { name: '허리둘레', value: '89', unit: 'cm', reference: '0~90', status: 'normal' },
      { name: '혈압(수축기)', value: '132', unit: 'mmHg', reference: '100~140', status: 'normal' },
      { name: '혈압(이완기)', value: '79', unit: 'mmHg', reference: '60~90', status: 'normal' }
    ],
    blood: [
      { name: '백혈구(WBC)', unit: '×10³/㎕', reference: '4.0~10.0', value: '6.36', status: 'normal' },
      { name: '적혈구(RBC)', unit: '×10^6/㎕', reference: '4.2~6.3', value: '5.19', status: 'normal' },
      { name: 'Hb(혈색소)', unit: 'g/dL', reference: '13.0~17.0', value: '15.3', status: 'normal' },
      { name: '적혈구용적(Hct)', unit: '%', reference: '39.0~52.0', value: '45.8', status: 'normal' },
      { name: '혈소판', unit: '×10³/㎕', reference: '130~350', value: '325', status: 'normal' },
      { name: '호중구', unit: '%', reference: '40.0~60.0', value: '51.0', status: 'normal' },
      { name: '임파구', unit: '%', reference: '20.0~50.0', value: '37.0', status: 'normal' },
      { name: 'ESR', unit: 'mm/h', reference: '0~15', value: '12', status: 'normal' }
    ],
    lipid: [
      { name: '총콜레스테롤', unit: 'mg/dL', reference: '<200', value: '143', status: 'normal' },
      { name: 'HDL 콜레스테롤', unit: 'mg/dL', reference: 'Low<40, High>60', value: '64', status: 'normal' },
      { name: 'LDL 콜레스테롤', unit: 'mg/dL', reference: '<130', value: '68', status: 'normal' },
      { name: '중성지방(TG)', unit: 'mg/dL', reference: '<150', value: '111', status: 'normal' }
    ],
    liver: [
      { name: 'AST(SGOT)', unit: 'U/L', reference: 'F<32', value: '28', status: 'normal' },
      { name: 'ALT(SGPT)', unit: 'U/L', reference: 'F<33', value: '34', status: 'high' },
      { name: 'GGT(γ-GTP)', unit: 'U/L', reference: '10~71', value: '22', status: 'normal' },
      { name: '총빌리루빈', unit: 'mg/dL', reference: '<1.2', value: '1.1', status: 'normal' },
      { name: 'ALP', unit: 'U/L', reference: '35-104', value: '66', status: 'normal' },
      { name: '총단백', unit: 'g/dl', reference: '6.6~8.7', value: '7.3', status: 'normal' },
      { name: '알부민', unit: 'g/dl', reference: '3.5~5.2', value: '5.0', status: 'normal' }
    ],
    kidney: [
      { name: 'BUN(요소질소)', unit: 'mg/dL', reference: '6~20', value: '21', status: 'high' },
      { name: 'Creatinine', unit: 'mg/dL', reference: '0.70~1.20', value: '0.90', status: 'normal' },
      { name: 'eGFR', unit: 'mL/min/1.73m²', reference: '>60', value: '98.39', status: 'normal' }
    ],
    glucose: [
      { name: 'Glucose(공복혈당)', unit: 'mg/dL', reference: '<100', value: '106', status: 'high' },
      { name: '당화혈색소', unit: '%', reference: '4.5~5.8', value: '6.5', status: 'high' }
    ],
    thyroid: [
      { name: 'TSH', unit: 'μIU/mL', reference: '0.35~4.94', value: '0.770', status: 'normal' },
      { name: 'Free T4', unit: 'ng/dL', reference: '0.70~1.48', value: '0.99', status: 'normal' }
    ],
    urine: [
      { name: '요산도(PH)', reference: '5.0~7.0', value: '7.0', status: 'normal' },
      { name: '요단백', reference: '-', value: '±', status: 'abnormal' },
      { name: '요당', reference: '-', value: '-', status: 'normal' },
      { name: '케톤체', reference: '-', value: '-', status: 'normal' },
      { name: '요잠혈', reference: '-', value: '-', status: 'normal' },
      { name: '요비중', reference: '1.005~1.030', value: '1.023', status: 'normal' }
    ],
    tumor: [
      { name: 'AFP', unit: 'ng/mL', reference: '<8.0', value: '< 1.82', status: 'normal' },
      { name: 'CEA', unit: 'ng/mL', reference: '<5.0', value: '3.8', status: 'normal' },
      { name: 'CA 19-9', unit: 'U/mL', reference: '<37', value: '5.4', status: 'normal' },
      { name: 'PSA(남)', unit: 'ng/mL', reference: '<3.0', value: '2.706', status: 'normal' }
    ],
    xray: '흉부촬영 PA: No active lung lesion. Normal shape and size of heart. 정상입니다.',
    ultrasound: `상복부 초음파:
* 복강내 가스와 지방의 정도, 장기의 위치로 인해 평가에 제한이 존재합니다. (특히 췌장,총담관,간)증상이 있을시 추가적인 평가를 권장합니다.

경도 지방간
간 좌엽 다수의 낭종들

담낭 절제 상태

양측 신장에 석회화들을 동반한 다수의 신장 낭종들 (< 1.5cm) 
좌측 신장에 결석 의심 (6mm)`,
    ecg: '심전도(EKG): 정상입니다',
    eye: '안저촬영: 우안 망막 드루젠 소견 관찰됩니다. 시력적으로 불편하시면 망막 분과 진료 받아보십시오.',
    hearing: '청력검사 PTA: 양측 경도난청',
    endoscopy: '상부위내시경: 1. Atrophic gastritis with intestinal metaplasia (장상피화생을 동반한 위축성 위염)',
    ct: `저선량폐CT:
* 2015년 저선량 폐 CT 검사와 비교

좌상엽에 작은 결절, 변화없음, 양성으로 보임
양측 폐에 다수의 국소 늑막하 섬유화
우상엽에 국소 폐기종

=> 1년 후 저선량 폐 CT 추적검사 요함

좌측전하행동맥 관상동맥 석회화 
심장칼슘스코어링CT 검사 요함

담낭 절제 상태`
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
  },
  'case-infection': {
    blood: [
      { name: '백혈구(WBC)', unit: '×10³/㎕', reference: '4.0~10.0', value: '12.5', status: 'high' },
      { name: '적혈구(RBC)', unit: '×10^6/㎕', reference: '4.2~6.3', value: '4.8', status: 'normal' },
      { name: 'Hb(혈색소)', unit: 'g/dL', reference: '13.0~17.0', value: '14.2', status: 'normal' },
      { name: '혈소판', unit: '×10³/㎕', reference: '130~350', value: '280', status: 'normal' },
      { name: 'CRP', unit: 'mg/dL', reference: '<0.5', value: '2.5', status: 'high' },
      { name: 'ESR', unit: 'mm/h', reference: '0~15', value: '25', status: 'high' }
    ]
  },
  'case-anemia': {
    blood: [
      { name: '백혈구(WBC)', unit: '×10³/㎕', reference: '4.0~10.0', value: '5.2', status: 'normal' },
      { name: '적혈구(RBC)', unit: '×10^6/㎕', reference: '4.0~5.4', value: '3.5', status: 'low' },
      { name: 'Hb(혈색소)', unit: 'g/dL', reference: '12.0~16.0', value: '9.8', status: 'low' },
      { name: '적혈구용적(Hct)', unit: '%', reference: '36.0~48.0', value: '30.5', status: 'low' },
      { name: '혈소판', unit: '×10³/㎕', reference: '130~350', value: '210', status: 'normal' },
      { name: 'Ferritin', unit: 'ng/mL', reference: '13~150', value: '8.5', status: 'low' }
    ]
  },
  'case-gout': {
    blood: [
      { name: '백혈구(WBC)', unit: '×10³/㎕', reference: '4.0~10.0', value: '7.5', status: 'normal' },
      { name: 'Hb(혈색소)', unit: 'g/dL', reference: '13.0~17.0', value: '15.5', status: 'normal' },
      { name: '요산(Uric Acid)', unit: 'mg/dL', reference: '2.5~7.0', value: '9.2', status: 'high' },
      { name: 'ESR', unit: 'mm/h', reference: '0~15', value: '45', status: 'high' },
      { name: 'CRP', unit: 'mg/dL', reference: '<0.5', value: '1.2', status: 'high' }
    ]
  },
  'case-normal': {
    blood: [
      { name: '백혈구(WBC)', unit: '×10³/㎕', reference: '4.0~10.0', value: '6.5', status: 'normal' },
      { name: '적혈구(RBC)', unit: '×10^6/㎕', reference: '4.0~5.4', value: '4.8', status: 'normal' },
      { name: 'Hb(혈색소)', unit: 'g/dL', reference: '12.0~16.0', value: '13.5', status: 'normal' },
      { name: '적혈구용적(Hct)', unit: '%', reference: '36.0~48.0', value: '41.0', status: 'normal' },
      { name: '혈소판', unit: '×10³/㎕', reference: '130~350', value: '250', status: 'normal' },
      { name: '호중구', unit: '%', reference: '40.0~60.0', value: '55.0', status: 'normal' },
      { name: 'ESR', unit: 'mm/h', reference: '0~20', value: '8', status: 'normal' },
      { name: '요산(Uric Acid)', unit: 'mg/dL', reference: '2.5~7.0', value: '4.5', status: 'normal' }
    ]
  }
};

export const sampleAiSummaries: { [patientId: string]: { [category: string]: string } } = {
  '66666666': {
    blood: `혈액검사 결과 호중구가 78.5%로 참고치(40-60%) 범위를 벗어나 증가되어 있으며, 임파구는 15.0%로 감소되어 있습니다. 이는 스트레스, 급성 염증 또는 최근 감염의 가능성을 시사합니다. 3개월 후 추적 혈액검사로 호중구/임파구 비율 재확인을 권장합니다.`,
    lipid: `총콜레스테롤 216 mg/dL로 경도 상승(정상 <200)되어 있어 고지혈증 초기 단계로 판단됩니다. 다만 HDL 콜레스테롤이 104로 높은 편이어서 심혈관질환 위험도는 상대적으로 낮습니다. 저지방 식이 및 규칙적인 운동을 통한 관리를 권장하며, 6개월 후 추적검사가 필요합니다.`,
    ultrasound: `담낭 절제술 이후의 상태로 특이 소견은 관찰되지 않습니다. 다만 검사의 제한점을 고려하여 복부 불편감이나 소화기 증상이 있을 경우 추가 정밀검사를 받으시기 바랍니다.

우측 유방에서 관찰되는 낭종들과 유방촬영에서의 비대칭 소견은 양성 병변일 가능성이 높으나, 확진을 위해서는 유방외과 전문의 진료가 필요합니다. Category 3 병변은 악성 가능성이 2% 미만이나, 조기 추적 관찰이 중요합니다. 반드시 유방외과 진료를 받으시고, 6개월 후 추적 초음파 검사 일정을 잡으시기 바랍니다.`,
    xray: `치밀 유방은 한국 여성에서 흔하게 나타나는 소견으로, 유방촬영만으로는 병변 발견이 어려울 수 있어 초음파 검사가 필수적입니다. 우측 유방의 비대칭 소견은 초음파에서 확인된 낭종들과 연관이 있을 것으로 판단되나, 정확한 평가를 위해 추가 영상검사가 필요합니다. 유방외과에서 국소 압박촬영과 전문의 판독을 받으시기 바랍니다.`
  }
};

export const sampleComprehensiveSummary: { [patientId: string]: string } = {
  '66666666': `검진자분 건강검진 결과 요약

**I. 가장 시급하게 전문의 진료 및 관리 필요한 항목 (빨간불!)**
• **유방 초음파 (유방 결절 및 낭종)** — 우측 유방 유륜하부 근처에 다수의 낭종(6mm)과 유방촬영상 비대칭 소견에 해당하는 병변이 의심됩니다. 또한 좌측 유방에도 저에코성 결절이 관찰됩니다.
  <권고> 유방외과 전문의 진료 및 6개월 후 추적 초음파 검사 필수
• **유방촬영 (치밀유방 및 비대칭)** — 치밀유방 소견과 함께 우측 유방 중심부에 비대칭 음영이 관찰됩니다. 초음파 소견과 연계하여 확인이 필요합니다.
  <권고> 유방외과 진료 및 국소 압박촬영 등 추가 정밀검사 상담

**II. 추가 진료 및 확인이 필요한 항목**
• **혈액검사 (호중구 증가/임파구 감소)** — 호중구 분율이 78.5%로 증가하고 임파구가 15.0%로 감소했습니다. 급성 염증이나 스트레스 반응일 수 있습니다.
  <권고> 3개월 후 혈액검사 재검사 (호중구/임파구 비율 확인)
• **고지혈검사 (총콜레스테롤 상승)** — 총콜레스테롤이 216 mg/dL로 경계치 이상입니다. 다만 HDL(좋은 콜레스테롤)이 104 mg/dL로 매우 높아 심혈관 위험도는 낮습니다.
  <권고> 저지방 식이조절 및 규칙적인 유산소 운동, 6개월 후 고지혈증 검사
• **신체계측 (과체중 및 복부비만)** — BMI 24.9로 과체중이며, 허리둘레가 93cm로 복부비만에 해당합니다. 대사증후군 위험을 높일 수 있습니다.
  <권고> 체중 감량(현 체중의 5~10%) 및 복부 근력 운동
• **혈압 (고혈압 전단계)** — 혈압이 133/76 mmHg로 고혈압 전단계입니다.
  <권고> 가정 혈압 측정 및 염분 섭취 줄이기

**III. 검진자분께 드리는 조언**
전반적으로 유방 관련 소견에 대해 가장 우선적인 확인이 필요합니다. 유방외과 진료를 통해 정확한 상태를 파악하고 불안감을 해소하시기 바랍니다.
혈액검사상의 염증 수치 변화나 고지혈증 소견은 생활습관 교정과 추적 관찰로 충분히 관리가 가능한 수준입니다. 특히 HDL 콜레스테롤 수치가 높은 점은 긍정적입니다.
체중과 복부비만 관리를 위해 하루 30분 이상 빠르게 걷기와 같은 유산소 운동을 생활화하시고, 기름진 음식 섭취를 줄이는 식습관 개선을 권장합니다.`
};
