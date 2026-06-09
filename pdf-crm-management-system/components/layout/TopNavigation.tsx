"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Bell,
  Moon,
  MapPin,
} from "lucide-react";

export default function TopNavigation() {
  const pathname = usePathname();

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
            <Bell size={17} />
          </button>

        </div>

      </div>

    </header>
  );
}