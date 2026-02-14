import { DollarSign, FileText, TrendingUp, AlertCircle } from 'lucide-react';
import { SummaryCard } from '../components/ui/SummaryCard';
import { StatusBadge } from '../components/ui/StatusBadge';

const INVOICES = [
  { id: 'INV-001', client: 'Urban Cafe', amount: '₹45,000', date: '2026-02-01', status: 'paid' },
  { id: 'INV-002', client: 'TechStart Pvt Ltd', amount: '₹1,20,000', date: '2026-02-10', status: 'overdue' },
  { id: 'INV-003', client: 'FitLife Gym', amount: '₹5,000', date: '2026-02-14', status: 'pending' },
] as const;

export const Revenue = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-white font-display">Revenue & Invoices</h1>
        <p className="text-sm text-gray-400">Track your agency's cash flow.</p>
      </header>

      {/* Revenue Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard 
          title="Total Collected" 
          value="₹1,24,000" 
          icon={DollarSign} 
          trend="12%" 
          trendUp={true} 
        />
        <SummaryCard 
          title="Pending Invoices" 
          value="₹5,000" 
          icon={FileText} 
        />
        <SummaryCard 
          title="Overdue Amount" 
          value="₹1,20,000" 
          icon={AlertCircle} 
          alert={true} 
        />
      </div>

      {/* Invoice Table */}
      <div className="rounded-xl border border-dark-800 bg-dark-900 overflow-hidden">
        <div className="border-b border-dark-800 px-6 py-4">
          <h3 className="font-bold text-white">Recent Invoices</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="bg-dark-950 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-3 font-medium">Invoice ID</th>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-dark-800">
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="hover:bg-dark-800/50 transition-colors">
                  <td className="px-6 py-4 font-mono text-xs">{inv.id}</td>
                  <td className="px-6 py-4 font-medium text-white">{inv.client}</td>
                  <td className="px-6 py-4">{inv.date}</td>
                  <td className="px-6 py-4 font-mono text-white">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <StatusBadge status={inv.status as any} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};