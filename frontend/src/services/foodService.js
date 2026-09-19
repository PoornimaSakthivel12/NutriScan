import api from './api';

export const foodService = {
  getAllFoods: async () => {
    const response = await api.get('/foods');
    return response.data;
  },
  getFoodById: async (id) => {
    const response = await api.get(`/foods/${id}`);
    return response.data;
  },
  searchFoods: async (query) => {
    const response = await api.get(`/foods/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },
  analyzeFood: async (food_name) => {
    const response = await api.post('/food/analyze', { food_name });
    return response.data;
  },
  scanFood: async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    const response = await api.post('/food/scan', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },
  getFreshness: async (food_name, category) => {
    const response = await api.post('/food/freshness', { food_name, category });
    return response.data;
  },
  performOCR: async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    const response = await api.post('/food/ocr', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  }
};
