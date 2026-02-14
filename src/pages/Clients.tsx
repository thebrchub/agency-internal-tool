import { Users } from 'lucide-react';
import { ClientTable } from '../features/clients/ClientTable';

export const Clients = () => {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Client Management</h1>
          <p className="text-sm text-gray-400">View and manage all your agency partnerships.</p>
        </div>
        <div className="rounded-lg bg-dark-900 border border-dark-800 p-2 text-gray-400">
          <Users size={20} />
        </div>
      </header>

      {/* The Full Table */}
      <ClientTable />
    </div>
  );
};