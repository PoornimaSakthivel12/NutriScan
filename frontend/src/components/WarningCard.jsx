import { AlertOctagon, AlertCircle, Info } from 'lucide-react';

const WarningCard = ({ type, message }) => {
  const config = {
    allergy: { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-800', icon: AlertOctagon, color: 'text-red-500' },
    caution: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', icon: AlertCircle, color: 'text-orange-500' },
    info: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', icon: Info, color: 'text-blue-500' }
  };

  const style = config[type] || config.info;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} ${style.border} border rounded-xl p-4 flex gap-3 items-start`}>
      <Icon className={`mt-0.5 ${style.color}`} size={20} flexShrink={0} />
      <p className={`text-sm ${style.text}`}>{message}</p>
    </div>
  );
};

export default WarningCard;
