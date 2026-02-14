export interface Client {
  id: string;
  name: string;
  email: string;
  status: 'completed' | 'active' | 'overdue';
  revenue: number;
  maintenanceDue: string; // ISO Date
  hostingExpiry: string; // ISO Date
}