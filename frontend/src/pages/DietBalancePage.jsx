import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, Plus, Trash2, Droplets, Sparkles, 
  CheckCircle2, Lightbulb, Apple, Carrot, ShieldCheck, Flame
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MealCard from '../components/MealCard';
import { useDietStore } from '../store/dietStore';
import { SAMPLE_FOODS } from '../data/foodsData';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const DietBalancePage = () => {
  const navigate = useNavigate();
  const todayMeals = useDietStore(state => state.todayMeals);
  const removeMeal = useDietStore(state => state.removeMeal);
  const addMeal = useDietStore(state => state.addMeal);
  const waterGlasses = useDietStore(state => state.waterGlasses);
  const incrementWater = useDietStore(state => state.incrementWater);
  const decrementWater = useDietStore(state => state.decrementWater);
  const getDailyTotals = useDietStore(state => state.getDailyTotals);

  const [activeModalMealType, setActiveModalMealType] = useState(null); // 'breakfast', 'lunch', etc.
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedServing, setSelectedServing] = useState('1 serving');

  const totals = getDailyTotals();

  // Balance Feedback Generator (strictly non-restrictive, variety focused)
  const getBalanceFeedback = () => {
    const feedback = [];
    const totalItems = Object.values(todayMeals).reduce((acc, curr) => acc + curr.length, 0);

    if (totalItems >= 4 && totals.fruitsCount >= 1 && totals.vegCount >= 1) {
      feedback.push({
        type: 'success',
        icon: CheckCircle2,
        title: '🟢 Wonderful Food Variety',
        desc: 'You have logged diverse whole foods across meals today. Great colorful plate!'
      });
    } else if (totalItems >= 1) {
      feedback.push({
        type: 'info',
        icon: Sparkles,
        title: '🟡 Building Daily Variety',
        desc: 'Adding foods from different natural food groups will increase micro-nutrient diversity.'
      });
    }

    if (totals.vegCount === 0) {
      feedback.push({
        type: 'tip',
        icon: Carrot,
        title: '💡 Consider adding more vegetables',
        desc: 'Try incorporating crisp carrots, cucumbers, spinach, or capsicum for natural minerals and hydration.'
      });
    }

    if (totals.fruitsCount === 0) {
      feedback.push({
        type: 'tip',
        icon: Apple,
        title: '💡 Consider including fresh fruits',
        desc: 'A serving of berries, an apple, or sliced papaya offers natural antioxidants and soluble fiber.'
      });
    }

    if (totals.protein < 35) {
      feedback.push({
        type: 'tip',
        icon: Lightbulb,
        title: '💡 Consider adding a protein-rich food',
        desc: 'Options like lentils (dal), almonds, walnuts, peas, eggs, or paneer help maintain lean tissue and satiety.'
      });
    }

    return feedback;
  };

  const feedbackList = getBalanceFeedback();

  // Filter foods for modal
  const modalFilteredFoods = SAMPLE_FOODS.filter(f => 
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFoodForMeal = (food) => {
    if (!activeModalMealType) return;
    addMeal(activeModalMealType, {
      food_id: food.id,
      food_name: food.name,
      calories: food.calories,
      quantity: selectedServing,
      emoji: food.emoji,
      protein: food.protein,
      carbs: food.carbohydrates,
      fat: food.fat,
      fiber: food.fiber
    });
    setActiveModalMealType(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-gray-50/70 p-5 pb-28">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 pt-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">🥗 Diet Balance</h1>
          <p className="text-xs text-gray-500 font-medium">
            Daily whole food tracking & balanced variety
          </p>
        </div>
        <button 
          onClick={() => navigate('/diet/weekly')} 
          className="px-3.5 py-2 bg-white rounded-2xl shadow-sm border border-gray-200/80 flex items-center gap-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Weekly Trends <ChevronRight size={14} />
        </button>
      </header>

      {/* Daily Nutrition Balance Dashboard */}
      <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 mb-6 space-y-4">
        <div className="flex justify-between items-baseline">
          <h2 className="font-bold text-gray-900 text-base">📊 Today's Nutritional Balance</h2>
          <span className="text-xs text-gray-400 font-medium">Reference targets</span>
        </div>

        {/* Macros Bars */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-600">💪 Protein</span>
              <span className="font-bold text-blue-600">{totals.protein}g / ~50g</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totals.protein / 50) * 100)}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-600">🍚 Carbohydrates</span>
              <span className="font-bold text-orange-600">{totals.carbs}g / ~250g</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-orange-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totals.carbs / 250) * 100)}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-600">🥑 Healthy Fats</span>
              <span className="font-bold text-purple-600">{totals.fat}g / ~65g</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-purple-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totals.fat / 65) * 100)}%` }}></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-medium text-gray-600">🌾 Dietary Fiber</span>
              <span className="font-bold text-emerald-600">{totals.fiber}g / ~28g</span>
            </div>
            <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (totals.fiber / 28) * 100)}%` }}></div>
            </div>
          </div>
        </div>

        {/* Variety Indicators (Fruits, Vegetables, Hydration) */}
        <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-gray-100 text-center">
          <div className="bg-red-50/60 p-2.5 rounded-2xl border border-red-100/60">
            <span className="text-base">🍎</span>
            <p className="text-[10px] text-gray-500 mt-0.5">Fruits</p>
            <p className="text-sm font-bold text-red-700">{totals.fruitsCount} types</p>
          </div>
          <div className="bg-emerald-50/60 p-2.5 rounded-2xl border border-emerald-100/60">
            <span className="text-base">🥦</span>
            <p className="text-[10px] text-gray-500 mt-0.5">Vegetables</p>
            <p className="text-sm font-bold text-emerald-700">{totals.vegCount} types</p>
          </div>
          <div className="bg-blue-50/60 p-2.5 rounded-2xl border border-blue-100/60">
            <div className="flex items-center justify-center gap-1">
              <button onClick={decrementWater} className="text-xs text-blue-500 font-bold px-1">−</button>
              <Droplets size={14} className="text-blue-500" />
              <button onClick={incrementWater} className="text-xs text-blue-500 font-bold px-1">+</button>
            </div>
            <p className="text-[10px] text-gray-500 mt-0.5">Water</p>
            <p className="text-sm font-bold text-blue-700">{waterGlasses} glasses</p>
          </div>
        </div>
      </section>

      {/* Balance Feedback Cards (Non-restrictive, variety focused) */}
      <section className="mb-6 space-y-2.5">
        <h3 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
          <Sparkles size={16} className="text-primary-green" /> Personalized Balance Insights
        </h3>
        {feedbackList.map((fb, idx) => (
          <div 
            key={idx} 
            className={`p-3.5 rounded-2xl border text-xs flex items-start gap-3 ${
              fb.type === 'success' ? 'bg-green-50/80 border-green-200/80 text-green-900' :
              fb.type === 'tip' ? 'bg-amber-50/80 border-amber-200/80 text-amber-900' :
              'bg-blue-50/80 border-blue-200/80 text-blue-900'
            }`}
          >
            <fb.icon size={18} className="shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold mb-0.5">{fb.title}</h4>
              <p className="leading-relaxed opacity-90">{fb.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Daily Meals: Breakfast, Lunch, Snack, Dinner */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-gray-900 text-base">🍽️ Today's Logged Meals</h2>
          <span className="text-xs text-gray-400">{Object.values(todayMeals).flat().length} items</span>
        </div>

        {[
          { key: 'breakfast', title: '🌅 Breakfast' },
          { key: 'lunch', title: '☀️ Lunch' },
          { key: 'snack', title: '🍎 Snack' },
          { key: 'dinner', title: '🌙 Dinner' }
        ].map(({ key, title }) => (
          <div key={key} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-sm">{title}</h3>
              <button 
                onClick={() => setActiveModalMealType(key)} 
                className="text-primary-green hover:bg-green-50 px-2.5 py-1 rounded-xl flex items-center gap-1 text-xs font-bold transition-colors active:scale-95"
              >
                <Plus size={14} /> Add Food
              </button>
            </div>

            <div className="space-y-2">
              {todayMeals[key] && todayMeals[key].length > 0 ? (
                todayMeals[key].map(meal => (
                  <div key={meal.id} className="flex items-center justify-between p-3 bg-gray-50/80 rounded-2xl border border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{meal.emoji || '🍽️'}</span>
                      <div>
                        <h4 className="font-bold text-xs text-gray-800">{meal.food_name}</h4>
                        <span className="text-[10px] text-gray-500">{meal.quantity || '1 serving'} • {meal.calories} kcal</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeMeal(key, meal.id)}
                      className="text-gray-400 hover:text-red-500 p-1.5 transition-colors"
                      title="Remove food"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic py-2 text-center bg-gray-50/40 rounded-xl">
                  No foods logged for this meal yet.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      <SafetyDisclaimer type="general" />

      {/* Add Food to Meal Modal */}
      <AnimatePresence>
        {activeModalMealType && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white rounded-3xl w-full max-w-md p-5 space-y-4 shadow-2xl max-h-[85vh] flex flex-col"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <h3 className="font-bold text-gray-900 text-base capitalize">
                  Add Food to {activeModalMealType}
                </h3>
                <button 
                  onClick={() => setActiveModalMealType(null)} 
                  className="w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Search bar */}
              <input 
                type="text" 
                placeholder="Search food by name..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-primary-green"
              />

              {/* Serving selector */}
              <div className="flex gap-2 text-xs">
                {['0.5 serving', '1 serving', '2 servings'].map(qty => (
                  <button
                    key={qty}
                    onClick={() => setSelectedServing(qty)}
                    className={`py-1.5 px-3 rounded-lg border text-xs font-medium ${
                      selectedServing === qty 
                        ? 'border-primary-green bg-green-50 text-primary-green font-bold' 
                        : 'border-gray-200 text-gray-600'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>

              {/* Food list */}
              <div className="overflow-y-auto space-y-2 flex-1 pr-1">
                {modalFilteredFoods.map(food => (
                  <div 
                    key={food.id}
                    onClick={() => handleSelectFoodForMeal(food)}
                    className="p-2.5 bg-gray-50 hover:bg-green-50 rounded-2xl border border-gray-100 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{food.emoji}</span>
                      <div>
                        <h4 className="font-bold text-xs text-gray-800">{food.name}</h4>
                        <span className="text-[10px] text-gray-500">{food.category} • {food.calories} kcal</span>
                      </div>
                    </div>
                    <span className="text-primary-green text-xs font-bold bg-white px-2.5 py-1 rounded-xl shadow-xs border border-gray-100">
                      + Add
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DietBalancePage;
