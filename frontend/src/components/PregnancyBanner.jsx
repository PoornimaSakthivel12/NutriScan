import { useAuthStore } from '../store/authStore';
import { Baby } from 'lucide-react';

const PregnancyBanner = () => {
  const user = useAuthStore(state => state.user);

  if (user?.pregnancy_status !== 'Yes') return null;

  return (
    <div className="bg-gradient-to-r from-purple-100 to-purple-50 border border-purple-200 rounded-xl p-3 flex items-center gap-3 my-4 shadow-sm">
      <div className="bg-white p-2 rounded-full text-purple-500 shadow-sm">
        <Baby size={20} />
      </div>
      <div>
        <h4 className="text-sm font-semibold text-purple-900">Pregnancy Mode Active</h4>
        <p className="text-xs text-purple-700">Analysis customized for pregnancy guidelines.</p>
      </div>
    </div>
  );
};

export default PregnancyBanner;
