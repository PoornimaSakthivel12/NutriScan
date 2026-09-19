import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore, calculateAgeFromDOB, getAgeGroupFromAge } from '../store/authStore';
import { authService } from '../services/authService';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Check, ShieldCheck, User, Calendar, Lock, Baby } from 'lucide-react';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const RegisterPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirm: '',
    date_of_birth: '',
    pregnancy_status: 'No'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const calculatedAge = calculateAgeFromDOB(formData.date_of_birth);
  const ageGroup = getAgeGroupFromAge(calculatedAge);

  const handleStep1Next = (e) => {
    e.preventDefault();
    if (!formData.username.trim()) {
      setError("Please enter a username or name.");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (formData.password !== formData.confirm) {
      setError("Passwords do not match.");
      return;
    }
    setError('');
    setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!formData.date_of_birth) {
      setError("Please select your date of birth.");
      return;
    }

    setLoading(true);
    setError('');

    const userData = {
      username: formData.username.trim(),
      password: formData.password,
      date_of_birth: formData.date_of_birth,
      age: calculatedAge,
      age_group: ageGroup,
      pregnancy_status: formData.pregnancy_status
    };

    try {
      // Attempt backend API registration
      const res = await authService.register(userData);
      login(res.data?.user || userData, res.data?.access_token || 'jwt-token-registered');
      navigate('/home');
    } catch (err) {
      console.warn("Backend unavailable, using client state registration:", err);
      // Fallback to local authentication for prototype independence
      login(userData, 'local-token-' + Date.now());
      navigate('/home');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-md mx-auto bg-gray-50 flex flex-col p-6 pb-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between mt-2 mb-6">
        <button 
          onClick={() => step === 2 ? setStep(1) : navigate('/')} 
          className="p-2 bg-white rounded-full shadow-xs border border-gray-200 text-gray-600 hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
        </button>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Step {step} of 2
        </span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">
          {step === 1 ? 'Create Your Account' : 'Set Up Your Profile'}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          {step === 1 
            ? 'Set a username and secure password' 
            : 'Personalize food and nutritional categories'}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-2xl text-xs font-medium mb-4 flex items-center gap-2">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 ? (
          <motion.form 
            key="step1" 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 20 }} 
            onSubmit={handleStep1Next}
            className="space-y-4 flex-1"
          >
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <User size={14} className="text-primary-green" /> Username / Name
                </label>
                <input 
                  type="text" 
                  value={formData.username} 
                  onChange={e => setFormData({ ...formData, username: e.target.value })}
                  placeholder="e.g. Alex"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-primary-green font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Lock size={14} className="text-primary-green" /> Password
                </label>
                <input 
                  type="password" 
                  value={formData.password} 
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  placeholder="At least 6 characters"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-primary-green font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Lock size={14} className="text-primary-green" /> Confirm Password
                </label>
                <input 
                  type="password" 
                  value={formData.confirm} 
                  onChange={e => setFormData({ ...formData, confirm: e.target.value })}
                  placeholder="Re-enter password"
                  required
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-primary-green font-medium"
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-primary-green hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-green-500/20 active:scale-95 transition-all text-sm mt-4"
            >
              Continue to Profile Details
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Already have an account? <Link to="/login" className="text-primary-green font-bold">Login</Link>
            </p>
          </motion.form>
        ) : (
          <motion.form 
            key="step2" 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: -20 }} 
            onSubmit={handleRegister}
            className="space-y-4 flex-1"
          >
            <div className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-700 mb-1.5 flex items-center gap-1.5">
                  <Calendar size={14} className="text-primary-green" /> Date of Birth
                </label>
                <input 
                  type="date" 
                  value={formData.date_of_birth} 
                  onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
                  required
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-primary-green font-medium"
                />
                {formData.date_of_birth && (
                  <div className="mt-2.5 p-2.5 bg-green-50/70 border border-green-100 rounded-xl text-xs flex items-center justify-between">
                    <span className="text-gray-600">Calculated Age: <strong>{calculatedAge} years</strong></span>
                    <span className="bg-primary-green text-white font-bold px-2 py-0.5 rounded-md text-[10px]">
                      {ageGroup} Category
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 mb-2 flex items-center gap-1.5">
                  <Baby size={14} className="text-purple-500" /> Optional Pregnancy Status
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'Yes', label: 'Yes', note: 'Enables tailored maternal guidance' },
                    { id: 'No', label: 'No', note: 'Standard dietary guidance' },
                    { id: 'Prefer not to say', label: 'Prefer not to say', note: 'Standard dietary guidance' }
                  ].map(opt => (
                    <label 
                      key={opt.id}
                      onClick={() => setFormData({ ...formData, pregnancy_status: opt.id })}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                        formData.pregnancy_status === opt.id 
                          ? 'border-primary-green bg-green-50/70 font-bold text-green-950 shadow-xs' 
                          : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div>
                        <span>{opt.label}</span>
                        <span className="block text-[10px] text-gray-400 font-normal">{opt.note}</span>
                      </div>
                      {formData.pregnancy_status === opt.id && <Check size={16} className="text-primary-green" />}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary-green hover:bg-green-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-green-500/20 active:scale-95 transition-all text-sm mt-4 disabled:opacity-60"
            >
              {loading ? 'Creating Profile...' : 'Complete Setup & Go to Dashboard'}
            </button>

            <SafetyDisclaimer type="general" />
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterPage;
