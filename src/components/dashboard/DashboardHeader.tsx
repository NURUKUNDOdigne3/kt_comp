"use client";

import { Bell, Menu, Search, UserCircle } from "lucide-react";

interface DashboardHeaderProps {
  onMobileMenuOpen: () => void;
  onSearch?: (query: string) => void;
}

export function DashboardHeader({
  onMobileMenuOpen,
  onSearch,
}: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b px-6 py-4 lg:ml-64 lg:pl-0 lg:pr-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700"
            onClick={onMobileMenuOpen}
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
              onChange={(e) => onSearch?.(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative text-gray-500 hover:text-gray-700">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              3
            </span>
          </button>
          <button className="text-gray-500 hover:text-gray-700">
            <UserCircle className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
