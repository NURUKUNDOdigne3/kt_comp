"use client";

import { useState } from "react";
import {
  User,
  Truck,
  Box,
  MapPin,
  Home,
  ShoppingBag,
  Settings,
  Lock,
  Bell,
  UserCircle,
  Search,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={cn(
        "w-64 bg-white shadow-lg flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo and title */}
        <div className="p-6 border-b flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">Logistics</h1>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Key metrics */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Deliveries</p>
              <p className="text-2xl font-bold text-gray-800">25.9k</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">On the way</p>
              <p className="text-2xl font-bold text-gray-800">4.6k</p>
            </div>
          </div>

          {/* Delivery Process */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-800">Delivery Process</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: "30%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">Reached 30% from target</p>
          </div>
        </div>

        {/* Pages */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Pages</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveSection("profile")}
              className={cn(
                "flex flex-col items-center p-3 border border-gray-200 rounded-lg transition-colors",
                activeSection === "profile" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
              )}
            >
              <User className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">User Profile</span>
            </button>
            <button
              onClick={() => setActiveSection("vehicle")}
              className={cn(
                "flex flex-col items-center p-3 border border-gray-200 rounded-lg transition-colors",
                activeSection === "vehicle" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
              )}
            >
              <Truck className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Vehicle</span>
            </button>
            <button
              onClick={() => setActiveSection("inventory")}
              className={cn(
                "flex flex-col items-center p-3 border border-gray-200 rounded-lg transition-colors",
                activeSection === "inventory" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
              )}
            >
              <Box className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Inventory</span>
            </button>
            <button
              onClick={() => setActiveSection("tracking")}
              className={cn(
                "flex flex-col items-center p-3 border border-gray-200 rounded-lg transition-colors",
                activeSection === "tracking" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
              )}
            >
              <MapPin className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Tracking</span>
            </button>
            <button
              onClick={() => setActiveSection("warehouse")}
              className={cn(
                "flex flex-col items-center p-3 border border-gray-200 rounded-lg transition-colors",
                activeSection === "warehouse" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
              )}
            >
              <Home className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Warehouse</span>
            </button>
            <button
              onClick={() => setActiveSection("order")}
              className={cn(
                "flex flex-col items-center p-3 border border-gray-200 rounded-lg transition-colors",
                activeSection === "order" ? "bg-blue-50 border-blue-200" : "hover:bg-gray-50"
              )}
            >
              <ShoppingBag className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Order</span>
            </button>
          </div>
        </div>

        {/* Settings & Profile */}
        <div className="p-6 pt-0">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Settings & Profile</h3>
          <div className="space-y-2">
            <button className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
              <User className="w-4 h-4 mr-2" />
              User Profile
            </button>
            <button className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </button>
            <button className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
              <Bell className="w-4 h-4 mr-2" />
              Notification Settings
            </button>
            <button className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
              <Settings className="w-4 h-4 mr-2" />
              App Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                className="lg:hidden text-gray-500 hover:text-gray-700"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700">
                <Bell className="h-6 w-6" />
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <UserCircle className="h-6 w-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Content will be added based on active section */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Deliveries</h2>
              {/* Add content here */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Metrics</h2>
              {/* Add content here */}
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Upcoming Tasks</h2>
              {/* Add content here */}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
