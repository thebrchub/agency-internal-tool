import { Save, Trash2, Shield, Database } from 'lucide-react';

export const Settings = () => {
  const handleClearData = () => {
    if (confirm('DANGER: This will wipe all saved client data. Are you sure?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="text-2xl font-bold text-white font-display">Settings</h1>
        <p className="text-sm text-gray-400">Manage your agency tool preferences.</p>
      </header>

      {/* Admin Section */}
      <div className="rounded-xl border border-dark-800 bg-dark-900 p-6 space-y-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Shield size={18} className="text-blazing" /> Security
        </h3>
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Master Password</label>
          <input 
            type="password" 
            value="Blazing2026" 
            disabled 
            className="w-full rounded-lg bg-dark-950 border border-dark-800 px-4 py-2 text-gray-500 cursor-not-allowed"
          />
          <p className="text-xs text-gray-600">Password is currently hardcoded in code for security.</p>
        </div>
      </div>

      {/* Data Section */}
      <div className="rounded-xl border border-red-900/20 bg-dark-900 p-6 space-y-4">
        <h3 className="font-bold text-red-400 flex items-center gap-2">
          <Database size={18} /> Danger Zone
        </h3>
        <p className="text-sm text-gray-400">
          Resetting the app will delete all locally stored clients and drafts.
        </p>
        <button 
          onClick={handleClearData}
          className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-500/20 transition-colors"
        >
          <Trash2 size={16} /> Wipe All Data
        </button>
      </div>
    </div>
  );
};