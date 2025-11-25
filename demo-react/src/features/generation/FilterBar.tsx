import { useAppStore } from '../../store/useAppStore';

const FilterBar = () => {
  const { filters, setFilters, resetFilters } = useAppStore();

  return (
    <div className="bg-white rounded-xl p-6 card-shadow mb-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* 날짜 필터 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            검진일 조회
          </label>
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ date: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* 이름/등록번호 검색 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            이름 검색
          </label>
          <input
            type="text"
            value={filters.name}
            onChange={(e) => setFilters({ name: e.target.value })}
            placeholder="환자명 입력"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* 상태 필터 */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            소견 생성 여부
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ status: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="전체">전체</option>
            <option value="생성 완료">생성 완료</option>
            <option value="생성 중">생성 중</option>
            <option value="생성 대기">생성 대기</option>
          </select>
        </div>

        {/* 버튼들 */}
        <div className="flex items-end gap-2">
          <button className="btn-primary text-white px-6 py-2 rounded-lg font-semibold flex-1">
            <i className="fas fa-search mr-2"></i>조회
          </button>
          <button
            onClick={resetFilters}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
          >
            <i className="fas fa-redo mr-2"></i>초기화
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
