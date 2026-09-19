import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useDietStore } from '../store/dietStore';
import { useHistoryStore } from '../store/historyStore';
import { 
  Camera, Image as ImageIcon, Search, PieChart, Activity, 
  Bell, Flame, AlertTriangle, Clock, ChevronRight, Sparkles, Droplets
} from 'lucide-react';
import { motion } from 'framer-motion';
import PregnancyBanner from '../components/PregnancyBanner';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import { SAMPLE_FOODS } from '../data/foodsData';

const HomePage = () => {
  const user = useAuthStore(state => state.user);
  const scans = useHistoryStore(state => state.scans);
  const getDailyTotals = useDietStore(state => state.getDailyTotals);
  const waterGlasses = useDietStore(state => state.waterGlasses);
  const navigate = useNavigate();

  const totals = getDailyTotals();
  const recentScan = scans && scans.length > 0 ? scans[0] : null;

  const quickActions = [
    { icon: ImageIcon, label: 'Upload Image', route: '/scan', color: 'bg-blue-50 text-blue-500 border border-blue-100' },
    { icon: Search, label: 'Search Food', route: '/search', color: 'bg-purple-50 text-purple-500 border border-purple-100' },
    { icon: PieChart, label: 'Diet Balance', route: '/diet', color: 'bg-orange-50 text-orange-500 border border-orange-100' },
    { icon: Activity, label: 'Scan History', route: '/history', color: 'bg-teal-50 text-teal-500 border border-teal-100' },
  ];

  return (
    <div className="min-h-screen bg-gray-50/70 p-5 pb-28">
      {/* Top Greeting Header */}
      <header className="flex justify-between items-center mb-5 pt-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
            <span>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
            <span>•</span>
            <span className="text-primary-green font-semibold">{user?.age_group || 'Adult'} Mode</span>
          </div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight mt-0.5">
            Hello, {user?.username || user?.name || 'User'} 👋
          </h1>
        </div>
        <div 
          onClick={() => navigate('/profile')} 
          className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary-green to-emerald-400 text-white font-bold flex items-center justify-center cursor-pointer shadow-md shadow-green-500/20 active:scale-95 transition-all"
        >
          {(user?.username || user?.name || 'U')[0].toUpperCase()}
        </div>
      </header>

      {/* Pregnancy Banner */}
      <PregnancyBanner />

      {/* PRIMARY MAIN ACTION: 📷 SCAN FOOD */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate('/scan')}
        className="w-full bg-gradient-to-r from-primary-green via-emerald-500 to-green-600 rounded-3xl p-6 text-white shadow-xl shadow-green-500/20 mb-6 cursor-pointer relative overflow-hidden group"
      >
        <div className="absolute -right-4 -bottom-6 text-9xl opacity-15 select-none pointer-events-none group-hover:scale-105 transition-transform">
          🥗
        </div>
        <div className="relative z-10 flex flex-col items-start gap-4">
          <div className="bg-white/20 p-3.5 rounded-2xl backdrop-blur-md border border-white/25">
            <Camera size={28} className="text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-100 uppercase tracking-wider mb-1">
              <Sparkles size={13} /> AI Vision Analysis
            </div>
            <h2 className="text-2xl font-black tracking-tight mb-1">SCAN FOOD</h2>
            <p className="text-green-50 text-xs font-medium max-w-[240px]">
              Identify ingredients, nutrition, freshness & age suitability instantly
            </p>
          </div>
        </div>
      </motion.div>

      {/* Secondary Actions Grid */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3 text-xs uppercase tracking-wider text-gray-400">
          Quick Actions
        </h3>
        <div className="grid grid-cols-4 gap-2.5">
          {quickActions.map((action, idx) => (
            <motion.div 
              key={idx} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => navigate(action.route)}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div className={`w-14 h-14 ${action.color} rounded-2xl flex items-center justify-center shadow-xs hover:scale-105 transition-transform`}>
                <action.icon size={22} />
              </div>
              <span className="text-[11px] font-semibold text-gray-700 text-center leading-tight">
                {action.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dashboard Feature Cards */}
      <div className="space-y-3.5 mb-6">
        <h3 className="font-bold text-gray-800 text-xs uppercase tracking-wider text-gray-400">
          Live Insights
        </h3>

        {/* 🥗 Recent Food Card */}
        {recentScan ? (
          <div 
            onClick={() => navigate(`/analysis/${recentScan.food_id || 1}`)}
            className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-gray-200 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 bg-green-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
                {recentScan.emoji || '🥗'}
              </div>
              <div>
                <span className="text-[10px] font-bold text-primary-green uppercase">Recent Scan</span>
                <h4 className="font-bold text-sm text-gray-900">{recentScan.food_name}</h4>
                <p className="text-[11px] text-gray-400">{recentScan.freshness_status || 'Fresh'} • {recentScan.calories || 0} kcal</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        ) : (
          <div 
            onClick={() => navigate('/scan')}
            className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-gray-200 transition-all"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                📷
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase">Recent Scan</span>
                <h4 className="font-bold text-sm text-gray-800">Scan your first meal</h4>
                <p className="text-[11px] text-gray-400">Tap to capture or upload</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        )}

        {/* 🧪 Nutrition Summary & 📊 Diet Balance Card */}
        <div 
          onClick={() => navigate('/diet')}
          className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 cursor-pointer hover:border-gray-200 transition-all"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[10px] font-bold text-blue-500 uppercase flex items-center gap-1">
                <Flame size={12} /> Today's Energy & Balance
              </span>
              <p className="text-2xl font-black text-gray-900 mt-0.5">
                {totals.calories} <span className="text-xs font-medium text-gray-400">kcal logged</span>
              </p>
            </div>
            <span className="text-xs font-bold text-primary-green bg-green-50 px-2.5 py-1 rounded-xl">
              {totals.fruitsCount + totals.vegCount} Fresh Items
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-blue-50/70 p-2 rounded-xl border border-blue-100/60">
              <span className="text-[10px] text-gray-500 block">Protein</span>
              <span className="font-bold text-blue-900">{totals.protein}g</span>
            </div>
            <div className="bg-orange-50/70 p-2 rounded-xl border border-orange-100/60">
              <span className="text-[10px] text-gray-500 block">Carbs</span>
              <span className="font-bold text-orange-900">{totals.carbs}g</span>
            </div>
            <div className="bg-purple-50/70 p-2 rounded-xl border border-purple-100/60">
              <span className="text-[10px] text-gray-500 block">Fats</span>
              <span className="font-bold text-purple-900">{totals.fat}g</span>
            </div>
            <div className="bg-emerald-50/70 p-2 rounded-xl border border-emerald-100/60">
              <span className="text-[10px] text-gray-500 block">Fiber</span>
              <span className="font-bold text-emerald-900">{totals.fiber}g</span>
            </div>
          </div>
        </div>

        {/* ⚠️ Important Warnings & 🕐 Freshness Card */}
        <div className="grid grid-cols-2 gap-3">
          <div 
            onClick={() => navigate('/analysis/3')} // navigate to Papaya as warning example
            className="bg-amber-50/80 border border-amber-200/80 p-4 rounded-3xl cursor-pointer hover:bg-amber-50 transition-colors"
          >
            <div className="flex items-center gap-1.5 text-amber-700 font-bold text-xs mb-1">
              <AlertTriangle size={15} /> Warnings
            </div>
            <p className="text-[11px] text-amber-900/90 leading-tight">
              Review ingredients for allergen traces & pregnancy cautions.
            </p>
          </div>

          <div 
            onClick={() => navigate('/scan')}
            className="bg-emerald-50/80 border border-emerald-200/80 p-4 rounded-3xl cursor-pointer hover:bg-emerald-50 transition-colors"
          >
            <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-xs mb-1">
              <Clock size={15} /> Freshness
            </div>
            <p className="text-[11px] text-emerald-900/90 leading-tight">
              Visual estimation for fresh fruits and vegetables.
            </p>
          </div>
        </div>
      </div>

      <SafetyDisclaimer type="general" />
    </div>
  );
};

export default HomePage;
