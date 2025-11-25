import React from 'react';

interface NavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    const getTabClass = (tabName: string) => {
        const baseClass = "nav-tab px-6 py-4 font-semibold transition-all";
        return activeTab === tabName
            ? `${baseClass} nav-active`
            : `${baseClass} text-gray-600 hover:text-gray-900`;
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="container mx-auto px-6">
                <div className="flex gap-2">
                    <button
                        onClick={() => onTabChange('generation')}
                        className={getTabClass('generation')}
                    >
                        <i className="fas fa-file-medical mr-2"></i>종합소견 생성
                    </button>
                    <button
                        onClick={() => onTabChange('test-prompts')}
                        className={getTabClass('test-prompts')}
                    >
                        <i className="fas fa-flask mr-2"></i>검사별 프롬프트
                    </button>
                    <button
                        onClick={() => onTabChange('summary-prompt')}
                        className={getTabClass('summary-prompt')}
                    >
                        <i className="fas fa-edit mr-2"></i>종합소견 프롬프트
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
