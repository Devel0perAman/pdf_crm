"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, } from "react";

import {
  LayoutDashboard,
  FileText,
  FilePlus,
  PenTool,
  Activity,
  BarChart3,
  Settings,
  LogOut,
  Users,
} from "lucide-react";

export default function FloatingSidebar() {
  const pathname = usePathname();

  const [isAdmin, setIsAdmin] =
    useState(false);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") ||
      "{}"
    );

    setIsAdmin(
      user.role === "admin"
    );
  }, []);

  const menuItems = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "PDFs",
      href: "/dashboard/pdfs",
      icon: FileText,
    },
    {
      label: "Create PDF",
      href: "/dashboard/pdfs/create",
      icon: FilePlus,
    },
    {
      label: "Signatures",
      href: "/dashboard/signatures",
      icon: PenTool,
    },
    {
      label: "Activity",
      href: "/dashboard/activity",
      icon: Activity,
    },
    {
      label: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },

    ...(isAdmin
      ? [
        {
          label: "Users",
          href:
            "/dashboard/users",
          icon: Users,
        },
      ]
      : []),
  ];

  const handleLogout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/";
  };

  return (
    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-50">

      <div className="bg-white rounded-[36px] border shadow-xl p-4 flex flex-col gap-4">

        {menuItems.map((item) => {
          const active =
            pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.label}
              className={`
                h-14
                w-14
                rounded-2xl
                flex
                items-center
                justify-center
                transition
                ${active
                  ? "bg-green-500 text-white"
                  : "hover:bg-gray-100"
                }
              `}
            >
              <item.icon size={20} />
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          title="Logout"
          className="
            h-14
            w-14
            rounded-2xl
            flex
            items-center
            justify-center
            transition
            hover:bg-gray-100
            text-red-500
          "
        >
          <LogOut size={20} />
        </button>

      </div>

    </div>
  );
}