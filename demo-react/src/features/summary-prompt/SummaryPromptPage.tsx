import { useState } from 'react';
import { Card, Button } from '../../shared/ui';
import { useAppStore } from '../../store/useAppStore';
import { loadPrompt, savePrompt, getComprehensiveAnalysis } from '../../data/aiAnalysis';
import { MOCK_PATIENTS } from '../../data/patients';

const SummaryPromptPage = () => {
  const { setProcessing } = useAppStore();
  const [promptContent, setPromptContent] = useState(loadPrompt('master'));
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [summaryResult, setSummaryResult] = useState('');

  const completedPatients = MOCK_PATIENTS.filter((p) => p.status === 'completed');

  const handleSave = () => {
    savePrompt('master', promptContent);
    alert('마스터 프롬프트가 저장되었습니다.');
  };

  const handleReset = () => {
    const defaultPrompt = loadPrompt('master');
    setPromptContent(defaultPrompt);
  };

  const handleGenerateSummary = async () => {
    if (!selectedPatientId) {
      alert('환자를 선택해주세요.');
      return;
    }

    setProcessing(true, 0);
    setSummaryResult('');

    // 진행 상태 시뮬레이션
    for (let i = 0; i <= 100; i += 15) {
      await new Promise((resolve) => setTimeout(resolve, 450));
      setProcessing(true, i);
    }

    setProcessing(false, 0);

    // 종합소견 결과 표시
    const result = getComprehensiveAnalysis(selectedPatientId);
    if (result) {
      setSummaryResult(result.summary);
    } else {
      setSummaryResult('해당 환자의 종합소견이 없습니다.');
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* 왼쪽: 마스터 프롬프트 편집 */}
      <div>
        <Card
          title="종합소견 마스터 프롬프트"
          subtitle="모든 검사 결과를 종합하여 최종 소견을 생성하는 프롬프트"
          padding="md"
          headerAction={
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={handleReset}>
                초기화
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={handleSave}
                icon={<i className="fas fa-save"></i>}
              >
                저장
              </Button>
            </div>
          }
        >
          <textarea
            value={promptContent}
            onChange={(e) => setPromptContent(e.target.value)}
            className="w-full h-[600px] p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            placeholder="마스터 프롬프트를 입력하세요..."
          />
          <p className="text-xs text-gray-500 mt-2">
            <i className="fas fa-info-circle mr-1"></i>
            이 프롬프트는 모든 검사별 AI 분석 결과를 종합하여 최종 소견을 생성하는데
            사용됩니다.
          </p>
        </Card>
      </div>

      {/* 오른쪽: 테스트 및 결과 미리보기 */}
      <div className="space-y-6">
        {/* 테스트 섹션 */}
        <Card title="종합소견 생성 테스트" padding="md">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                테스트할 환자 선택
              </label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="">환자를 선택하세요</option>
                {completedPatients.map((patient) => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} ({patient.id})
                  </option>
                ))}
              </select>
            </div>
            <Button
              fullWidth
              variant="primary"
              onClick={handleGenerateSummary}
              icon={<i className="fas fa-clipboard-check"></i>}
            >
              종합소견 생성
            </Button>
          </div>
        </Card>

        {/* 결과 미리보기 */}
        <Card title="생성 결과 미리보기" padding="md">
          {summaryResult ? (
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-primary rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center mr-3">
                    <i className="fas fa-robot text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">AI 종합소견</h4>
                    <p className="text-xs text-gray-600">
                      자동 생성된 종합 검진 소견입니다
                    </p>
                  </div>
                </div>
                <pre className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed font-sans">
                  {summaryResult}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="success"
                  fullWidth
                  icon={<i className="fas fa-check"></i>}
                >
                  소견 승인
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  icon={<i className="fas fa-edit"></i>}
                >
                  수정하기
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-clipboard text-5xl mb-4 text-gray-300"></i>
              <p className="text-sm">
                환자를 선택하고 '종합소견 생성' 버튼을 클릭하세요.
              </p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default SummaryPromptPage;
