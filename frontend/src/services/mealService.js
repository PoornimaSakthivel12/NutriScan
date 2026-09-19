import api from './api';

export const mealService = {
  logMeal: async (data) => {
    const response = await api.post('/meals', data);
    return response.data;
  },
  getTodayMeals: async () => {
    const response = await api.get('/meals');
    return response.data;
  },
  getWeeklyMeals: async () => {
    const response = await api.get('/meals/weekly');
    return response.data;
  },
  deleteMeal: async (id) => {
    const response = await api.delete(`/meals/${id}`);
    return response.data;
  }
};
