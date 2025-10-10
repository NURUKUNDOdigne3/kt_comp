"use client";

import { useState } from "react";
import {
  UserIcon,
  TruckIcon,
  BoxIcon,
  MapPinIcon,
  HomeIcon,
  ShoppingBagIcon,
  SettingsIcon,
  LockIcon,
  BellIcon,
  UserCircleIcon,
} from "lucide-react";

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo and title */}
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-gray-800">Logistics</h1>
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
            <p className="text-sm font-medium text-gray-800">
              Delivery Process
            </p>
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
              className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <UserIcon className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">User Profile</span>
            </button>
            <button
              onClick={() => setActiveSection("vehicle")}
              className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <TruckIcon className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Vehicle</span>
            </button>
            <button
              onClick={() => setActiveSection("inventory")}
              className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <BoxIcon className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Inventory</span>
            </button>
            <button
              onClick={() => setActiveSection("tracking")}
              className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <MapPinIcon className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Tracking</span>
            </button>
            <button
              onClick={() => setActiveSection("warehouse")}
              className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <HomeIcon className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Warehouse</span>
            </button>
            <button
              onClick={() => setActiveSection("order")}
              className="flex flex-col items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ShoppingBagIcon className="w-6 h-6 text-gray-600" />
              <span className="text-sm mt-1">Order</span>
            </button>
          </div>
        </div>

        {/* Settings & Profile */}
        <div className="p-6 pt-0">
          <h3 className="text-sm font-medium text-gray-600 mb-4">
            Settings & Profile
          </h3>
          <div className="space-y-2">
            <button className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
              <UserIcon className="w-4 h-4 mr-2" />
              User Profile
            </button>
            <button className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
              <LockIcon className="w-4 h-4 mr-2" />
              Change Password
            </button>
            <button className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
              <BellIcon className="w-4 h-4 mr-2" />
              Notification Settings
            </button>
            <button className="flex items-center w-full p-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded">
              <SettingsIcon className="w-4 h-4 mr-2" />
              App Settings
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-gray-500 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Type to search..."
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded relative">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h4l-4 4v-4zM10 17h4v-4h-4v4zm-6 0h4v-4h-4v4zm10-8h4v-4h-4v4zm-6 0h4v-4h-4v4zm-6 0h4v-4h-4v4zm10-8h4v-4h-4v4zm-6 0h4v-4h-4v4zm-6 0h4v-4h-4v4z"
                />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <img
              src="https://avatars.githubusercontent.com/u/123456?v=4"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          </div>
        </header>

        {/* Content area */}
        <div className="p-6 overflow-auto">
          <div className="h-96 bg-gray-50 border border-dashed rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Dashboard content will appear here</p>
          </div>
        </div>
      </main>
    </div>
  );
}
