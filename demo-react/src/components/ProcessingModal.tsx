import { Modal } from '../shared/ui';
import { useAppStore } from '../store/useAppStore';

const ProcessingModal = () => {
  const { isProcessing, processingProgress } = useAppStore();

  return (
    <Modal isOpen={isProcessing} onClose={() => {}} showCloseButton={false} size="sm">
      <div className="text-center py-8">
        {/* AI 아이콘 애니메이션 */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 gradient-bg rounded-full flex items-center justify-center animate-pulse shadow-lg">
            <i className="fas fa-robot text-white text-3xl"></i>
          </div>
        </div>

        {/* 제목 */}
        <h3 className="text-xl font-bold text-gray-800 mb-2">AI 소견 생성 중...</h3>
        <p className="text-sm text-gray-600 mb-6">환자 데이터를 분석하고 있습니다</p>

        {/* 진행 바 */}
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2 overflow-hidden">
          <div
            className="progress-bar h-full rounded-full flex items-center justify-end transition-all duration-300"
            style={{ width: `${processingProgress}%` }}
          >
            <span className="text-xs text-white font-semibold pr-2">
              {processingProgress}%
            </span>
          </div>
        </div>

        {/* 진행 단계 텍스트 */}
        <p className="text-xs text-gray-500 mt-4">
          {processingProgress < 30 && '검사 결과 수집 중...'}
          {processingProgress >= 30 && processingProgress < 60 && '데이터 분석 중...'}
          {processingProgress >= 60 && processingProgress < 90 && 'AI 소견 생성 중...'}
          {processingProgress >= 90 && '최종 검토 중...'}
        </p>

        {/* 로딩 스피너 */}
        <div className="mt-6 flex justify-center">
          <div className="loading-spinner"></div>
        </div>
      </div>
    </Modal>
  );
};

export default ProcessingModal;
