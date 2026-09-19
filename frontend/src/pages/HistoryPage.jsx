import { useNavigate } from 'react-router-dom';
import { useHistoryStore } from '../store/historyStore';
import ScanHistoryCard from '../components/ScanHistoryCard';
import { Camera, Trash2, ArrowLeft } from 'lucide-react';
import SafetyDisclaimer from '../components/SafetyDisclaimer';

const HistoryPage = () => {
  const scans = useHistoryStore(state => state.scans);
  const clearHistory = useHistoryStore(state => state.clearHistory);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50/70 p-5 pb-28">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pt-2">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">📋 Scan History</h1>
          <p className="text-xs text-gray-500 font-medium">Your past food and nutrition analyses</p>
        </div>
        {scans.length > 0 && (
          <button 
            onClick={clearHistory}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
            title="Clear History"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>

      {/* Scans List */}
      <div className="space-y-3 mb-6">
        {scans && scans.length > 0 ? (
          scans.map(scan => (
            <ScanHistoryCard key={scan.id} scan={scan} />
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-6 space-y-3">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-2">
              📷
            </div>
            <h3 className="font-bold text-gray-800 text-sm">No Scans Recorded Yet</h3>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Scan or upload food photos to estimate ingredients, check visual freshness, and analyze nutrition.
            </p>
            <button 
              onClick={() => navigate('/scan')}
              className="mt-2 bg-primary-green text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all"
            >
              Scan Food Now
            </button>
          </div>
        )}
      </div>

      <SafetyDisclaimer type="general" />
    </div>
  );
};

export default HistoryPage;
