import { Table } from '../../shared/ui';
import { useAppStore } from '../../store/useAppStore';
import type { Patient } from '../../types';
import { getStatusText } from '../../data/patients';

const PatientTable = () => {
  const { getFilteredPatients, setProcessing } = useAppStore();
  const patients = getFilteredPatients();

  const handleGenerateAI = async (patientId: string) => {
    setProcessing(true, 0);

    // 진행 상태 시뮬레이션
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setProcessing(true, i);
    }

    setProcessing(false, 0);
    alert(`${patientId} 환자의 AI 소견이 생성되었습니다!\n(데모 버전에서는 실제로 생성되지 않습니다)`);
  };

  const handleViewResult = (patient: Patient) => {
    // 결과 페이지로 이동 (새 창)
    window.open(`/result.html?patientId=${patient.id}`, '_blank');
  };

  const handleDownloadPDF = (patient: Patient) => {
    alert(`${patient.name} 환자의 검진 결과 PDF를 다운로드합니다.\n(데모 버전에서는 실제 파일이 다운로드되지 않습니다)`);
  };

  const columns = [
    {
      header: '선택',
      accessor: () => (
        <input type="checkbox" className="w-4 h-4 text-primary rounded" />
      ),
      width: '50px',
      align: 'center' as const
    },
    {
      header: '등록번호',
      accessor: 'id' as keyof Patient,
      width: '120px'
    },
    {
      header: '성명',
      accessor: 'name' as keyof Patient,
      width: '100px'
    },
    {
      header: '성별/나이',
      accessor: (row: Patient) => `${row.gender}/${row.age}`,
      width: '100px',
      align: 'center' as const
    },
    {
      header: '검진일',
      accessor: 'examDate' as keyof Patient,
      width: '120px',
      align: 'center' as const
    },
    {
      header: '소견 생성 상태',
      accessor: (row: Patient) => {
        const statusClassMap = {
          completed: 'status-completed',
          processing: 'status-processing',
          pending: 'status-pending'
        };
        return (
          <span className={`status-badge ${statusClassMap[row.status]}`}>
            {getStatusText(row.status)}
          </span>
        );
      },
      width: '120px',
      align: 'center' as const
    },
    {
      header: '생성 일시',
      accessor: (row: Patient) => row.generatedAt || '-',
      width: '150px',
      align: 'center' as const
    },
    {
      header: '액션',
      accessor: (row: Patient) => (
        <div className="flex gap-3 justify-center">
          {row.status === 'completed' ? (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewResult(row);
                }}
                className="text-blue-600 hover:text-blue-800 transition-colors text-lg"
                title="결과 보기"
              >
                <i className="fas fa-eye"></i>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadPDF(row);
                }}
                className="text-green-600 hover:text-green-800 transition-colors text-lg"
                title="PDF 다운로드"
              >
                <i className="fas fa-download"></i>
              </button>
            </>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleGenerateAI(row.id);
              }}
              className="text-purple-600 hover:text-purple-800 transition-colors text-lg"
              title="AI 생성"
            >
              <i className="fas fa-robot"></i>
            </button>
          )}
        </div>
      ),
      width: '120px',
      align: 'center' as const
    }
  ];

  return (
    <div className="bg-white rounded-xl card-shadow overflow-hidden">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          <i className="fas fa-list mr-2 text-purple-600"></i>검진 대상자 목록
        </h2>
        <button
          className="btn-primary text-white px-6 py-2 rounded-lg font-semibold"
          onClick={() => {
            const pending = patients.filter((p) => p.status === 'pending');
            if (pending.length === 0) {
              alert('생성 대기중인 환자가 없습니다.');
              return;
            }
            if (
              confirm(
                `${pending.length}명의 환자에 대해 AI 소견을 생성하시겠습니까?`
              )
            ) {
              handleGenerateAI('batch');
            }
          }}
        >
          <i className="fas fa-robot mr-2"></i>배치 자동 생성 (5일전까지)
        </button>
      </div>
      <div className="overflow-x-auto">
        <Table
          columns={columns}
          data={patients}
          emptyMessage="검색 결과가 없습니다."
          className="data-table"
        />
      </div>
      <div className="p-4 border-t border-gray-200 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          총 <span className="font-semibold text-purple-600">{patients.length}</span>명
        </p>
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
  );
};

export default PatientTable;
