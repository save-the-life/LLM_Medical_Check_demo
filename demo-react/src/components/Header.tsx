import React from 'react';

const Header: React.FC = () => {
    return (
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
    );
};

export default Header;
