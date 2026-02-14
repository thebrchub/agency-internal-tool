type StatusType = 'active' | 'completed' | 'overdue' | 'pending';

const styles: Record<StatusType, string> = {
  active: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  completed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  overdue: 'bg-red-500/10 text-red-400 border-red-500/20',
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
};

export const StatusBadge = ({ status }: { status: StatusType }) => {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide ${styles[status]}`}
    >
      {status}
    </span>
  );
};