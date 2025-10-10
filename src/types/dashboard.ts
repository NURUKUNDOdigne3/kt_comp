export interface DeliveryStatus {
  id: string | number;
  title: string;
  status: 'In Transit' | 'Delivered' | 'Out for Delivery' | 'Pending';
  destination: string;
  time: string;
}

export interface PerformanceMetric {
  label: string;
  value: number;
  color: string;
}

export interface Task {
  id: string | number;
  title: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

export interface DashboardStats {
  deliveries: number;
  onTheWay: number;
  targetProgress: number;
}

export interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  path: string;
}

export interface DashboardSection {
  id: string;
  title: string;
  component: React.ComponentType<any>;
}