import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';

// Pages
import OnboardingPage from './pages/OnboardingPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ScannerPage from './pages/ScannerPage';
import FoodAnalysisPage from './pages/FoodAnalysisPage';
import IngredientDetailPage from './pages/IngredientDetailPage';
import SearchPage from './pages/SearchPage';
import DietBalancePage from './pages/DietBalancePage';
import WeeklyOverviewPage from './pages/WeeklyOverviewPage';
import HistoryPage from './pages/HistoryPage';
import HistoryDetailPage from './pages/HistoryDetailPage';
import ProfilePage from './pages/ProfilePage';
import BottomNavigation from './components/BottomNavigation';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? (
    <div className="pb-16 w-full max-w-md mx-auto bg-white min-h-screen relative shadow-2xl overflow-hidden">
      {children}
      <BottomNavigation />
    </div>
  ) : <Navigate to="/login" replace />;
};

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <Router>
      <div className="w-full flex justify-center bg-gray-100 min-h-screen">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <OnboardingPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/scan" element={<ProtectedRoute><ScannerPage /></ProtectedRoute>} />
          <Route path="/analysis/:foodId" element={<ProtectedRoute><FoodAnalysisPage /></ProtectedRoute>} />
          <Route path="/ingredient/:name" element={<ProtectedRoute><IngredientDetailPage /></ProtectedRoute>} />
          <Route path="/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
          <Route path="/diet" element={<ProtectedRoute><DietBalancePage /></ProtectedRoute>} />
          <Route path="/diet/weekly" element={<ProtectedRoute><WeeklyOverviewPage /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
          <Route path="/history/:id" element={<ProtectedRoute><HistoryDetailPage /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
