import { useState } from 'react';
import { useAuthStore, calculateAgeFromDOB, getAgeGroupFromAge } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, Edit3, Baby, Calendar, User, ShieldCheck, 
  HelpCircle, ChevronRight, Check, Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const ProfilePage = () => {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const updateUser = useAuthStore(state => state.updateUser);
  const setPregnancyStatus = useAuthStore(state => state.setPregnancyStatus);
  const navigate = useNavigate();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showPregnancyModal, setShowPregnancyModal] = useState(false);

  // Edit form state
  const [editName, setEditName] = useState(user?.username || user?.name || '');
  const [editDob, setEditDob] = useState(user?.date_of_birth || '1998-04-12');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const age = calculateAgeFromDOB(editDob);
    const age_group = getAgeGroupFromAge(age);
    updateUser({
      username: editName,
      date_of_birth: editDob,
      age,
      age_group
    });
    setShowEditModal(false);
  };

  const handleSelectPregnancy = (status) => {
    setPregnancyStatus(status);
    setShowPregnancyModal(false);
  };

  const age = user?.age || calculateAgeFromDOB(user?.date_of_birth);
  const ageGroup = user?.age_group || getAgeGroupFromAge(age);

  return (
    <div className="min-h-screen bg-gray-50/70 p-5 pb-28">
      {/* Header */}
      <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-5 pt-2">
        👤 User Profile
      </h1>

      {/* Main Profile Identity Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center space-y-4 mb-5 relative overflow-hidden">
        <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-primary-green to-emerald-400 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-green-500/20">
          {(user?.username || user?.name || 'U')[0].toUpperCase()}
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">{user?.username || user?.name || 'User'}</h2>
          <span className="inline-block mt-1 bg-green-50 text-primary-green px-3 py-0.5 rounded-full text-xs font-bold">
            {ageGroup} Category ({age} yrs)
          </span>
        </div>

        {/* Profile Attributes Grid */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-gray-100 text-left text-xs">
          <div className="bg-gray-50 p-3 rounded-2xl">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">🎂 Date of Birth</span>
            <span className="font-bold text-gray-800">{user?.date_of_birth || '1998-04-12'}</span>
          </div>

          <div className="bg-gray-50 p-3 rounded-2xl">
            <span className="text-gray-400 block text-[10px] uppercase font-bold">🎯 Age Group</span>
            <span className="font-bold text-gray-800">{ageGroup}</span>
          </div>

          <div className="col-span-2 bg-purple-50/80 border border-purple-100 p-3 rounded-2xl flex justify-between items-center">
            <div>
              <span className="text-purple-600 block text-[10px] uppercase font-bold">🤰 Pregnancy Status</span>
              <span className="font-bold text-purple-950">{user?.pregnancy_status || 'Prefer not to say'}</span>
            </div>
            <button 
              onClick={() => setShowPregnancyModal(true)}
              className="text-xs font-bold text-purple-700 bg-white px-3 py-1.5 rounded-xl shadow-xs hover:bg-purple-100/50 transition-colors"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <button 
          onClick={() => {
            setEditName(user?.username || user?.name || '');
            setEditDob(user?.date_of_birth || '1998-04-12');
            setShowEditModal(true);
          }}
          className="w-full bg-white border border-gray-200/80 p-4 rounded-2xl text-xs font-bold text-gray-800 flex items-center justify-between shadow-xs hover:bg-gray-50 transition-colors active:scale-98"
        >
          <div className="flex items-center gap-3">
            <Edit3 size={18} className="text-primary-green" />
            <span>Edit Profile Info</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        <button 
          onClick={() => setShowPregnancyModal(true)}
          className="w-full bg-white border border-gray-200/80 p-4 rounded-2xl text-xs font-bold text-gray-800 flex items-center justify-between shadow-xs hover:bg-gray-50 transition-colors active:scale-98"
        >
          <div className="flex items-center gap-3">
            <Baby size={18} className="text-purple-500" />
            <span>Update Pregnancy Mode</span>
          </div>
          <ChevronRight size={16} className="text-gray-400" />
        </button>

        <button 
          onClick={handleLogout} 
          className="w-full bg-red-50 hover:bg-red-100/80 border border-red-100 text-red-600 font-bold p-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-colors active:scale-98 mt-4"
        >
          <LogOut size={16} /> Log Out
        </button>
      </div>

      <SafetyDisclaimer type="general" />

      {/* Edit Profile Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl"
            >
              <h3 className="font-bold text-gray-900 text-base">Edit User Profile</h3>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">Username / Name</label>
                  <input 
                    type="text" 
                    value={editName} 
                    onChange={e => setEditName(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-primary-green" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-600 mb-1 block">Date of Birth</label>
                  <input 
                    type="date" 
                    value={editDob} 
                    onChange={e => setEditDob(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-primary-green" 
                  />
                  <p className="text-[10px] text-gray-400 mt-1">Age will be recalculated automatically.</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <button 
                    type="button" 
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 bg-primary-green text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Update Pregnancy Status Modal */}
      <AnimatePresence>
        {showPregnancyModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-sm p-6 space-y-4 shadow-2xl"
            >
              <div>
                <h3 className="font-bold text-gray-900 text-base">Pregnancy Mode Status</h3>
                <p className="text-xs text-gray-500 mt-0.5">Enables personalized pregnancy alerts for foods.</p>
              </div>

              <div className="space-y-2">
                {[
                  { id: 'Yes', label: 'Yes, I am pregnant', desc: 'Activates pregnancy guidance & cautions' },
                  { id: 'No', label: 'No', desc: 'Standard adult dietary analysis' },
                  { id: 'Prefer not to say', label: 'Prefer not to say', desc: 'Standard dietary guidelines' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectPregnancy(opt.id)}
                    className={`w-full p-3 rounded-2xl border text-left flex justify-between items-center transition-all ${
                      user?.pregnancy_status === opt.id 
                        ? 'border-purple-500 bg-purple-50 text-purple-950 font-bold shadow-xs' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs block">{opt.label}</span>
                      <span className="text-[10px] text-gray-400 font-normal">{opt.desc}</span>
                    </div>
                    {user?.pregnancy_status === opt.id && <Check size={16} className="text-purple-600" />}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowPregnancyModal(false)}
                className="w-full py-2.5 border border-gray-200 rounded-xl text-xs font-semibold text-gray-600"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfilePage;
