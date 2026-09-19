import { useNavigate, useParams } from 'react-router-dom';
import FoodAnalysisPage from './FoodAnalysisPage';

// A wrapper to reuse FoodAnalysisPage for history details
const HistoryDetailPage = () => {
  return <FoodAnalysisPage />;
};

export default HistoryDetailPage;
