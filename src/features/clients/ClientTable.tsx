import { useState } from 'react';
import { MoreHorizontal, Search, Filter, X, ArrowRight } from 'lucide-react';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { SlideOver } from '../../components/ui/SlideOver';
import { AddClientForm } from './AddClientForm';
import { ClientDetailsModal } from './ClientDetailsModal'; // <--- 1. Imported Modal

// Move this to a separate file later, but for now keep it here
const INITIAL_CLIENTS = [
  {
    id: '1',
    name: 'Urban Cafe',
    service: 'Website + SEO',
    revenue: '₹45,000',
    nextDue: '2026-03-01',
    status: 'active',
    domainExpiry: '12 days',
    // Added mock data for modal
    email: 'contact@urbancafe.com',
    phone: '+91 98765 43210',
    website: 'urbancafe.com',
    domainExpiryDate: '2026-02-26',
    hostingExpiry: '2026-03-01',
    amcDue: '2026-03-01'
  },
  {
    id: '2',
    name: 'TechStart Pvt Ltd',
    service: 'SaaS Dashboard',
    revenue: '₹1,20,000',
    nextDue: '2026-02-10',
    status: 'overdue', 
    domainExpiry: '4 months',
    email: 'admin@techstart.io',
    phone: '+91 88888 88888',
    website: 'techstart.io',
    domainExpiryDate: '2026-06-10',
    hostingExpiry: '2026-06-10',
    amcDue: '2026-02-10'
  },
  {
    id: '3',
    name: 'Dr. Smile Dental',
    service: 'Landing Page',
    revenue: '₹25,000',
    nextDue: '2026-04-15',
    status: 'completed',
    domainExpiry: '1 year',
    email: 'dr.smile@gmail.com',
    phone: '+91 77777 77777',
    website: 'drsmiledental.com',
    domainExpiryDate: '2027-04-15',
    hostingExpiry: '2027-04-15',
    amcDue: '2027-04-15'
  },
  {
    id: '4',
    name: 'FitLife Gym',
    service: 'Maintenance',
    revenue: '₹5,000/mo',
    nextDue: '2026-02-28',
    status: 'active',
    domainExpiry: '2 months',
    email: 'info@fitlifegym.in',
    phone: '+91 99999 00000',
    website: 'fitlifegym.in',
    domainExpiryDate: '2026-04-28',
    hostingExpiry: '2026-04-28',
    amcDue: '2026-02-28'
  },
  {
    id: '5',
    name: 'Blazing Coffee',
    service: 'App Dev',
    revenue: '₹85,000',
    nextDue: '2026-05-20',
    status: 'active',
    domainExpiry: '1 year',
    email: 'hello@blazing.coffee',
    phone: '+91 90000 12345',
    website: 'blazing.coffee',
    domainExpiryDate: '2027-05-20',
    hostingExpiry: '2027-05-20',
    amcDue: '2027-05-20'
  },
];

interface ClientTableProps {
  compact?: boolean;
}

export const ClientTable = ({ compact = false }: ClientTableProps) => {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // 2. New State for Modal
  const [selectedClient, setSelectedClient] = useState<any>(null);

  const handleAddClient = (data: any) => {
    const newClient = {
      id: Math.random().toString(),
      name: data.name,
      service: data.service,
      revenue: `${data.currency === 'INR' ? '₹' : data.currency} ${parseInt(data.totalValue).toLocaleString()}`,
      nextDue: data.amcDue || data.hostingExpiry || 'N/A',
      status: 'active',
      domainExpiry: '1 year',
      // Map form data to modal fields
      email: data.email,
      phone: data.phone,
      domainExpiryDate: data.domainExpiry,
      hostingExpiry: data.hostingExpiry,
      amcDue: data.amcDue
    };
    // @ts-ignore
    setClients([...clients, newClient]);
    setIsAddOpen(false);
  };

  // Logic: In compact mode, we ignore filters and just show the list
  const filteredClients = compact 
    ? clients 
    : clients.filter(client => {
        const matchesSearch = 
          client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          client.service.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
        return matchesSearch && matchesStatus;
      });

  // Limit rows in compact mode
  const displayClients = compact ? filteredClients.slice(0, 5) : filteredClients;

  return (
    <>
      <div className={`rounded-xl border border-dark-800 bg-dark-900 shadow-sm flex flex-col ${compact ? '' : 'h-full'}`}>
        
        {/* --- HEADER --- */}
        {compact ? (
          // Compact Header (Dashboard Mode)
          <div className="flex items-center justify-between border-b border-dark-800 px-6 py-4">
             <h3 className="font-bold text-white font-display">Recent Activity</h3>
             <span className="text-xs text-gray-500 font-mono">Showing top 5</span>
          </div>
        ) : (
          // Full Header (Clients Page Mode)
          <div className="flex flex-col md:flex-row gap-4 justify-between border-b border-dark-800 p-5">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search clients..."
                className="h-9 w-full rounded-lg border border-dark-800 bg-dark-950 pl-9 pr-4 text-sm text-gray-200 focus:border-blazing focus:outline-none focus:ring-1 focus:ring-blazing transition-all placeholder:text-dark-700"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                <select
                  className="h-9 appearance-none rounded-lg border border-dark-800 bg-dark-950 pl-9 pr-8 text-sm text-gray-200 focus:border-blazing focus:outline-none focus:ring-1 focus:ring-blazing cursor-pointer"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
              <button 
                onClick={() => setIsAddOpen(true)}
                className="flex items-center gap-2 rounded-lg bg-blazing px-4 py-2 text-sm font-bold text-white hover:bg-blazing-light shadow-lg shadow-blazing/20"
              >
                + Add Client
              </button>
            </div>
          </div>
        )}
        
        {/* --- TABLE CONTENT --- */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-dark-950 text-xs uppercase text-gray-500 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Service</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Next Invoice</th>
                {!compact && <th className="px-6 py-4 text-right">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {displayClients.map((client) => (
                <tr 
                  key={client.id} 
                  // 3. Click handler for row
                  onClick={() => setSelectedClient(client)}
                  className="group transition-colors hover:bg-dark-800/40 cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-white text-base group-hover:text-blazing-light transition-colors">{client.name}</div>
                    {!compact && <div className="text-xs text-gray-600 font-mono mt-0.5">Expires: {client.domainExpiry}</div>}
                  </td>
                  <td className="px-6 py-4 font-medium">{client.service}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={client.status as any} />
                  </td>
                  <td className="px-6 py-4">
                    <div className={`font-mono ${client.status === 'overdue' ? 'font-bold text-red-400' : 'text-gray-400'}`}>
                      {client.nextDue}
                    </div>
                  </td>
                  {!compact && (
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => {
                           e.stopPropagation(); // Prevent row click when clicking action menu
                           // TODO: Add dropdown menu logic here
                        }}
                        className="rounded p-2 text-gray-500 hover:bg-dark-800 hover:text-white transition-colors"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
            {/* Compact Mode Footer Link */}
            {compact && (
              <tfoot>
                <tr>
                  <td colSpan={4} className="px-6 py-3 text-center border-t border-dark-800">
                    <div className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center justify-center gap-1">
                      Check "Clients" tab for full details <ArrowRight size={12}/>
                    </div>
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* Only render SlideOver if NOT compact */}
      {!compact && (
        <SlideOver 
          isOpen={isAddOpen} 
          onClose={() => setIsAddOpen(false)}
          title="Onboard New Client"
        >
          <AddClientForm 
            onSubmit={handleAddClient}
            onCancel={() => setIsAddOpen(false)}
          />
        </SlideOver>
      )}

      {/* 4. Render the Details Modal */}
      <ClientDetailsModal 
        client={selectedClient} 
        isOpen={!!selectedClient} 
        onClose={() => setSelectedClient(null)} 
      />
    </>
  );
};