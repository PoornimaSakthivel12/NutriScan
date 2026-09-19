import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, TrendingUp, Apple, Carrot, ShieldCheck, Heart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useDietStore } from '../store/dietStore';

const WeeklyOverviewPage = () => {
  const navigate = useNavigate();
  const weeklyData = useDietStore(state => state.weeklyData);

  return (
    <div className="min-h-screen bg-gray-50/70 p-5 pb-28">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pt-2">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-white rounded-full shadow-sm border border-gray-100 hover:bg-gray-50 transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Weekly Overview</h1>
          <p className="text-xs text-gray-500 font-medium">7-day nutrition balance & food diversity</p>
        </div>
      </div>

      {/* Weekly Caloric Intake Bar Chart */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6 space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5">
            <TrendingUp size={16} className="text-primary-green" /> Daily Caloric Rhythm
          </h3>
          <span className="text-[11px] text-gray-400 font-medium">kcal/day</span>
        </div>
        
        <div className="h-48 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[1200, 2400]} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff', fontSize: '11px' }}
                cursor={{ fill: '#f8fafc' }}
              />
              <Bar dataKey="calories" fill="#22c55e" radius={[6, 6, 0, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Variety & Food Group Frequency Breakdown */}
      <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6 space-y-4">
        <h3 className="font-bold text-gray-900 text-sm">🥗 Weekly Dietary Diversity</h3>
        
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-700 flex items-center gap-1">🍎 Fresh Fruits Frequency</span>
              <span className="font-bold text-red-600">6 / 7 days</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-red-400 h-full rounded-full w-[85%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-700 flex items-center gap-1">🥦 Vegetables Frequency</span>
              <span className="font-bold text-emerald-600">7 / 7 days</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full w-[100%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-700 flex items-center gap-1">🥜 Protein-Rich Food Variety</span>
              <span className="font-bold text-blue-600">5 distinct sources</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-blue-400 h-full rounded-full w-[70%]"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-700 flex items-center gap-1">🌾 Fiber-Rich Foods Variety</span>
              <span className="font-bold text-orange-600">6 distinct sources</span>
            </div>
            <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
              <div className="bg-orange-400 h-full rounded-full w-[80%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Positive Insights (No restrictive dieting) */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-5 rounded-3xl border border-green-200/80 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary-green" size={18} />
          <h4 className="font-bold text-sm text-green-950">Nutritional Variety Summary</h4>
        </div>
        <p className="text-xs text-green-900/90 leading-relaxed">
          Your week reflects steady inclusion of colorful fruits and leafy or root vegetables. Maintaining food diversity supplies distinct polyphenols and dietary fibers without requiring restrictive calorie deficits.
        </p>
      </div>
    </div>
  );
};

export default WeeklyOverviewPage;
