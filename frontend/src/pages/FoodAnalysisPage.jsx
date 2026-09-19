import { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { 
  ArrowLeft, Plus, CheckCircle2, AlertTriangle, XCircle, 
  HelpCircle, Clock, ShieldCheck, Flame, Heart, Info, Check, Share2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PregnancyBanner from '../components/PregnancyBanner';
import IngredientCard from '../components/IngredientCard';
import NutritionCard from '../components/NutritionCard';
import NutritionChart from '../components/NutritionChart';
import SuitabilityCard from '../components/SuitabilityCard';
import FreshnessCard from '../components/FreshnessCard';
import SafetyDisclaimer from '../components/SafetyDisclaimer';
import WarningCard from '../components/WarningCard';
import { getFoodByIdOrName, SAMPLE_FOODS } from '../data/foodsData';
import { useDietStore } from '../store/dietStore';
import { useAuthStore } from '../store/authStore';

const FoodAnalysisPage = () => {
  const { state } = useLocation();
  const { foodId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const addMeal = useDietStore(state => state.addMeal);

  // Load food either from navigation state or look up from data
  const [food, setFood] = useState(() => {
    if (state?.food) return state.food;
    return getFoodByIdOrName(foodId || 'Fried Rice');
  });

  const [activeTab, setActiveTab] = useState('all'); // all, nutrition, ingredients, suitability
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState('lunch');
  const [quantity, setQuantity] = useState('1 serving');
  const [addedToast, setAddedToast] = useState(false);

  useEffect(() => {
    if (foodId && (!state?.food || state.food.id !== parseInt(foodId, 10))) {
      const found = getFoodByIdOrName(foodId);
      if (found) setFood(found);
    }
  }, [foodId, state]);

  // Handle adding to diet balance
  const handleAddToDiet = () => {
    addMeal(selectedMealType, {
      food_id: food.id,
      food_name: food.name,
      calories: food.calories,
      quantity,
      emoji: food.emoji,
      protein: food.protein,
      carbs: food.carbohydrates,
      fat: food.fat,
      fiber: food.fiber
    });
    setShowAddModal(false);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2500);
  };

  const isUserPregnant = user?.pregnancy_status === 'Yes';

  const macros = [
    { name: 'Carbs', value: food.carbohydrates || 0, color: '#f97316' },
    { name: 'Fat', value: food.fat || 0, color: '#a78bfa' },
    { name: 'Protein', value: food.protein || 0, color: '#38bdf8' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-28">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md z-40 px-4 py-3.5 flex items-center justify-between border-b border-gray-100 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-gray-100/80 hover:bg-gray-200 rounded-full transition-colors active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div className="text-center">
          <h1 className="font-bold text-base text-gray-900 truncate max-w-[200px]">{food.name}</h1>
          <p className="text-[10px] text-primary-green font-medium">AI Analysis Result</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="p-2 bg-green-50 text-primary-green rounded-full hover:bg-green-100 transition-colors active:scale-95 flex items-center gap-1 text-xs font-semibold px-3"
        >
          <Plus size={16} /> Log
        </button>
      </div>

      {/* Added to Diet Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-medium"
          >
            <Check size={16} className="text-primary-green" />
            Added {food.name} to {selectedMealType}!
          </motion.div>
        )}
      </AnimatePresence>

      <div className="p-5 space-y-6">
        {/* Food Hero Header Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-amber-100/90 text-amber-800 text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-amber-200">
            🤖 Estimated identification: 92%
          </div>
          
          <div className="w-24 h-24 mx-auto bg-green-50/70 border-4 border-green-100/60 rounded-3xl flex items-center justify-center text-6xl shadow-inner mb-3">
            {food.emoji || '🍽️'}
          </div>

          <h2 className="text-2xl font-black text-gray-900 tracking-tight">{food.name}</h2>
          
          <div className="flex justify-center items-center gap-2 mt-1.5 flex-wrap">
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
              Category: {food.category}
            </span>
            <span className="bg-green-50 text-primary-green px-3 py-1 rounded-full text-xs font-medium">
              Serving: {food.serving || '1 portion'}
            </span>
          </div>

          <p className="text-[11px] text-gray-400 mt-2 italic">
            Demo educational profile based on standard USDA references.
          </p>
        </div>

        {/* User Pregnancy Banner if applicable */}
        <PregnancyBanner />

        {/* Specific Pregnancy Caution Card for High-Priority Foods (e.g. Unripe Papaya, Raw Salads) */}
        {food.name.toLowerCase().includes('papaya') && (
          <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-800">
              <AlertTriangle size={18} className="text-amber-600" />
              <span>Pregnancy Caution: Papaya Latex Risk</span>
            </div>
            <p className="text-xs leading-relaxed text-amber-800/90">
              While fully ripe papaya is generally safe in moderation, <strong>unripe or semi-ripe papaya</strong> contains concentrated latex and papain which may trigger uterine contractions. Verify with a qualified healthcare professional.
            </p>
          </div>
        )}

        {/* Section Navigation Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Sections' },
            { id: 'ingredients', label: '🥗 Ingredients' },
            { id: 'nutrition', label: '🧪 Nutrition' },
            { id: 'benefits', label: '💚 Benefits' },
            { id: 'suitability', label: '👥 Suitability' },
            { id: 'freshness', label: '🕐 Freshness' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                activeTab === tab.id 
                  ? 'bg-primary-green text-white shadow-sm' 
                  : 'bg-white text-gray-600 border border-gray-200/80 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 🥗 DETECTED INGREDIENTS SECTION (MAIN FEATURE) */}
        {(activeTab === 'all' || activeTab === 'ingredients') && (
          <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  🥗 Detected Ingredients
                </h3>
                <p className="text-xs text-gray-500">Tap any ingredient for nutritional breakdown</p>
              </div>
              <span className="text-[11px] bg-green-50 text-primary-green font-semibold px-2.5 py-1 rounded-full">
                {food.ingredients?.length || 1} identified
              </span>
            </div>

            {/* Ingredients Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {food.ingredients && food.ingredients.length > 0 ? (
                food.ingredients.map((ing, idx) => (
                  <IngredientCard key={idx} ingredient={ing} />
                ))
              ) : (
                <div className="col-span-2 text-center py-4 text-xs text-gray-500 bg-gray-50 rounded-2xl">
                  Whole raw food item with single natural component.
                </div>
              )}
            </div>

            {/* Quantity and Detection Disclaimers */}
            <div className="bg-gray-50 rounded-2xl p-3.5 space-y-2 border border-gray-100 text-xs text-gray-600">
              <div className="flex items-start gap-2">
                <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Quantity note:</strong> Quantity cannot be reliably estimated from an image alone.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <HelpCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <p>
                  Hidden ingredients such as <em>salt, sugar, cooking oil, spices, and chemical preservatives</em> are marked as <strong>Unable to Determine</strong> unless verified via physical packaging.
                </p>
              </div>
            </div>

            <SafetyDisclaimer type="ingredient" />
          </section>
        )}

        {/* 🧪 DETAILED NUTRITION DASHBOARD */}
        {(activeTab === 'all' || activeTab === 'nutrition') && (
          <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                🔥 Nutrition Breakdown
              </h3>
              <span className="text-xs text-gray-400 font-medium">Approx. per serving</span>
            </div>

            {/* Big Calories & Macronutrients Donut Chart */}
            <div className="bg-gradient-to-br from-green-50/70 to-emerald-50/40 p-4 rounded-2xl border border-green-100/70 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Energy</span>
                <p className="text-4xl font-black text-gray-900 mt-1">
                  {food.calories} <span className="text-sm font-semibold text-gray-500">kcal</span>
                </p>
                <div className="flex gap-2 mt-2 text-[11px] text-gray-600">
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-400"></span>Carb: {food.carbohydrates}g</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-400"></span>Protein: {food.protein}g</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-400"></span>Fat: {food.fat}g</span>
                </div>
              </div>
              <div className="w-24 h-24">
                <NutritionChart data={macros} />
              </div>
            </div>

            {/* Core Macronutrient Cards with Progress Bars */}
            <div className="grid grid-cols-2 gap-2.5">
              <NutritionCard label="Protein" value={food.protein || 0} unit="g" percentage={Math.min(100, ((food.protein || 0) / 50) * 100)} color="bg-blue-400" />
              <NutritionCard label="Carbohydrates" value={food.carbohydrates || 0} unit="g" percentage={Math.min(100, ((food.carbohydrates || 0) / 275) * 100)} color="bg-orange-400" />
              <NutritionCard label="Total Fat" value={food.fat || 0} unit="g" percentage={Math.min(100, ((food.fat || 0) / 70) * 100)} color="bg-purple-400" />
              <NutritionCard label="Dietary Fiber" value={food.fiber || 0} unit="g" percentage={Math.min(100, ((food.fiber || 0) / 28) * 100)} color="bg-emerald-500" />
              <NutritionCard label="Natural Sugars" value={food.sugar || 0} unit="g" percentage={Math.min(100, ((food.sugar || 0) / 50) * 100)} color="bg-pink-400" />
              <NutritionCard label="Sodium" value={food.sodium || 0} unit="mg" percentage={Math.min(100, ((food.sodium || 0) / 2300) * 100)} color="bg-amber-400" />
            </div>

            {/* Vitamins Breakdown */}
            {food.vitamins && Object.keys(food.vitamins).length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                  💊 Key Vitamins
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(food.vitamins).map(([vit, val], idx) => (
                    <div key={idx} className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex justify-between items-center">
                      <span className="font-medium text-gray-600">{vit}</span>
                      <span className="font-bold text-gray-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Minerals Breakdown */}
            {food.minerals && Object.keys(food.minerals).length > 0 && (
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <h4 className="font-semibold text-gray-800 text-sm flex items-center gap-1.5">
                  ⚡ Key Minerals
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {Object.entries(food.minerals).map(([min, val], idx) => (
                    <div key={idx} className="bg-gray-50 p-2.5 rounded-xl border border-gray-100 flex justify-between items-center">
                      <span className="font-medium text-gray-600">{min}</span>
                      <span className="font-bold text-gray-800">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}

        {/* 💚 HEALTH BENEFITS */}
        {(activeTab === 'all' || activeTab === 'benefits') && (
          <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              💚 Health Benefits
            </h3>
            <p className="text-xs text-gray-500">Evidence-based functional contributions</p>
            <ul className="space-y-2.5">
              {food.benefits?.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-green-50/50 p-3 rounded-2xl border border-green-100/60">
                  <CheckCircle2 size={16} className="text-primary-green shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ⚠️ POSSIBLE CONCERNS / DRAWBACKS */}
        {(activeTab === 'all' || activeTab === 'benefits') && (
          <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              ⚠️ Possible Concerns
            </h3>
            <p className="text-xs text-gray-500">Mindful points and moderation guidance</p>
            <ul className="space-y-2.5">
              {food.drawbacks?.map((drawback, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 bg-amber-50/50 p-3 rounded-2xl border border-amber-100/60">
                  <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{drawback}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* 👥 WHO CAN EAT THIS? (AGE GROUP & SPECIAL SUITABILITY) */}
        {(activeTab === 'all' || activeTab === 'suitability') && (
          <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  👥 Who Can Eat This?
                </h3>
                <p className="text-xs text-gray-500">General population lifestyle guidelines</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <SuitabilityCard 
                group="Kids" 
                emoji="👶" 
                status={food.suitability?.kids?.status || "Generally Suitable"} 
                explanation={food.suitability?.kids?.note || "Safe with standard meal preparation."} 
              />
              <SuitabilityCard 
                group="Teen & Adult" 
                emoji="🧑" 
                status={food.suitability?.adult?.status || "Generally Suitable"} 
                explanation={food.suitability?.adult?.note || "Great part of a diverse daily intake."} 
              />
              <SuitabilityCard 
                group="Pregnancy" 
                emoji="🤰" 
                status={food.suitability?.pregnancy?.status || "Generally Suitable"} 
                explanation={food.suitability?.pregnancy?.note || "General nutrition estimate; confirm with doctor."} 
              />
              <SuitabilityCard 
                group="Elderly" 
                emoji="🧓" 
                status={food.suitability?.elderly?.status || "Generally Suitable"} 
                explanation={food.suitability?.elderly?.note || "Easy on digestion when suitably prepared."} 
              />
            </div>

            <SafetyDisclaimer type="general" />
          </section>
        )}

        {/* 🕐 FRESHNESS ANALYSIS */}
        {(activeTab === 'all' || activeTab === 'freshness') && food.freshness && (
          <section className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
            <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
              🕐 Freshness Estimate
            </h3>
            <FreshnessCard 
              status={food.freshness.status} 
              visual_signs={typeof food.freshness.visualSigns === 'string' ? [food.freshness.visualSigns] : food.freshness.visualSigns} 
              confidence={food.freshness.confidence} 
              disclaimer={food.freshness.disclaimer} 
            />
          </section>
        )}

        {/* Bottom Safety Disclaimer */}
        <SafetyDisclaimer type="general" />
      </div>

      {/* Floating Action Button: Add to Diet Balance */}
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-md px-5 z-40 pointer-events-none">
        <button 
          onClick={() => setShowAddModal(true)} 
          className="pointer-events-auto w-full bg-gradient-to-r from-primary-green to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl shadow-xl shadow-green-500/25 flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <Plus size={20} />
          <span>Add to Diet Balance</span>
        </button>
      </div>

      {/* Add to Diet Balance Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="bg-white rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{food.emoji}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">Add to Daily Meals</h3>
                    <p className="text-xs text-gray-500">{food.name} ({food.calories} kcal)</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowAddModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Meal Category Selection */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wider">
                  Select Meal Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'breakfast', label: '🌅 Breakfast' },
                    { id: 'lunch', label: '☀️ Lunch' },
                    { id: 'snack', label: '🍎 Snack' },
                    { id: 'dinner', label: '🌙 Dinner' }
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMealType(m.id)}
                      className={`p-3 rounded-xl text-xs font-semibold border transition-all ${
                        selectedMealType === m.id 
                          ? 'border-primary-green bg-green-50 text-primary-green shadow-sm' 
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Serving Size Selection */}
              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 block uppercase tracking-wider">
                  Serving Quantity
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['0.5 serving', '1 serving', '2 servings'].map(qty => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                        quantity === qty 
                          ? 'border-primary-green bg-green-50 text-primary-green font-bold' 
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      {qty}
                    </button>
                  ))}
                </div>
              </div>

              {/* Confirm Buttons */}
              <div className="pt-2 flex gap-3">
                <button 
                  onClick={() => setShowAddModal(false)} 
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddToDiet} 
                  className="flex-1 py-3 bg-primary-green text-white rounded-xl text-sm font-bold shadow-md shadow-green-200 active:scale-95 transition-all"
                >
                  Confirm Log
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FoodAnalysisPage;
