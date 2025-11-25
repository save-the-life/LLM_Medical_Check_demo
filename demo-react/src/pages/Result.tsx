import { useParams } from 'react-router-dom';
import ReportContent from '../components/ReportContent';

function Result() {
    const { patientId } = useParams();

    if (!patientId) {
        return <div className="p-8 text-center">환자 정보를 찾을 수 없습니다.</div>;
    }

    return <ReportContent patientId={patientId} />;
}

export default Result;
