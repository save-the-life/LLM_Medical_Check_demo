import type { ReactNode } from 'react';
import { useAppStore } from '../store/useAppStore';
import type { PageType } from '../types';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { currentPage, setCurrentPage } = useAppStore();

  const tabs: { id: PageType; label: string; icon: string }[] = [
    { id: 'generation', label: '종합소견 생성', icon: 'fa-file-medical' },
    { id: 'test-prompts', label: '검사별 프롬프트', icon: 'fa-flask' },
    { id: 'summary-prompt', label: '종합소견 프롬프트', icon: 'fa-edit' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="gradient-bg text-white shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className="fas fa-hospital-alt text-3xl"></i>
              <div>
                <h1 className="text-2xl font-bold">한국대학병원</h1>
                <p className="text-sm opacity-90">종합검진 AI 소견 생성 시스템</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm opacity-90">관리자</p>
                <p className="font-semibold">김의사</p>
              </div>
              <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition">
                <i className="fas fa-sign-out-alt"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 네비게이션 */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentPage(tab.id)}
                className={`nav-tab px-6 py-4 font-semibold transition-all ${currentPage === tab.id
                    ? 'nav-active'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <i className={`fas ${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 메인 컨텐츠 */}
      <main className="container mx-auto px-6 py-8">
        {children}
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-6 py-6 text-center text-sm text-gray-600">
          <p>© 2025 종합검진 AI 소견 생성 시스템 - Demo Version</p>
          <p className="mt-1 text-xs text-gray-500">
            실제 백엔드 API 없이 Mock 데이터로 동작합니다
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
