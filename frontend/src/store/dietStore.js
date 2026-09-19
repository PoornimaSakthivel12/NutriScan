import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useDietStore = create(
  persist(
    (set, get) => ({
      todayMeals: {
        breakfast: [
          { id: 'm-1', food_id: 21, food_name: 'Idli', calories: 140, quantity: '2 pieces', emoji: '🫓', protein: 4.8, carbs: 28, fat: 0.6, fiber: 1.8 }
        ],
        lunch: [
          { id: 'm-2', food_id: 24, food_name: 'Vegetable Fried Rice', calories: 320, quantity: '1 bowl', emoji: '🍛', protein: 6.5, carbs: 48, fat: 11.2, fiber: 3.4 }
        ],
        snack: [
          { id: 'm-3', food_id: 1, food_name: 'Apple', calories: 95, quantity: '1 medium', emoji: '🍎', protein: 0.5, carbs: 25, fat: 0.3, fiber: 4.4 }
        ],
        dinner: []
      },
      waterGlasses: 5, // Daily water tracker
      weeklyData: [
        { day: 'Mon', calories: 1620, varietyScore: 8, fruitsVegCount: 5 },
        { day: 'Tue', calories: 1840, varietyScore: 9, fruitsVegCount: 6 },
        { day: 'Wed', calories: 1710, varietyScore: 7, fruitsVegCount: 4 },
        { day: 'Thu', calories: 1950, varietyScore: 9, fruitsVegCount: 7 },
        { day: 'Fri', calories: 1880, varietyScore: 8, fruitsVegCount: 5 },
        { day: 'Sat', calories: 2050, varietyScore: 9, fruitsVegCount: 6 },
        { day: 'Sun', calories: 1790, varietyScore: 8, fruitsVegCount: 5 }
      ],

      addMeal: (mealType, meal) => set((state) => ({
        todayMeals: {
          ...state.todayMeals,
          [mealType]: [
            ...state.todayMeals[mealType],
            { ...meal, id: 'm-' + Date.now() }
          ]
        }
      })),

      removeMeal: (mealType, id) => set((state) => ({
        todayMeals: {
          ...state.todayMeals,
          [mealType]: state.todayMeals[mealType].filter((m) => m.id !== id)
        }
      })),

      incrementWater: () => set((state) => ({ waterGlasses: Math.min(16, state.waterGlasses + 1) })),
      decrementWater: () => set((state) => ({ waterGlasses: Math.max(0, state.waterGlasses - 1) })),

      setTodayMeals: (meals) => set({ todayMeals: meals }),
      setWeeklyData: (data) => set({ weeklyData: data }),

      // Computed totals
      getDailyTotals: () => {
        const { todayMeals } = get();
        let totalCal = 0;
        let totalProtein = 0;
        let totalCarbs = 0;
        let totalFat = 0;
        let totalFiber = 0;
        let fruitsCount = 0;
        let vegCount = 0;

        Object.values(todayMeals).forEach(mealList => {
          mealList.forEach(m => {
            totalCal += Number(m.calories || 0);
            totalProtein += Number(m.protein || 0);
            totalCarbs += Number(m.carbs || 0);
            totalFat += Number(m.fat || 0);
            totalFiber += Number(m.fiber || 0);
            const name = (m.food_name || '').toLowerCase();
            if (['apple', 'banana', 'papaya', 'mango', 'orange', 'grapes', 'watermelon', 'dates', 'raisins'].some(f => name.includes(f))) {
              fruitsCount++;
            }
            if (['tomato', 'onion', 'carrot', 'potato', 'cucumber', 'capsicum', 'peas', 'salad', 'curry'].some(f => name.includes(f))) {
              vegCount++;
            }
          });
        });

        return {
          calories: Math.round(totalCal),
          protein: Math.round(totalProtein * 10) / 10,
          carbs: Math.round(totalCarbs * 10) / 10,
          fat: Math.round(totalFat * 10) / 10,
          fiber: Math.round(totalFiber * 10) / 10,
          fruitsCount,
          vegCount
        };
      }
    }),
    {
      name: 'nutriscan-diet-store'
    }
  )
);
