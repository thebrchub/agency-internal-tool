import React, { useState } from 'react';
import { LayoutDashboard, Users, CreditCard, Settings, LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../assets/logo.svg';

interface Props {
  children: React.ReactNode;
  currentView: string;
  onNavigate: (view: string) => void;
}

export const DashboardLayout = ({ children, currentView, onNavigate }: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('agency_access');
    window.location.reload();
  };

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'revenue', icon: CreditCard, label: 'Revenue & Invoices' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen bg-dark-950 text-gray-100 font-sans selection:bg-blazing/30 selection:text-white">
      
      {/* SIDEBAR */}
      <aside 
        className={`hidden md:flex flex-col border-r border-dark-800 bg-gradient-to-b from-dark-900 to-dark-950 transition-all duration-300 ease-in-out relative ${
          isCollapsed ? 'w-20' : 'w-72'
        }`}
      >
        {/* Toggle Button (Floating on Border) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-dark-700 bg-dark-800 text-gray-400 hover:bg-blazing hover:text-white hover:border-blazing transition-all shadow-xl shadow-black"
        >
          {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>

        {/* Brand Logo */}
        <div className={`flex items-center gap-3 p-6 mb-2 ${isCollapsed ? 'justify-center px-0' : ''}`}>
          <img 
            src={logo} 
            alt="Blazing Logo" 
            className={`object-contain transition-all duration-300 ${isCollapsed ? 'h-8 w-8' : 'h-9 w-9'}`} 
          />
          {/* Text fades out when collapsed */}
          <div className={`overflow-hidden transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'}`}>
            <span className="text-xl font-bold tracking-tight text-white font-display whitespace-nowrap">
              Blazing Admin
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1 px-3 flex-1">
          {navItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                title={isCollapsed ? item.label : ''} // Tooltip for collapsed mode
                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 relative overflow-hidden w-full ${
                  isActive
                    ? 'text-white bg-dark-800/50' 
                    : 'text-gray-400 hover:bg-dark-800/30 hover:text-gray-200'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                {/* Active Indicator Line */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-blazing shadow-[0_0_12px_2px_rgba(255,69,0,0.4)] animate-in fade-in slide-in-from-left-2 duration-300"></div>
                )}

                {/* Icon */}
                <item.icon 
                  size={20} 
                  className={`relative z-10 transition-colors duration-200 ${
                    isActive ? 'text-blazing' : 'group-hover:text-white'
                  }`} 
                />
                
                {/* Label (Hidden when collapsed) */}
                <span className={`whitespace-nowrap relative z-10 transition-all duration-300 ${
                  isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'
                }`}>
                  {item.label}
                </span>

                {/* Subtle Hover Glow Background */}
                {!isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-dark-800/0 via-dark-800/50 to-dark-800/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer / Logout */}
        <div className="p-3 mt-auto">
          <button
            onClick={handleLogout}
            title={isCollapsed ? "Logout" : ""}
            className={`group flex w-full items-center gap-3 rounded-xl border border-dark-800/50 bg-dark-900/30 px-3 py-3 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:border-red-500/20 transition-all ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
            <span className={`whitespace-nowrap transition-all duration-300 ${
              isCollapsed ? 'w-0 opacity-0 hidden' : 'w-auto opacity-100'
            }`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area - FULL WIDTH FIX */}
        <main className="flex-1 overflow-y-auto bg-dark-950 p-4 md:p-8">
        {/* Removed mx-auto and max-w-7xl here */}
        <div className="w-full h-full"> 
            {children}
        </div>
        </main>
    </div>
  );
};