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
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardStats } from "@/types/dashboard";

interface DashboardSidebarProps {
  stats: DashboardStats;
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuClose: () => void;
}

export function DashboardSidebar({
  stats,
  activeSection,
  onSectionChange,
  isMobileMenuOpen,
  onMobileMenuClose,
}: DashboardSidebarProps) {
  return (
    <aside
      className={cn(
        "w-64 bg-white shadow-lg flex flex-col fixed inset-y-0 z-50 transition-transform duration-300 ease-in-out lg:translate-x-0",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Logo and title */}
      <div className="p-6 border-b flex items-center justify-between flex-shrink-0">
        <h1 className="text-xl font-bold text-gray-800">KT Computer Supply</h1>
        <button
          className="lg:hidden text-gray-500 hover:text-gray-700"
          onClick={onMobileMenuClose}
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        {/* Key metrics */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Products</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.deliveries}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Orders</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.onTheWay}
              </p>
            </div>
          </div>

          {/* Sales Progress */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-800">Sales Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${stats.targetProgress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">
              Reached {stats.targetProgress}% from target
            </p>
          </div>
        </div>

        {/* Pages */}
        <div className="p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Pages</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { id: "profile", icon: User, label: "User Profile" },
              { id: "inventory", icon: Box, label: "Inventory" },
              { id: "orders", icon: ShoppingBag, label: "Orders" },
              { id: "shipping", icon: Truck, label: "Shipping" },
              { id: "warehouse", icon: Home, label: "Warehouse" },
              { id: "tracking", icon: MapPin, label: "Tracking" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => onSectionChange(id)}
                className={cn(
                  "flex flex-col items-center p-3 border border-gray-200 rounded-lg transition-colors",
                  activeSection === id
                    ? "bg-blue-50 border-blue-200"
                    : "hover:bg-gray-50"
                )}
              >
                <Icon className="w-6 h-6 text-gray-600" />
                <span className="text-sm mt-1">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Settings & Profile */}
        <div className="p-6 pt-0">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Settings & Profile
          </h3>
          <div className="space-y-2">
            {[
              { id: "user-profile", icon: User, label: "User Profile" },
              { id: "change-password", icon: Lock, label: "Change Password" },
              {
                id: "notifications",
                icon: Bell,
                label: "Notification Settings",
              },
              { id: "settings", icon: Settings, label: "App Settings" },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded"
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}