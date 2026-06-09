"use client";

import {
  LayoutDashboard,
  FileText,
  PenTool,
  Users,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "PDFs",
    icon: FileText,
  },
  {
    name: "Signatures",
    icon: PenTool,
  },
  {
    name: "Users",
    icon: Users,
  },
  {
    name: "Activity",
    icon: Activity,
  },
  {
    name: "Settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <aside className="w-20 bg-white border-r h-screen flex flex-col items-center py-6">

      {/* Menu */}

      <div className="flex flex-col gap-5 flex-1">
        {menu.map((item) => (
          <button
            key={item.name}
            title={item.name}
            className="p-3 rounded-xl hover:bg-gray-100 transition"
          >
            <item.icon size={22} />
          </button>
        ))}
      </div>

      {/* Logout */}

      <button
        onClick={handleLogout}
        title="Logout"
        className="
          p-3
          rounded-xl
          text-red-500
          hover:bg-red-50
          transition
          mb-4
        "
      >
        <LogOut size={22} />
      </button>

    </aside>
  );
}