import { motion } from 'framer-motion';

const LoadingAnimation = ({ text = "Analyzing your food..." }) => {
  return (
    <div className="fixed inset-0 bg-white/90 z-50 flex flex-col items-center justify-center backdrop-blur-sm">
      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="text-6xl mb-6"
      >
        🥗
      </motion.div>
      <h2 className="text-xl font-semibold text-primary-darkgreen mb-4">{text}</h2>
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }}
            className="w-3 h-3 bg-primary-green rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingAnimation;
