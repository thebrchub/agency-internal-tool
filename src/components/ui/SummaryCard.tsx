import { type LucideIcon } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean; // true for green, false for red
  alert?: boolean; // true makes the card red/urgent
}

export const SummaryCard = ({ title, value, icon: Icon, trend, trendUp, alert }: SummaryCardProps) => {
  return (
    // Update border and bg colors
    <div className={`rounded-xl border p-6 shadow-sm transition-all hover:shadow-md ${
      alert 
        ? 'border-red-500/50 bg-red-500/5' 
        : 'border-dark-800 bg-dark-900' // Used new dark colors here
    }`}>
      <div className="flex items-center justify-between">
        <p className={`text-sm font-medium ${alert ? 'text-red-400' : 'text-gray-400'}`}>
          {title}
        </p>
        <div className={`rounded-lg p-2 ${
          alert ? 'bg-red-500/20 text-red-400' : 'bg-gray-800 text-gray-300'
        }`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="mt-4">
        <h3 className="mt-2 text-2xl font-bold text-white font-mono tracking-tight">{value}</h3>
        {trend && (
          <p className={`mt-1 text-xs ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
            {trendUp ? '↑' : '↓'} {trend} from last month
          </p>
        )}
      </div>
    </div>
  );
};