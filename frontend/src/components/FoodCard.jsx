import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const FoodCard = ({ food }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate(`/analysis/${food.id}`, { state: { food } })}
      className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer"
    >
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-3xl">
        {food.emoji || '🍽️'}
      </div>
      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{food.name}</h3>
        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full inline-block mt-1">
          {food.category}
        </span>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary-green">{food.calories || 0}</p>
        <p className="text-xs text-gray-500">kcal</p>
      </div>
    </motion.div>
  );
};

export default FoodCard;
