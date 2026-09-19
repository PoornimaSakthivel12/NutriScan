import { create } from 'zustand';

export const useFoodStore = create((set) => ({
  currentFood: null,
  ingredients: [],
  analysisResult: null,
  isLoading: false,
  setFood: (food) => set({ currentFood: food }),
  setIngredients: (ingredients) => set({ ingredients }),
  setAnalysis: (result) => set({ analysisResult: result }),
  setLoading: (status) => set({ isLoading: status }),
  clearFood: () => set({ currentFood: null, ingredients: [], analysisResult: null }),
}));
