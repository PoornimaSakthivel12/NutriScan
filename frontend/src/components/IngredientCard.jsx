import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const IngredientCard = ({ ingredient }) => {
  const navigate = useNavigate();

  const getStatusConfig = (status) => {
    switch(status) {
      case 'Detected': return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50' };
      case 'Possibly Detected': return { icon: AlertTriangle, color: 'text-yellow-500', bg: 'bg-yellow-50' };
      default: return { icon: HelpCircle, color: 'text-gray-500', bg: 'bg-gray-50' };
    }
  };

  const config = getStatusConfig(ingredient.status);
  const Icon = config.icon;

  return (
    <motion.div 
      whileHover={{ y: -2 }}
      onClick={() => navigate(`/ingredient/${ingredient.name}`, { state: { ingredient } })}
      className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center cursor-pointer gap-2"
    >
      <div className="text-3xl">{ingredient.emoji || '🌿'}</div>
      <h4 className="font-medium text-sm text-gray-800 line-clamp-1">{ingredient.name}</h4>
      <div className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] ${config.bg} ${config.color}`}>
        <Icon size={12} />
        <span>{ingredient.status}</span>
      </div>
    </motion.div>
  );
};

export default IngredientCard;
