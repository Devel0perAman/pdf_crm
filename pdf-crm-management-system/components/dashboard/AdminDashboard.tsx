"use client";

import { useEffect, useState } from "react";
import { getAdminStats } from "@/services/admin.service";

interface AdminStats {
  totalUsers: number;
  totalPdfs: number;
  totalSignatures: number;
  totalActivities: number;
}

export default function AdminDashboard() {
  const [stats, setStats] =
    useState<AdminStats>({
      totalUsers: 0,
      totalPdfs: 0,
      totalSignatures: 0,
      totalActivities: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response =
          await getAdminStats();

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
    <main className="space-y-8">

      <div>
        <h1 className="text-2xl font-bold md:text-4xl">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage users, documents and CRM activity.
        </p>
      </div>

     <div
  className="
    grid
    grid-cols-2
    xl:grid-cols-4
    gap-4
    md:gap-6
  "
>

        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <p className="text-gray-500">
            Total Users
          </p>

          <h2
  className="
    text-2xl
    sm:text-3xl
    lg:text-4xl
    font-bold
    mt-3
  "
>
            {loading
              ? "..."
              : stats.totalUsers}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <p className="text-gray-500">
            Total PDFs
          </p>

         <h2
  className="
    text-2xl
    sm:text-3xl
    lg:text-4xl
    font-bold
    mt-3
  "
>
            {loading
              ? "..."
              : stats.totalPdfs}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <p className="text-gray-500">
            Signatures
          </p>

          <h2
  className="
    text-2xl
    sm:text-3xl
    lg:text-4xl
    font-bold
    mt-3
  "
>
            {loading
              ? "..."
              : stats.totalSignatures}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border p-6 shadow-sm">
          <p className="text-gray-500">
            Activities
          </p>

         <h2
  className="
    text-2xl
    sm:text-3xl
    lg:text-4xl
    font-bold
    mt-3
  "
>
            {loading
              ? "..."
              : stats.totalActivities}
          </h2>
        </div>

      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-3xl border p-6">

          <h3 className="text-xl font-semibold mb-4">
            System Status
          </h3>

          <div className="flex items-center gap-3">

            <div className="h-3 w-3 rounded-full bg-green-500" />

            <span>
              Server Online
            </span>

          </div>

        </div>

        <div className="bg-white rounded-3xl border p-6 mb-6 md:mb-0">

          <h3 className="text-xl font-semibold mb-4">
            CRM Overview
          </h3>

          <p className="text-gray-500">
            Total users registered:
            {" "}
            {stats.totalUsers}
          </p>

          <p className="text-gray-500 mt-2">
            Total PDFs stored:
            {" "}
            {stats.totalPdfs}
          </p>

        </div>

      </div>

    </main>
  );
}