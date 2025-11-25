import { useState } from 'react';
import { samplePatients } from '../data/dummyData';
import type { Patient } from '../data/dummyData';

interface DashboardProps {
    onSelectPatient: (patient: Patient) => void;
}

const Dashboard = ({ onSelectPatient }: DashboardProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('전체');

    const filteredPatients = samplePatients.filter((patient: Patient) => {
        const matchesSearch = patient.name.includes(searchTerm) || patient.id.includes(searchTerm);
        const matchesStatus = statusFilter === '전체' ||
            (statusFilter === '생성 완료' && patient.status === 'completed') ||
            (statusFilter === '생성 대기' && patient.status === 'pending') ||
            (statusFilter === '생성 중' && patient.status === 'processing');
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'completed':
                return <span className="status-badge status-completed"><i className="fas fa-check-circle"></i>생성 완료</span>;
            case 'processing':
                return <span className="status-badge status-processing"><i className="fas fa-spinner fa-spin"></i>생성 중</span>;
            default:
                return <span className="status-badge status-pending"><i className="fas fa-clock"></i>대기중</span>;
        }
    };

    return (
        <div id="page-generation" className="page-content">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Stats Cards */}
                <div className="bg-white rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">오늘 검진 대상자</p>
                            <h3 className="text-3xl font-bold text-gray-800">{samplePatients.length}</h3>
                        </div>
                        <div className="bg-blue-100 p-4 rounded-full">
                            <i className="fas fa-users text-blue-600 text-2xl"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">생성 완료</p>
                            <h3 className="text-3xl font-bold text-green-600">
                                {samplePatients.filter((p: Patient) => p.status === 'completed').length}
                            </h3>
                        </div>
                        <div className="bg-green-100 p-4 rounded-full">
                            <i className="fas fa-check-circle text-green-600 text-2xl"></i>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 card-shadow">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-500 text-sm mb-1">생성 대기중</p>
                            <h3 className="text-3xl font-bold text-yellow-600">
                                {samplePatients.filter((p: Patient) => p.status === 'pending').length}
                            </h3>
                        </div>
                        <div className="bg-yellow-100 p-4 rounded-full">
                            <i className="fas fa-clock text-yellow-600 text-2xl"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl p-6 card-shadow mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">검진일 조회</label>
                        <input type="date" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" defaultValue="2025-05-02" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">이름 검색</label>
                        <input
                            type="text"
                            placeholder="환자명 입력"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">소견 생성 여부</label>
                        <select
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>전체</option>
                            <option>생성 완료</option>
                            <option>생성 대기</option>
                            <option>생성 중</option>
                        </select>
                    </div>
                    <div className="flex items-end gap-2">
                        <button className="btn-primary text-white px-6 py-2 rounded-lg font-semibold flex-1">
                            <i className="fas fa-search mr-2"></i>조회
                        </button>
                        <button
                            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
                            onClick={() => { setSearchTerm(''); setStatusFilter('전체'); }}
                        >
                            <i className="fas fa-redo mr-2"></i>초기화
                        </button>
                    </div>
                </div>
            </div>

            {/* Patient List */}
            <div className="bg-white rounded-xl card-shadow overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-gray-800">
                        <i className="fas fa-list mr-2 text-purple-600"></i>검진 대상자 목록
                    </h2>
                    <button className="btn-primary text-white px-6 py-2 rounded-lg font-semibold">
                        <i className="fas fa-robot mr-2"></i>배치 자동 생성 (5일전까지)
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="data-table w-full" id="patientTable">
                        <thead>
                            <tr>
                                <th className="w-12">
                                    <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                                </th>
                                <th>등록번호</th>
                                <th>성명</th>
                                <th>성별/나이</th>
                                <th>검진일</th>
                                <th>소견 생성 상태</th>
                                <th>생성 일시</th>
                                <th>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPatients.map((patient) => (
                                <tr
                                    key={patient.id}
                                    className="cursor-pointer hover:bg-purple-50 transition"
                                    onClick={() => onSelectPatient(patient)}
                                >
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <input type="checkbox" className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                                    </td>
                                    <td className="font-semibold">{patient.id}</td>
                                    <td>{patient.name}</td>
                                    <td>{patient.gender}/{patient.age}</td>
                                    <td>{patient.date}</td>
                                    <td>{getStatusBadge(patient.status)}</td>
                                    <td className="text-gray-600">{patient.generatedAt || '-'}</td>
                                    <td onClick={(e) => e.stopPropagation()}>
                                        <div className="flex gap-2">
                                            {patient.status === 'completed' ? (
                                                <>
                                                    <button
                                                        onClick={() => window.open(`/result/${patient.id}`, '_blank')}
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="결과 보기"
                                                    >
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                    <button className="text-green-600 hover:text-green-800" title="PDF 다운로드">
                                                        <i className="fas fa-download"></i>
                                                    </button>
                                                </>
                                            ) : (
                                                <button className="text-purple-600 hover:text-purple-800" title="소견 생성">
                                                    <i className="fas fa-robot"></i>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => onSelectPatient(patient)}
                                                className="text-gray-600 hover:text-gray-800"
                                                title="상세 정보"
                                            >
                                                <i className="fas fa-info-circle"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                    <p className="text-sm text-gray-600">총 <span className="font-semibold text-purple-600">{filteredPatients.length}</span>명</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button className="px-3 py-1 bg-purple-600 text-white rounded">1</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">2</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">3</button>
                        <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
