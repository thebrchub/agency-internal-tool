import React, { useState } from 'react';
import logo from '../../assets/logo.svg';

interface Props {
  children: React.ReactNode;
}

export const PasswordGate = ({ children }: Props) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(
    localStorage.getItem('agency_access') === 'true'
  );

  const handleAccess = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Blazing2026') { 
      localStorage.setItem('agency_access', 'true');
      setIsAuthorized(true);
    } else {
      alert('Wrong password, Macha!');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-950 p-4 font-sans selection:bg-blazing/30">
        {/* INCREASED max-w-md and p-12 for a more substantial feel */}
        <div className="w-full max-w-md transform rounded-[2rem] border border-dark-800 bg-dark-900 p-12 shadow-[0_0_80px_-15px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-500">
          
          {/* Brand Identity */}
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 rounded-full bg-blazing opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500"></div>
                <img 
                  src={logo} 
                  alt="BRC HUB LLP Logo" 
                  className="relative h-20 w-20 object-contain" // Slightly larger logo
                />
              </div>
            </div>
            <h1 className="text-3xl font-black tracking-tighter text-white font-display uppercase">
              BRC HUB LLP
            </h1>
            <p className="mt-3 text-xs font-bold uppercase tracking-[0.3em] text-gray-400">
              Agency Nerve Center
            </p>
          </div>

          <form onSubmit={handleAccess} className="space-y-8">
            <div className="space-y-3">
              <label className="ml-1 text-xs font-bold uppercase tracking-widest text-gray-500">
                Security Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                // INCREASED py-5 and text-xl for a beefier input
                className="w-full rounded-2xl bg-dark-950 border border-dark-800 px-6 py-5 text-white text-xl tracking-[0.5em] placeholder-dark-800 outline-none ring-offset-dark-900 focus:ring-2 focus:ring-blazing/50 focus:border-blazing transition-all"
                placeholder="••••••••"
                autoFocus
              />
            </div>

            <button
              type="submit"
              // INCREASED py-5 and text-base for a stronger button
              className="group relative w-full overflow-hidden rounded-2xl bg-blazing py-5 text-base font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-blazing/20 transition-all hover:bg-blazing-light hover:shadow-blazing/40 active:scale-[0.98]"
            >
              <span className="relative z-10">Access Dashboard</span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          <p className="mt-12 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 font-mono opacity-80">
            SECURE ACCESS ONLY • 2026 EDITION
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};