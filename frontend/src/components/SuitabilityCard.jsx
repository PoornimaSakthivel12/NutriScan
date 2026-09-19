import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const SuitabilityCard = ({ group, emoji, status, explanation }) => {
  const getStyles = () => {
    switch(status) {
      case 'Generally Suitable': return { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', icon: CheckCircle2 };
      case 'Caution': return { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', icon: AlertTriangle };
      case 'Avoid': return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', icon: XCircle };
      default: return { bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-700', icon: CheckCircle2 };
    }
  };

  const styles = getStyles();
  const Icon = styles.icon;

  return (
    <div className={`${styles.bg} ${styles.border} border rounded-xl p-4 flex flex-col gap-2`}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">{emoji}</span>
        <h4 className="font-semibold text-gray-800">{group}</h4>
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${styles.text}`}>
        <Icon size={16} />
        <span>{status}</span>
      </div>
      <p className="text-xs text-gray-600 mt-1">{explanation}</p>
    </div>
  );
};

export default SuitabilityCard;
