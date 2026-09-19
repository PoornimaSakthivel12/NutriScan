import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useHistoryStore = create(
  persist(
    (set) => ({
      scans: [
        {
          id: 'scan-1',
          food_id: 24,
          food_name: 'Vegetable Fried Rice',
          category: 'Prepared Food',
          confidence: 0.94,
          confidence_percent: '94%',
          freshness_status: 'Fresh',
          freshness_confidence: 0.91,
          emoji: '🍛',
          calories: 320,
          scanned_at: new Date(Date.now() - 3600000 * 3).toISOString()
        },
        {
          id: 'scan-2',
          food_id: 1,
          food_name: 'Apple',
          category: 'Fruit',
          confidence: 0.98,
          confidence_percent: '98%',
          freshness_status: 'Fresh',
          freshness_confidence: 0.94,
          emoji: '🍎',
          calories: 95,
          scanned_at: new Date(Date.now() - 3600000 * 8).toISOString()
        },
        {
          id: 'scan-3',
          food_id: 3,
          food_name: 'Papaya',
          category: 'Fruit',
          confidence: 0.92,
          confidence_percent: '92%',
          freshness_status: 'Ripening',
          freshness_confidence: 0.88,
          emoji: '🧡',
          calories: 62,
          scanned_at: new Date(Date.now() - 3600000 * 26).toISOString()
        }
      ],
      loading: false,

      setScans: (scans) => set({ scans }),
      addScan: (scan) => set((state) => ({ 
        scans: [
          { 
            ...scan, 
            id: scan.id || 'scan-' + Date.now(), 
            scanned_at: scan.scanned_at || new Date().toISOString() 
          }, 
          ...state.scans 
        ] 
      })),
      clearHistory: () => set({ scans: [] }),
      setLoading: (status) => set({ loading: status }),
    }),
    {
      name: 'nutriscan-history-store'
    }
  )
);
