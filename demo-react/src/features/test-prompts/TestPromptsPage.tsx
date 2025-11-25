import { useState } from 'react';
import { Card, Button } from '../../shared/ui';
import { useAppStore } from '../../store/useAppStore';
import { TEST_GROUPS, loadPrompt, savePrompt, getAIAnalysisByGroup } from '../../data/aiAnalysis';
import { MOCK_PATIENTS } from '../../data/patients';

const TestPromptsPage = () => {
  const { selectedTestGroup, setSelectedTestGroup, setProcessing } = useAppStore();
  const [promptContent, setPromptContent] = useState(loadPrompt('test', selectedTestGroup));
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const completedPatients = MOCK_PATIENTS.filter((p) => p.status === 'completed');

  const handleSelectTest = (testName: string) => {
    setSelectedTestGroup(testName);
    setPromptContent(loadPrompt('test', testName));
    setAnalysisResult('');
  };

  const handleSave = () => {
    savePrompt('test', promptContent, selectedTestGroup);
    alert('프롬프트가 저장되었습니다.');
  };

  const handleReset = () => {
    const defaultPrompt = loadPrompt('test', selectedTestGroup);
    setPromptContent(defaultPrompt);
  };

  const handleRunAnalysis = async () => {
    if (!selectedPatientId) {
      alert('환자를 선택해주세요.');
      return;
    }

    setProcessing(true, 0);
    setAnalysisResult('');

    // 진행 상태 시뮬레이션
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      setProcessing(true, i);
    }

    setProcessing(false, 0);

    // AI 분석 결과 표시
    const result = getAIAnalysisByGroup(selectedPatientId, selectedTestGroup);
    setAnalysisResult(
      result || `해당 환자의 ${selectedTestGroup} 분석 결과가 없습니다.`
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* 왼쪽: 검사 그룹 목록 */}
      <div className="lg:col-span-1">
        <Card title="검사 항목" padding="sm">
          <div className="space-y-2">
            {TEST_GROUPS.map((test) => (
              <button
                key={test.name}
                onClick={() => handleSelectTest(test.name)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedTestGroup === test.name
                    ? 'bg-primary text-white font-semibold shadow-md'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                }`}
              >
                <i className={`fas ${test.icon} mr-2`}></i>
                {test.name}
              </button>
            ))}
          </div>
        </Card>
      </div>

      {/* 오른쪽: 프롬프트 편집 및 테스트 */}
      <div className="lg:col-span-3 space-y-6">
        {/* 프롬프트 편집 */}
        <Card
          title={`${selectedTestGroup} 분석 프롬프트`}
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
            className="w-full h-64 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            placeholder="프롬프트를 입력하세요..."
          />
          <p className="text-xs text-gray-500 mt-2">
            <i className="fas fa-info-circle mr-1"></i>
            수정한 프롬프트는 브라우저 localStorage에 저장됩니다.
          </p>
        </Card>

        {/* 테스트 섹션 */}
        <Card title="AI 분석 테스트" padding="md">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <div className="flex items-end">
                <Button
                  fullWidth
                  variant="primary"
                  onClick={handleRunAnalysis}
                  icon={<i className="fas fa-play"></i>}
                >
                  AI 분석 실행
                </Button>
              </div>
            </div>

            {/* 분석 결과 */}
            {analysisResult && (
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                <h4 className="font-bold text-blue-900 mb-2 flex items-center">
                  <i className="fas fa-robot mr-2"></i>
                  AI 분석 결과
                </h4>
                <pre className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed">
                  {analysisResult}
                </pre>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TestPromptsPage;
