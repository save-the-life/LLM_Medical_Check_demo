import type { Patient, TestResultItem } from '../data/dummyData';

interface PromptTemplate {
  base: string;
  hints: string;
  defaultHint: string;
}

// Default templates mimicking the logic in BatchBusiness.java
// Since we don't have DB access, we define them here.
const DEFAULT_TEMPLATES: PromptTemplate & { bloodHints: string } = {
  base: `
[역할]
당신은 종합건강검진 결과를 분석하는 전문 의료 AI입니다.

[검사 항목: {category}]
[검사 일자: {measured_at}]

[환자 정보]
{patient_info}

[검사 결과]
{results}

[임상적 힌트]
{hints}

[지시사항]
위 검사 결과를 바탕으로 환자의 상태를 분석하고, 다음 항목을 포함하여 소견을 작성하세요:
1. 결과의 임상적 의미 (정상/비정상 여부 포함)
2. 이상 소견이 있을 경우 가능한 원인 및 위험 요인
3. 추가 검사나 진료가 필요한 경우 구체적인 권고
4. 생활습관 개선을 위한 조언
5. 답변은 JSON 형식이 아닌, 환자가 이해하기 쉬운 줄글 형태로 작성하세요.
`,
  hints: `
- 정상 범위 내의 결과라도 경계치에 있거나 다른 결과와 연관성이 있다면 언급하세요.
- 전문 용어는 괄호 안에 설명을 덧붙여 이해를 도우세요.
- 환자를 안심시키되, 필요한 조치는 명확하게 전달하세요.
`,
  defaultHint: `
- 특이 소견이 없는 경우 "특이 소견 없습니다."라고 명시하세요.
- 전반적인 건강 상태 유지를 위한 일반적인 조언을 포함하세요.
`,
  bloodHints: `
- 백혈구 (WBC)
  * ≤4.0 → 백혈구 저하
    - 멘트: 백혈구 수치 저하소견입니다. 추후관리를 위해 혈액내과 진료 권고.
  * ≥10.0 → 백혈구 상승
    - 멘트: 백혈구 상승소견 입니다. 추후관리를 위해 혈액내과 진료 권고.

- 적혈구 (RBC)
  * 설명: 직접 기준 언급 없음 (Hb/Hct와 연계하여 빈혈 판정)

- 혈색소 (Hb)
  * 남<13 / 여<12 → 혈색소 수치 저하
    - 멘트:
      · 혈색소 수치 저하소견입니다. 추후관리를 위해 혈액내과 진료를 받으시기 바랍니다.
      · 빈혈 수치가 약간 감소되어 있습니다. 여성에서 빈혈은 편식, 위장관 출혈(치질 포함), 과다한 생리량으로 인해 발생할 수 있습니다.
      · 어지럼증 등 빈혈 증상이 지속되면 정밀검사와 치료를 위해 혈액내과(혈액종양내과) 진료 권고.
  * 남≥17 / 여≥16 → 혈색소 수치 상승
    - 멘트: 혈색소 수치 상승소견입니다. 추후관리를 위해 혈액내과 진료를 받으시기 바랍니다.

- 적혈구용적 (Hematocrit, Hct)
  * 남≥52 / 여≥48 → 적혈구용적율 상승
    - 멘트: 적혈구용적율 상승소견 입니다. 추후관리를 위해 혈액내과 진료를 받으시기 바랍니다.

- 혈소판 (PLT)
  * ≤130 → 혈소판 저하
    - 멘트:
      · 혈소판 수치 저하소견입니다. 추후관리를 위해 혈액내과 진료 권고.
      · cf) HBs Ag 양성일 경우에는 예외적으로 소화기내과 f/u.

- 호중구 (Neutrophils, ANC)
  * ≤1500 → 호중구 수치 저하
    - 멘트: 혈색소 수치 저하소견입니다. 혈액내과 진료 권고.

- ESR (적혈구침강속도)
  * 참고치: 남 ≤15 / 여 ≤20
  * 유소견 ≥30
    - 멘트: 적혈구침강속도 상승소견이 있습니다. 정상에서도 보일 수 있으나 염증질환 시 상승할 수 있습니다. 추적검사를 위해 류마티스내과 진료를 받으시기 바랍니다.

- CRP / hsCRP
  * CRP ≥0.6
    - 멘트: C-반응성단백 수치가 상승되었습니다. 정상에서도 보일 수 있으나 염증질환 시 상승할 수 있습니다. 추적검사를 위해 류마티스내과 진료를 받으시기 바랍니다.
  * hsCRP ≥1.1
    - 멘트: 고감도C반응성단백 수치가 상승되었습니다. 정상에서도 보일 수 있으나 염증질환 시 상승할 수 있습니다. 추적검사를 위해 류마티스내과 진료를 받으시기 바랍니다.

- 요산 (Uric Acid)
  * ≥8.0
    - 멘트: 요산수치가 상승되었습니다. 통풍 및 염증성 질환 시 상승할 수 있습니다. 추적검사가 요구되오니 류마티스내과 진료를 받으시기 바랍니다.
`
};

export class PromptGenerator {
  static generatePrompt(
    category: string,
    patient: Patient,
    results: TestResultItem[] | string,
    customHint?: string
  ): string {
    let prompt = DEFAULT_TEMPLATES.base;
    let hints = customHint || DEFAULT_TEMPLATES.hints;

    // Use specific hints for blood test if no custom hint is provided
    if (!customHint && (category === '혈액검사' || category.includes('blood'))) {
      hints = DEFAULT_TEMPLATES.bloodHints;
    }

    // 1. Replace Category & Date
    prompt = prompt.replace('{category}', category);
    prompt = prompt.replace('{measured_at}', patient.date);

    // 2. Replace Patient Info
    const patientInfo = JSON.stringify({
      sex: patient.gender,
      age: patient.age,
      name: patient.name // Added name for better context if needed
    }, null, 2);
    prompt = prompt.replace('{patient_info}', patientInfo);

    // 3. Replace Results
    let resultsStr = '';
    if (typeof results === 'string') {
      resultsStr = results;
    } else {
      // Filter relevant fields for the prompt to reduce token usage
      const simplifiedResults = results.map(item => ({
        item: item.name,
        value: item.value,
        unit: item.unit,
        reference: item.reference,
        status: item.status
      }));
      resultsStr = JSON.stringify(simplifiedResults, null, 2);
    }
    prompt = prompt.replace('{results}', resultsStr);

    // 4. Replace Hints
    prompt = prompt.replace('{hints}', hints);

    return prompt;
  }

  static generateComprehensiveSummaryPrompt(
    patient: Patient,
    categorySummaries: { category: string; summary: string }[]
  ): string {
    let prompt = `
[역할]
당신은 종합건강검진 결과를 총괄하는 전문의입니다. 각 검사 항목별 AI 분석 결과를 종합하여 환자를 위한 최종 종합 소견을 작성해야 합니다.

[환자 정보]
- 성명: ${patient.name}
- 성별/나이: ${patient.gender}/${patient.age}
- 검진일: ${patient.date}

[항목별 분석 요약]
`;

    categorySummaries.forEach(item => {
      prompt += `
### ${item.category}
${item.summary}
`;
    });

    prompt += `
[작성 가이드라인]
다음 3가지 섹션으로 나누어 종합 소견을 작성하세요. 각 항목은 구체적인 수치와 함께 설명하고, 반드시 <권고> 사항을 포함해야 합니다.

**I. 가장 시급하게 전문의 진료 및 관리 필요한 항목 (빨간불!)**
- 생명에 지장을 줄 수 있거나 즉각적인 조치가 필요한 항목 (예: 뇌 MRI 이상, 암 의심 소견 등)
- 형식: • **검사명 (진단명)** — 설명...
  <권고> 진료과 및 구체적인 조치 사항

**II. 추가 진료 및 확인이 필요한 항목**
- 추적 관찰이나 전문의 상담이 필요한 항목 (예: 용종, 결절, 수치 이상 등)
- 형식: • **검사명 (진단명)** — 설명...
  <권고> 진료과 및 추적 검사 시기

**III. 검진자분께 드리는 조언**
- 전반적인 건강 상태 요약
- 생활습관 개선(식습관, 운동, 금연/절주 등) 가이드
- 추적 검사 계획 정리

[출력 형식]
- JSON이 아닌, 가독성 좋은 줄글(Markdown) 형식으로 작성하세요.
- 중요한 키워드는 **굵게** 표시하세요.
- 섹션 제목은 위 가이드라인과 동일하게 작성하세요.
`;

    return prompt;
  }
}
