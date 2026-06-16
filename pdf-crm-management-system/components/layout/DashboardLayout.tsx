"use client";

import FloatingSidebar from "./FloatingSidebar";
import TopNavigation from "./TopNavigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <main
      className="
        min-h-screen
        bg-cover
        bg-center
        bg-no-repeat
        relative
      "
      style={{
        backgroundImage:
          "url('/images/dashboard-bg.jpg')",
      }}
    >
      {/* Optional Dark/Glass Overlay */}

      <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />

      {/* Content Layer */}

      <div className="relative z-10">

        <FloatingSidebar />

        <TopNavigation />

        <div
  className="
    max-w-[1600px]
    mx-auto
    px-4
    sm:px-6
    lg:pl-32
    lg:pr-12
    py-6
    lg:py-10
  "
>
          {children}
        </div>

      </div>

    </main>
  );
}