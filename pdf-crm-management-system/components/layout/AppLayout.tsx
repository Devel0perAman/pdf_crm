"use client";

import FloatingSidebar from "./FloatingSidebar";
import TopNavigation from "./TopNavigation";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#F5F6F8]">

      <FloatingSidebar />

      <TopNavigation />

      <div className="max-w-[1600px] mx-auto px-10 py-10">
        {children}
      </div>

    </main>
  );
}