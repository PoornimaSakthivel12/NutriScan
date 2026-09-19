import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const calculateAgeFromDOB = (dob) => {
  if (!dob) return 24;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return Math.max(0, age);
};

export const getAgeGroupFromAge = (age) => {
  if (age < 13) return 'Child';
  if (age < 20) return 'Teen';
  if (age < 60) return 'Adult';
  return 'Senior';
};

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: {
        id: 1,
        username: 'Pooja Sharma',
        date_of_birth: '1998-04-12',
        age: 26,
        age_group: 'Adult',
        pregnancy_status: 'No' // 'Yes' | 'No' | 'Prefer not to say'
      },
      token: 'demo-jwt-token-nutriscan',
      isAuthenticated: true,

      login: (user, token) => {
        const age = user.age || calculateAgeFromDOB(user.date_of_birth);
        const age_group = user.age_group || getAgeGroupFromAge(age);
        set({
          user: {
            ...user,
            age,
            age_group,
            username: user.username || user.name || 'User'
          },
          token: token || 'demo-jwt-token',
          isAuthenticated: true
        });
      },

      logout: () => set({ user: null, token: null, isAuthenticated: false }),

      updateUser: (updates) => {
        const currentUser = get().user || {};
        let age = updates.date_of_birth ? calculateAgeFromDOB(updates.date_of_birth) : (currentUser.age || 24);
        let age_group = getAgeGroupFromAge(age);
        set({
          user: {
            ...currentUser,
            ...updates,
            age,
            age_group
          }
        });
      },

      setPregnancyStatus: (status) => {
        const currentUser = get().user || {};
        set({
          user: {
            ...currentUser,
            pregnancy_status: status
          }
        });
      }
    }),
    {
      name: 'nutriscan-auth-storage',
    }
  )
);
