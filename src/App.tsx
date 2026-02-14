import { useState, useEffect } from 'react';
import { PasswordGate } from './features/auth/PasswordGate';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { Clients } from './pages/Clients'; // <--- 1. Import this
import { Revenue } from './pages/Revenue';
import { Settings } from './pages/Settings';
import { Loading } from './components/ui/Loading';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading fullScreen text="Initializing Blazing Admin..." />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard': return <Dashboard />;
      case 'clients': return <Clients />; // <--- 2. Add this case!
      case 'revenue': return <Revenue />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
  <PasswordGate>
    <DashboardLayout currentView={currentView} onNavigate={setCurrentView}>
      {/* Ensure this div is w-full and has no max-width */}
      <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
        {renderContent()}
      </div>
    </DashboardLayout>
  </PasswordGate>
);
}

export default App;