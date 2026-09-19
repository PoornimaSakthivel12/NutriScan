import { ShieldAlert, Info, AlertTriangle } from 'lucide-react';

const SafetyDisclaimer = ({ type }) => {
  const disclaimers = {
    general: "NutriScan AI provides educational nutrition information and AI-based estimates. It is not a medical diagnosis or a replacement for professional medical advice.",
    pregnancy: "Pregnancy-related food guidance should be verified with a qualified healthcare professional. Do not rely solely on automated suggestions during pregnancy.",
    freshness: "Freshness is an image-based estimate and cannot guarantee that food is safe to eat. Never consume food showing signs of rot, off-smell, or mold.",
    ingredient: "Ingredient detection is an AI-based estimate. Verify ingredients manually when accuracy is important. Hidden ingredients like salt, oil, and spices cannot be determined reliably from an image."
  };

  const isWarning = type === 'pregnancy' || type === 'freshness';

  return (
    <div className={`rounded-2xl p-4 flex gap-3.5 items-start ${isWarning ? 'bg-amber-50/90 border border-amber-200/80 text-amber-900' : 'bg-blue-50/90 border border-blue-200/80 text-blue-900'}`}>
      {isWarning ? (
        <AlertTriangle size={20} className="shrink-0 mt-0.5 text-amber-600" />
      ) : (
        <Info size={20} className="shrink-0 mt-0.5 text-blue-600" />
      )}
      <div className="text-xs leading-relaxed font-medium">
        <span className="font-bold block mb-0.5">
          {type === 'pregnancy' ? '🤰 Healthcare Notice' : type === 'freshness' ? '⚠️ Food Safety Notice' : type === 'ingredient' ? '🥗 Ingredient Verification' : 'ℹ️ Educational Project Notice'}
        </span>
        {disclaimers[type] || disclaimers.general}
      </div>
    </div>
  );
};

export default SafetyDisclaimer;
