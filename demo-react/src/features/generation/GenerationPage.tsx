import StatisticsCard from './StatisticsCard';
import FilterBar from './FilterBar';
import PatientTable from './PatientTable';

const GenerationPage = () => {
  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <StatisticsCard />

      {/* 필터 바 */}
      <FilterBar />

      {/* 환자 목록 테이블 */}
      <PatientTable />
    </div>
  );
};

export default GenerationPage;
