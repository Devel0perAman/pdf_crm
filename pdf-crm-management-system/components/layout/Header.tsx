"use client";

import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">
      <div className="flex items-center gap-3">
        <Search size={20} />

        <input
          placeholder="Search PDFs..."
          className="outline-none bg-transparent"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell />

        <div className="h-10 w-10 rounded-full bg-green-500" />
      </div>
    </header>
  );
}