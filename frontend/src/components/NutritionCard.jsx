import { motion } from 'framer-motion';

const NutritionCard = ({ label, value, unit, percentage, color = 'bg-primary-green' }) => {
  return (
    <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{label}</span>
        <span className="text-sm font-bold text-gray-800">{value}{unit}</span>
      </div>
      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage || 0, 100)}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
};

export default NutritionCard;
