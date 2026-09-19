import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const MealCard = ({ meal, onDelete }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm flex items-center justify-between"
    >
      <div>
        <h4 className="font-medium text-gray-800">{meal.food_name}</h4>
        <p className="text-xs text-gray-500">{meal.quantity} • {meal.calories} kcal</p>
      </div>
      <button 
        onClick={() => onDelete(meal.id)}
        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
      >
        <Trash2 size={18} />
      </button>
    </motion.div>
  );
};

export default MealCard;
