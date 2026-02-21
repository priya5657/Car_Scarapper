"use client";
import Link from 'next/link'

import {
  Car,
  LayoutDashboard,
  PlusSquare,
  ClipboardList,
} from "lucide-react";

export default function Owner() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <div className="flex items-center gap-3 mb-10">
          <img
            src="https://i.pravatar.cc/100"
            className="w-10 h-10 rounded-full"
          />

          <div>
            <h3 className="font-semibold">Richard Sanford</h3>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            href="/dealer/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:text-blue-500 cursor-pointer"
            >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/dealer/request-scrap"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:text-blue-500 cursor-pointer"
           >
            <PlusSquare size={18} />
            Request Scrap
          </Link>

          <Link
            href="/user/manage-car"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:text-blue-500 cursor-pointer"
            >
            <Car size={18} />
            Manage Cars
          </Link>

          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:text-blue-500 cursor-pointer"
            >
            <ClipboardList size={18} />
          Admin Dashboard
          </Link>

          <Link
            href="/admin/request-scrap"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:text-blue-500 cursor-pointer"
            >
            <PlusSquare size={18} />
          Scrap-request
          </Link>


        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8">

        <h1 className="text-2xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-gray-400 mb-6">
          Monitor platform performance including cars & bookings
        </p>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {["Total Cars", "Total Bookings", "Pending", "Completed"].map(
            (item) => (
              <div
                key={item}
                className="bg-white p-5 rounded-xl shadow"
                >
                <p className="text-gray-400 text-sm">{item}</p>
                <h2 className="text-2xl font-bold mt-2">8</h2>
              </div>
            )
          )}
        </div>

        {/* Content */}
        <div className="grid grid-cols-3 gap-6">

          {/* Recent Bookings */}
          <div className="col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-4">Recent Bookings</h2>

            {[
              ["BMW 3 Series", "$45", "Delivered"],
              ["Ford Explorer", "$65", "Completed"],
              ["Toyota Corolla", "$30", "Pending"],
              ["Tesla Model 3", "$90", "Delivered"],
            ].map((car, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b py-3 last:border-none"
                >
                <span>{car[0]}</span>
                <span>{car[1]}</span>
                <span
                  className={`text-sm ${
                    car[2] === "Pending"
                      ? "text-orange-500"
                      : "text-green-500"
                  }`}
                  >
                  {car[2]}
                </span>
              </div>
            ))}
          </div>

          {/* Revenue */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="font-semibold mb-3">Monthly Revenue</h2>
            <p className="text-gray-400 text-sm mb-4">
              Revenue for current month
            </p>

            <h1 className="text-3xl font-bold text-blue-600">$1060</h1>
          </div>
        </div>
      </main>
    </div>
  );
}
