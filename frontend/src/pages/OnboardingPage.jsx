import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleQuickDemo = () => {
    login({
      username: 'Pooja Sharma',
      date_of_birth: '1998-04-12',
      age: 26,
      age_group: 'Adult',
      pregnancy_status: 'No'
    }, 'demo-prototype-token');
    navigate('/home');
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-gradient-to-b from-green-50 via-white to-emerald-50/40 flex flex-col justify-between p-7 relative overflow-hidden shadow-2xl">
      {/* Floating Food Badges */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute top-16 left-8 text-4xl">🍎</motion.div>
        <motion.div animate={{ y: [0, 25, 0], x: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 5 }} className="absolute top-36 right-8 text-4xl">🥦</motion.div>
        <motion.div animate={{ y: [0, -15, 0], x: [0, 18, 0] }} transition={{ repeat: Infinity, duration: 4.5 }} className="absolute bottom-52 left-12 text-4xl">🥕</motion.div>
        <motion.div animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 5.5 }} className="absolute bottom-72 right-10 text-4xl">🧡</motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 flex flex-col items-center justify-center text-center z-10 mt-12"
      >
        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl shadow-green-500/10 border border-green-100 flex items-center justify-center text-5xl mb-6">
          🥗
        </div>
        
        <div className="inline-flex items-center gap-1.5 bg-green-100/80 text-primary-green px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles size={13} /> AI Food & Health Intelligence
        </div>

        <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
          Welcome to <span className="text-primary-green">NutriScan AI</span>
        </h1>
        
        <p className="text-base text-gray-600 font-medium px-4 leading-relaxed">
          Understand your food. Make informed choices.
        </p>

        <div className="mt-6 flex flex-wrap gap-2 justify-center text-[11px] text-gray-500 max-w-xs">
          <span className="bg-white/80 px-2.5 py-1 rounded-full shadow-xs border border-gray-100">🥗 Visible Ingredients</span>
          <span className="bg-white/80 px-2.5 py-1 rounded-full shadow-xs border border-gray-100">🔥 Full Nutrition</span>
          <span className="bg-white/80 px-2.5 py-1 rounded-full shadow-xs border border-gray-100">🕐 Freshness AI</span>
          <span className="bg-white/80 px-2.5 py-1 rounded-full shadow-xs border border-gray-100">🤰 Pregnancy Mode</span>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full flex flex-col gap-3 z-10 mb-4"
      >
        <Link 
          to="/register" 
          className="w-full bg-gradient-to-r from-primary-green to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-center py-4 rounded-2xl font-bold text-base shadow-lg shadow-green-500/25 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Get Started</span>
          <ArrowRight size={18} />
        </Link>
        
        <div className="grid grid-cols-2 gap-2.5">
          <Link 
            to="/login" 
            className="w-full bg-white text-gray-700 text-center py-3 rounded-xl font-bold text-xs shadow-xs border border-gray-200 hover:bg-gray-50 transition-all active:scale-95"
          >
            Existing User Login
          </Link>
          <button 
            onClick={handleQuickDemo} 
            className="w-full bg-green-50 text-primary-green text-center py-3 rounded-xl font-bold text-xs border border-green-200/80 hover:bg-green-100/70 transition-all active:scale-95"
          >
            ⚡ Quick Demo Mode
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-2">
          Educational college prototype. Estimates for guidance only.
        </p>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
