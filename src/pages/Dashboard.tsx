import { DollarSign, Globe, AlertTriangle, CheckCircle } from 'lucide-react';
// REMOVED: import { DashboardLayout } ... we don't need it here anymore!
import { SummaryCard } from '../components/ui/SummaryCard';
import { ClientTable } from '../features/clients/ClientTable';

export const Dashboard = () => {
  return (
    // Changed DashboardLayout to a simple div or Fragment
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">Dashboard</h1>
          <p className="text-sm text-gray-400">Welcome back, Srikanth.</p>
        </div>
        <div className="text-sm text-gray-500 font-mono">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard 
          title="Total Revenue" 
          value="₹1,24,000" 
          icon={DollarSign}
          trend="12%"
          trendUp={true}
        />
        <SummaryCard 
          title="Active Projects" 
          value="8" 
          icon={Globe} 
        />
        <SummaryCard 
          title="Pending Invoices" 
          value="₹45,000" 
          icon={AlertTriangle}
          alert={true} 
          trend="2 Overdue"
          trendUp={false}
        />
        <SummaryCard 
          title="Completed" 
          value="142" 
          icon={CheckCircle} 
        />
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-3">
          {/* ENABLE COMPACT MODE HERE */}
          <ClientTable compact={true} />
        </div>
      </div>
    </div>
  );
};