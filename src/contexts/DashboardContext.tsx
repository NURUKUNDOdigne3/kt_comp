"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import type { DeliveryStatus, PerformanceMetric, Task, DashboardStats } from "@/types/dashboard";

interface DashboardContextType {
  // Stats
  stats: DashboardStats;
  updateStats: (newStats: Partial<DashboardStats>) => void;
  
  // Active section
  activeSection: string;
  setActiveSection: (section: string) => void;
  
  // Mobile menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Data
  deliveries: DeliveryStatus[];
  setDeliveries: (deliveries: DeliveryStatus[]) => void;
  metrics: PerformanceMetric[];
  setMetrics: (metrics: PerformanceMetric[]) => void;
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  
  // Actions
  handleSearch: (query: string) => void;
  refreshData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

// Sample data - In a real application, this would come from an API
const initialDeliveries: DeliveryStatus[] = [
  {
    id: 1,
    title: "Order #12345",
    status: "In Transit",
    destination: "New York, NY",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Order #12346",
    status: "Delivered",
    destination: "Los Angeles, CA",
    time: "4 hours ago",
  },
  {
    id: 3,
    title: "Order #12347",
    status: "Out for Delivery",
    destination: "Chicago, IL",
    time: "6 hours ago",
  },
];

const initialMetrics: PerformanceMetric[] = [
  {
    label: "Sales Success Rate",
    value: 98,
    color: "bg-green-500",
  },
  {
    label: "Customer Satisfaction",
    value: 85,
    color: "bg-blue-500",
  },
  {
    label: "Stock Availability",
    value: 92,
    color: "bg-purple-500",
  },
];

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Review Inventory Levels",
    time: "10:00 AM",
    priority: "high",
  },
  {
    id: 2,
    title: "Process Returns",
    time: "2:00 PM",
    priority: "medium",
  },
  {
    id: 3,
    title: "Update Product Listings",
    time: "4:30 PM",
    priority: "low",
  },
];

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  // State
  const [stats, setStats] = useState<DashboardStats>({
    deliveries: 25900,
    onTheWay: 4600,
    targetProgress: 30,
  });
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [deliveries, setDeliveries] = useState<DeliveryStatus[]>(initialDeliveries);
  const [metrics, setMetrics] = useState<PerformanceMetric[]>(initialMetrics);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  // Actions
  const updateStats = useCallback((newStats: Partial<DashboardStats>) => {
    setStats(prev => ({ ...prev, ...newStats }));
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    // Implement search functionality here
    // This would typically involve filtering the data based on the query
  }, []);

  const refreshData = useCallback(async () => {
    try {
      // In a real application, these would be API calls
      // For now, we'll just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update with new data
      setDeliveries(initialDeliveries);
      setMetrics(initialMetrics);
      setTasks(initialTasks);
    } catch (error) {
      console.error("Error refreshing dashboard data:", error);
    }
  }, []);

  const value = {
    stats,
    updateStats,
    activeSection,
    setActiveSection,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    searchQuery,
    setSearchQuery,
    deliveries,
    setDeliveries,
    metrics,
    setMetrics,
    tasks,
    setTasks,
    handleSearch,
    refreshData,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}