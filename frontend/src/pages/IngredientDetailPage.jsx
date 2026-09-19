import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const INGREDIENT_NUTRITION_LOOKUP = {
  "Rice": {
    protein: "2.7g", carbs: "28g", fat: "0.3g", fiber: "0.4g",
    vitamins: "Thiamine (B1), Niacin (B3)",
    minerals: "Manganese, Selenium, Iron",
    benefits: ["Gentle staple providing easily accessible glucose energy", "Naturally hypoallergenic and gluten-free"],
    drawbacks: ["High glycemic index; spikes blood sugar if eaten in isolation"],
    allergens: "Rare allergen. Generally recognized as safe."
  },
  "Carrot": {
    protein: "0.9g", carbs: "9.6g", fat: "0.2g", fiber: "2.8g",
    vitamins: "Beta-Carotene (Vitamin A), Vitamin K1, Vitamin B6",
    minerals: "Potassium, Calcium",
    benefits: ["Remarkable source of provitamin A carotenoids for ocular support", "Pectin fiber aids gut microbiota"],
    drawbacks: ["High intake can cause harmless temporary skin yellowing (carotenemia)"],
    allergens: "Pollen-food allergy syndrome in some individuals with birch pollen allergy."
  },
  "Tomato": {
    protein: "0.9g", carbs: "3.9g", fat: "0.2g", fiber: "1.2g",
    vitamins: "Vitamin C, Folate, Vitamin K",
    minerals: "Potassium, Manganese",
    benefits: ["Dense in antioxidant lycopene which supports cardiovascular health", "Promotes natural skin collagen maintenance"],
    drawbacks: ["Natural malic and citric acids can aggravate acid reflux/heartburn"],
    allergens: "Mild contact dermatitis or histamine-release in sensitive guts."
  },
  "Onion": {
    protein: "1.1g", carbs: "9.3g", fat: "0.1g", fiber: "1.7g",
    vitamins: "Vitamin C, Pyridoxine (B6), Folate",
    minerals: "Potassium, Sulfur compounds",
    benefits: ["Potent quercetin flavonoid acts as a cellular antioxidant", "Prebiotic fructooligosaccharides feed Bifidobacteria"],
    drawbacks: ["High in fermentable oligosaccharides (FODMAPs); can cause gas/bloating in IBS"],
    allergens: "Sulfite sensitivity or oral irritation from raw pungency."
  },
  "Capsicum": {
    protein: "1.0g", carbs: "6.0g", fat: "0.3g", fiber: "2.1g",
    vitamins: "Exceptionally high Vitamin C, Vitamin A, Folate",
    minerals: "Potassium, Magnesium",
    benefits: ["Provides >150% daily Vitamin C requirement in a single cup", "Capsanthin antioxidant supports cell membrane integrity"],
    drawbacks: ["Nightshade family; small minority report mild inflammatory sensitivity"],
    allergens: "Rare; cross-reactivity with latex or pollen occasionally reported."
  },
  "Green Peas": {
    protein: "5.4g", carbs: "14.5g", fat: "0.4g", fiber: "5.7g",
    vitamins: "Vitamin K, Thiamine, Vitamin C, Folate",
    minerals: "Iron, Manganese, Phosphorus, Zinc",
    benefits: ["One of the highest-protein fresh vegetables", "High soluble and insoluble fiber stabilizes digestion"],
    drawbacks: ["Contains purines; moderate intake if managing uric acid or gout"],
    allergens: "Legume family; generally low allergy incidence compared to peanuts/soy."
  },
  "Cucumber": {
    protein: "0.7g", carbs: "3.6g", fat: "0.1g", fiber: "0.5g",
    vitamins: "Vitamin K, Vitamin C",
    minerals: "Potassium, Magnesium",
    benefits: ["Over 95% water content supports hydration and cellular fluid balance", "Cucurbitacins offer gentle anti-inflammatory qualities"],
    drawbacks: ["Low caloric and protein density; complement with nutrient-rich foods"],
    allergens: "Very rare allergy."
  },
  "Potato": {
    protein: "2.0g", carbs: "17.5g", fat: "0.1g", fiber: "2.2g",
    vitamins: "Vitamin C, Vitamin B6, Niacin",
    minerals: "Potassium, Magnesium, Iron",
    benefits: ["Rich in potassium to support healthy blood pressure balance", "Resistant starch forms upon cooling, nourishing colon lining"],
    drawbacks: ["Quickly metabolized carbohydrate; prefer boiled/steamed over deep fried"],
    allergens: "Rare raw potato latex cross-reaction."
  }
};

const IngredientDetailPage = () => {
  const { state } = useLocation();
  const { name } = useParams();
  const navigate = useNavigate();

  const ingredientName = state?.ingredient?.name || name || "Ingredient";
  const ingredientEmoji = state?.ingredient?.emoji || "🥗";
  const detectedStatus = state?.ingredient?.status || "Detected";

  // Find detailed nutrition or generate realistic approximation
  const matchedKey = Object.keys(INGREDIENT_NUTRITION_LOOKUP).find(k => 
    ingredientName.toLowerCase().includes(k.toLowerCase())
  );
  const details = matchedKey ? INGREDIENT_NUTRITION_LOOKUP[matchedKey] : {
    protein: "1.2g", carbs: "8.5g", fat: "0.3g", fiber: "1.8g",
    vitamins: "Vitamin C, Provitamin A, B-complex",
    minerals: "Potassium, Magnesium, Iron",
    benefits: [
      "Contributes essential dietary micronutrients and plant phytochemicals",
      "Supports balanced gut microbial environment and digestive transit"
    ],
    drawbacks: [
      "Individual tolerances may vary based on gut sensitivity and preparation method"
    ],
    allergens: "Check individual sensitivity. Wash thoroughly before raw consumption."
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-4 py-3.5 flex items-center gap-3 border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        <button 
          onClick={() => navigate(-1)} 
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors active:scale-95"
          aria-label="Back"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div>
          <h1 className="font-bold text-base text-gray-900">Ingredient Details</h1>
          <p className="text-[10px] text-gray-500">Nutritional Contribution Profile</p>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Ingredient Hero Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-5">
          <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center text-5xl shadow-inner shrink-0">
            {ingredientEmoji}
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900">{ingredientName}</h2>
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                detectedStatus === 'Detected' ? 'bg-green-100 text-green-800' :
                detectedStatus === 'Possibly Detected' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-700'
              }`}>
                {detectedStatus === 'Detected' ? '✅ ' : detectedStatus === 'Possibly Detected' ? '⚠️ ' : '❓ '}
                {detectedStatus}
              </span>
              <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                Approx. per 100g
              </span>
            </div>
          </div>
        </div>

        {/* Nutrition Contribution Grid */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            💪 Nutritional Contribution
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50/60 p-3 rounded-2xl border border-blue-100/60">
              <span className="text-xs text-blue-700 font-medium">Protein</span>
              <p className="text-xl font-bold text-blue-950 mt-0.5">{details.protein}</p>
            </div>
            <div className="bg-orange-50/60 p-3 rounded-2xl border border-orange-100/60">
              <span className="text-xs text-orange-700 font-medium">Carbohydrates</span>
              <p className="text-xl font-bold text-orange-950 mt-0.5">{details.carbs}</p>
            </div>
            <div className="bg-purple-50/60 p-3 rounded-2xl border border-purple-100/60">
              <span className="text-xs text-purple-700 font-medium">Total Fat</span>
              <p className="text-xl font-bold text-purple-950 mt-0.5">{details.fat}</p>
            </div>
            <div className="bg-emerald-50/60 p-3 rounded-2xl border border-emerald-100/60">
              <span className="text-xs text-emerald-700 font-medium">Dietary Fiber</span>
              <p className="text-xl font-bold text-emerald-950 mt-0.5">{details.fiber}</p>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 space-y-2 text-xs">
            <div className="flex justify-between items-start py-1">
              <span className="text-gray-500 font-medium">Vitamins Contributed:</span>
              <span className="font-bold text-gray-800 text-right max-w-[60%]">{details.vitamins}</span>
            </div>
            <div className="flex justify-between items-start py-1">
              <span className="text-gray-500 font-medium">Minerals Contributed:</span>
              <span className="font-bold text-gray-800 text-right max-w-[60%]">{details.minerals}</span>
            </div>
          </div>
        </div>

        {/* Health Benefits */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <CheckCircle2 className="text-primary-green" size={18} /> Evidence-Based Benefits
          </h3>
          <ul className="space-y-2 text-xs text-gray-700">
            {details.benefits.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-green-50/40 p-2.5 rounded-xl border border-green-100/50">
                <span className="text-primary-green font-bold">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Possible Drawbacks & Allergens */}
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-3">
          <h3 className="font-bold text-gray-900 text-base flex items-center gap-2">
            <AlertTriangle className="text-amber-500" size={18} /> Possible Considerations & Allergens
          </h3>
          <ul className="space-y-2 text-xs text-gray-700">
            {details.drawbacks.map((d, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-amber-50/40 p-2.5 rounded-xl border border-amber-100/50">
                <span className="text-amber-500 font-bold">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="bg-gray-50 p-3 rounded-2xl border border-gray-200/60 text-xs text-gray-600">
            <strong className="block text-gray-800 mb-1">Common Allergy Information:</strong>
            {details.allergens}
          </div>
        </div>

        {/* Safety Disclaimer */}
        <SafetyDisclaimer type="ingredient" />
      </div>
    </div>
  );
};

export default IngredientDetailPage;
