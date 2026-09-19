import { Clock, AlertTriangle } from 'lucide-react';

const FreshnessCard = ({ status, visual_signs, confidence, disclaimer }) => {
  const getStyles = () => {
    switch (status) {
      case 'Fresh': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' };
      case 'Ripening': return { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' };
      case 'Spoilage': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
      default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
    }
  };

  const styles = getStyles();

  return (
    <div className={`rounded-xl border p-4 ${styles.bg} ${styles.border}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <Clock className={styles.text} size={20} />
          <h3 className={`font-semibold ${styles.text}`}>Freshness Estimate: {status}</h3>
        </div>
        <span className="text-xs bg-white px-2 py-1 rounded-full text-gray-600 font-medium shadow-sm">
          {confidence}% Match
        </span>
      </div>
      
      <div className="mb-4">
        <p className="text-sm text-gray-800 font-medium mb-1">Visual Signs Detected:</p>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {visual_signs?.map((sign, i) => (
            <li key={i}>{sign}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-2 items-start bg-white/60 p-3 rounded-lg">
        <AlertTriangle size={16} className="text-gray-500 mt-0.5 shrink-0" />
        <p className="text-xs text-gray-600">{disclaimer}</p>
      </div>
    </div>
  );
};

export default FreshnessCard;
