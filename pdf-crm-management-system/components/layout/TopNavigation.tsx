"use client";

import { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bell,
  Moon,
  MapPin,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import {
  getNotifications,
} from "@/services/notification.service";

interface Notification {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function TopNavigation() {
  const pathname = usePathname();

  const [open, setOpen] =
    useState(false);

  const [
    notifications,
    setNotifications,
  ] = useState<Notification[]>(
    []
  );

  const dropdownRef =
  useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleClickOutside = (
    event: MouseEvent
  ) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(
        event.target as Node
      )
    ) {
      setOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () =>
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
}, []);

  useEffect(() => {
    const loadNotifications =
      async () => {
        try {
          const response =
            await getNotifications();

          setNotifications(
            response.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    loadNotifications();
  }, []);

  const unreadCount =
    notifications.filter(
      (item) => !item.isRead
    ).length;

  return (
    <header className="px-8 lg:px-12 py-6">

      <div className="flex items-center justify-between">

        {/* Left Logo */}

        <Link
          href="/dashboard"
          className="flex items-center justify-center"
        >
          <div
            className="
              h-12
              w-12
              rounded-2xl
              bg-black
              text-white
              flex
              items-center
              justify-center
              text-xl
              font-bold
              shadow-lg
            "
          >
            P
          </div>
        </Link>

        {/* Center Navigation */}

        <div
          className="
            bg-white/80
            backdrop-blur-xl
            border
            border-white/50
            rounded-2xl
            p-1.5
            flex
            items-center
            gap-1
            shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          "
        >

          <Link
            href="/dashboard"
            className={`
              px-6
              py-2.5
              rounded-xl
              text-sm
              font-medium
              transition
              ${
                pathname === "/dashboard"
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }
            `}
          >
            Dashboard
          </Link>

          <Link
            href="/dashboard/pdfs"
            className={`
              px-6
              py-2.5
              rounded-xl
              text-sm
              font-medium
              transition
              ${
                pathname.startsWith(
                  "/dashboard/pdfs"
                )
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }
            `}
          >
            Documents
          </Link>

          <Link
            href="/dashboard/analytics"
            className={`
              px-6
              py-2.5
              rounded-xl
              text-sm
              font-medium
              transition
              ${
                pathname ===
                "/dashboard/analytics"
                  ? "bg-gray-100"
                  : "hover:bg-gray-100"
              }
            `}
          >
            Analytics
          </Link>

        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <div
            className="
              bg-white/80
              backdrop-blur-xl
              border
              border-white/50
              rounded-2xl
              px-4
              py-2.5
              flex
              items-center
              gap-2
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
            "
          >
            <MapPin
              size={15}
              className="text-gray-500"
            />

            <span className="text-sm text-gray-500">
              PDF CRM Workspace
            </span>

          </div>

          {/* Theme Button */}

          <button
            className="
              h-11
              w-11
              bg-white/80
              backdrop-blur-xl
              border
              border-white/50
              rounded-2xl
              flex
              items-center
              justify-center
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              hover:bg-white
              transition
            "
          >
            <Moon size={17} />
          </button>

          {/* Notifications */}

          <div
  className="relative"
  ref={dropdownRef}
>

            <button
  onClick={() => setOpen(!open)}
  className="
    relative
    h-11
    w-11
    bg-white/80
    backdrop-blur-xl
    border
    border-white/50
    rounded-2xl
    flex
    items-center
    justify-center
    shadow-[0_8px_30px_rgba(0,0,0,0.06)]
    hover:bg-white
    transition
  "
>
              <Bell size={17} />

            {unreadCount > 0 && (
  <span
    className="
      absolute
      -top-1.5
      -right-1.5
      min-w-[18px]
      h-[18px]
      px-1
      rounded-full
      bg-red-500
      text-white
      text-[10px]
      font-bold
      flex
      items-center
      justify-center
      leading-none
      z-50
      border-2
      border-white
    "
  >
    {unreadCount > 99
      ? "99+"
      : unreadCount}
  </span>
)}
            </button>

          {open && (
  <div
    className="
      absolute
      top-24
      right-0
      w-[360px]
      bg-white
      border
      rounded-3xl
      shadow-2xl
      p-4
      z-[999]
    "
    style={{
      right: -10,
      marginTop: 5,
      zIndex: 999,
      transform: "translateX(0px)",
    }}
  >

                <div className="flex items-center justify-between mb-4">

                  <h3 className="font-semibold text-lg">
                    Notifications
                  </h3>

                  <span className="text-xs text-gray-500">
                    {notifications.length}
                  </span>

                </div>

                <div
  className="
    max-h-[65vh]
    overflow-y-auto
    space-y-3
    pr-1
  "
>

                  {notifications.length ===
                  0 ? (
                    <div className="text-center py-10 text-gray-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.map(
                      (item) => (
                        <div
                          key={item.id}
                          className="
                            border
                            rounded-2xl
                            p-4
                            hover:bg-gray-50
                            transition
                          "
                        >

                          <div className="flex items-center justify-between">

                            <h4 className="font-semibold">
                              {item.title}
                            </h4>

                            {!item.isRead && (
                              <span
                                className="
                                  h-2
                                  w-2
                                  rounded-full
                                  bg-green-500
                                "
                              />
                            )}

                          </div>

                          <p className="text-sm text-gray-500 mt-1">
                            {item.message}
                          </p>

                          <p className="text-xs text-gray-400 mt-2">
                            {new Date(
                              item.createdAt
                            ).toLocaleString()}
                          </p>

                        </div>
                      )
                    )
                  )}

                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </header>
  );
}