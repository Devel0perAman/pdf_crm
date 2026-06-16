"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  FileText,
  FilePlus,
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

  const adminMenu = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      label: "Documents",
      href: "/dashboard/pdfs",
      icon: FileText,
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
  ];

  const userMenu = [
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
      label: "Activity",
      href: "/dashboard/activity",
      icon: Activity,
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const menuItems =
    isAdmin
      ? adminMenu
      : userMenu;

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
    <>
      {/* Desktop Sidebar */}

      <div
        className="
          hidden
          lg:block
          fixed
          left-8
          top-1/2
          -translate-y-1/2
          z-50
        "
      >
        <div
          className="
            bg-white
            rounded-[36px]
            border
            shadow-xl
            p-4
            flex
            flex-col
            gap-4
          "
        >
          {menuItems.map((item) => {
            const active =
              pathname === item.href ||
              pathname.startsWith(
                item.href + "/"
              );

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
                  transition-all
                  duration-200
                  ${
                    active
                      ? "bg-green-500 text-white shadow-lg"
                      : "hover:bg-gray-100 text-gray-600"
                  }
                `}
              >
                <item.icon size={20} />
              </Link>
            );
          })}

          <div className="border-t pt-4">
            <button
              onClick={
                handleLogout
              }
              title="Logout"
              className="
                h-14
                w-14
                rounded-2xl
                flex
                items-center
                justify-center
                transition
                hover:bg-red-50
                text-red-500
              "
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}

      <div
        className="
          lg:hidden
          fixed
          bottom-4
          left-1/2
          -translate-x-1/2
          z-50
          w-[95%]
          max-w-md
        "
      >
        <div
          className="
            bg-white
            border
            rounded-3xl
            shadow-xl
            px-3
            py-2
            flex
            items-center
            justify-around
          "
        >
          {menuItems.map(
            (item) => {
              const active =
                pathname ===
                  item.href ||
                pathname.startsWith(
                  item.href + "/"
                );

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.label}
                  className={`
                    h-12
                    w-12
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    transition
                    ${
                      active
                        ? "bg-green-500 text-white"
                        : "text-gray-600"
                    }
                  `}
                >
                  <item.icon
                    size={18}
                  />
                </Link>
              );
            }
          )}

          <button
            onClick={
              handleLogout
            }
            title="Logout"
            className="
              h-12
              w-12
              rounded-xl
              flex
              items-center
              justify-center
              text-red-500
            "
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </>
  );
}