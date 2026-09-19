import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getFoodByIdOrName } from '../data/foodsData';

const ScanHistoryCard = ({ scan }) => {
  const navigate = useNavigate();
  
  const handleOpenScan = () => {
    const food = getFoodByIdOrName(scan.food_id || scan.food_name);
    navigate(`/analysis/${scan.food_id || food.id}`, { state: { food } });
  };

  const formattedDate = scan.scanned_at 
    ? new Date(scan.scanned_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Recent Scan';

  const freshness = scan.freshness_status || scan.freshness;

  return (
    <motion.div 
      whileTap={{ scale: 0.98 }}
      onClick={handleOpenScan}
      className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3.5 cursor-pointer hover:border-gray-200 transition-all"
    >
      <div className="w-14 h-14 bg-green-50/70 border border-green-100/60 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-inner">
        {scan.emoji || '🥗'}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-sm text-gray-900 truncate">{scan.food_name}</h4>
        <p className="text-[11px] text-gray-400 mt-0.5">{formattedDate}</p>
        {scan.calories && (
          <span className="text-[10px] text-gray-500 font-medium">
            {scan.calories} kcal • {scan.confidence_percent || '92%'} confidence
          </span>
        )}
      </div>
      {freshness && (
        <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold shrink-0 ${
          freshness === 'Fresh' ? 'bg-green-100 text-green-800' :
          freshness === 'Ripening' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {freshness === 'Fresh' ? '🟢 ' : freshness === 'Ripening' ? '🟡 ' : '🔴 '}
          {freshness}
        </span>
      )}
    </motion.div>
  );
};

export default ScanHistoryCard;
