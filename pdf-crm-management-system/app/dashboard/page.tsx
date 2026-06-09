"use client";

import { useEffect, useState } from "react";

import {
FileText,
PenTool,
Share2,
ShieldCheck,
Send,
} from "lucide-react";

import {
getDashboardStats,
} from "@/services/dashboard.service";

export default function DashboardPage() {
const [stats, setStats] =
useState({
totalPdfs: 0,
totalSignatures: 0,
});

const [loading, setLoading] =
useState(true);

useEffect(() => {
const loadStats =
async () => {
try {
const response =
await getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

loadStats();

}, []);

return (
   <div className="relative h-[85vh] overflow-hidden rounded-[40px]">
  {/* Background */}

  <div className="absolute inset-0 bg-gradient-to-br from-white via-slate-100 to-slate-200" />

  <div className="absolute inset-0 backdrop-blur-[120px] bg-white/10" />

  {/* Logo / Title */}

  <div className="absolute left-12 top-12 z-10">

    <h1 className="text-7xl font-bold tracking-tight">
      PDF CRM
    </h1>

    <p className="text-2xl text-slate-500 mt-4">
      Professional Document Workspace
    </p>

  </div>

  {/* Empty Workspace */}

  <div
    className="
      absolute
      left-10
      top-44
      w-[760px]
      h-[360px]
      rounded-[40px]
      bg-white/10
      backdrop-blur-3xl
      border border-white/40
    "
  />

  {/* Quick Actions */}

  <div className="absolute right-10 top-10 z-10">

    <div
      className="
        w-[360px]
        rounded-[36px]
        bg-white/20
        backdrop-blur-3xl
        border border-white/40
        p-8
      "
    >

      <h3 className="text-4xl font-semibold">
        Quick Actions
      </h3>

      <p className="text-slate-500 mt-4">
        Manage documents and signatures quickly.
      </p>

      <div className="space-y-4 mt-8">

        <div className="flex items-center gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-5">

          <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">
            <FileText size={24} />
          </div>

          <span className="text-lg">
            Create PDF
          </span>

        </div>

        <div className="flex items-center gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-5">

          <div className="h-12 w-12 rounded-2xl bg-purple-100 flex items-center justify-center">
            <PenTool size={24} />
          </div>

          <span className="text-lg">
            Sign Document
          </span>

        </div>

        <div className="flex items-center gap-4 bg-white/30 backdrop-blur-xl rounded-3xl p-5">

          <div className="h-12 w-12 rounded-2xl bg-blue-100 flex items-center justify-center">
            <Share2 size={24} />
          </div>

          <span className="text-lg">
            Share PDF
          </span>

        </div>

      </div>

    </div>

  </div>

  {/* Search / Message Box */}

  <div className="absolute right-10 top-[470px] z-10">

    <div
      className="
        w-[360px]
        rounded-[32px]
        bg-white/20
        backdrop-blur-3xl
        border border-white/40
        p-5
      "
    >

      <div className="flex items-center gap-3 bg-white/30 rounded-3xl px-5 py-4">

        <input
          placeholder="Search PDFs..."
          className="bg-transparent flex-1 outline-none"
        />

        <Send
          size={22}
          className="text-slate-400"
        />

      </div>

    </div>

  </div>

  {/* Bottom Stats */}

  <div className="absolute bottom-6 left-6 right-6">

    <div className="grid grid-cols-3 gap-6">

      <div
        className="
          rounded-[36px]
          bg-white/20
          backdrop-blur-3xl
          border border-white/40
          p-8
        "
      >

        <div className="flex items-center gap-6">

          <div className="h-20 w-20 rounded-3xl bg-green-100 flex items-center justify-center">
            <FileText
              size={40}
              className="text-green-600"
            />
          </div>

          <div>

            <p className="text-slate-500 text-lg">
              Total PDFs
            </p>

            <h2 className="text-6xl font-bold">
              {loading
                ? "..."
                : stats.totalPdfs}
            </h2>

          </div>

        </div>

      </div>

      <div
        className="
          rounded-[36px]
          bg-white/20
          backdrop-blur-3xl
          border border-white/40
          p-8
        "
      >

        <div className="flex items-center gap-6">

          <div className="h-20 w-20 rounded-3xl bg-purple-100 flex items-center justify-center">
            <PenTool
              size={40}
              className="text-purple-600"
            />
          </div>

          <div>

            <p className="text-slate-500 text-lg">
              Total Signatures
            </p>

            <h2 className="text-6xl font-bold">
              {loading
                ? "..."
                : stats.totalSignatures}
            </h2>

          </div>

        </div>

      </div>

      <div
        className="
          rounded-[36px]
          bg-white/20
          backdrop-blur-3xl
          border border-white/40
          p-8
        "
      >

        <div className="flex items-center gap-6">

          <div className="h-20 w-20 rounded-3xl bg-blue-100 flex items-center justify-center">
            <ShieldCheck
              size={40}
              className="text-blue-600"
            />
          </div>

          <div>

            <p className="text-slate-500 text-lg">
              System Status
            </p>

            <h2 className="text-4xl font-semibold text-green-600">
              Online
            </h2>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

);
}
