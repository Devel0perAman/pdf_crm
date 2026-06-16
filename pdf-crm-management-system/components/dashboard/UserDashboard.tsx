"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  getDashboardStats,
  getRecentPdfs,
} from "@/services/dashboard.service";

interface Pdf {
  id: string;
  title: string;
  createdAt: string;
}

export default function UserDashboard() {
  const [stats, setStats] =
    useState({
      totalPdfs: 0,
      totalSignatures: 0,
    });

  const [recentPdfs, setRecentPdfs] =
    useState<Pdf[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadDashboard =
      async () => {
        try {
          const [
            statsResponse,
            pdfResponse,
          ] = await Promise.all([
            getDashboardStats(),
            getRecentPdfs(),
          ]);

          setStats(
            statsResponse.data
          );

          setRecentPdfs(
            pdfResponse.data
          );
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

    loadDashboard();
  }, []);

  return (
  <main className="space-y-8">

    <div>
      <h1 className="text-2xl font-bold md:text-4xl">
        My Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome to your PDF CRM workspace.
      </p>
    </div>

    {/* Stats Cards */}

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
          My PDFs
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
          Recent PDFs
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
          {recentPdfs.length}
        </h2>

      </div>

      <div className="bg-white rounded-3xl border p-6 shadow-sm">

        <p className="text-gray-500">
          Status
        </p>

        <h2 className="text-green-500 font-semibold mt-3">
          Active
        </h2>

      </div>

    </div>

    {/* Bottom Section */}

    <div className="grid lg:grid-cols-2 gap-6">

      {/* Account Overview */}

      <div className="bg-white rounded-3xl border p-6">

        <h3 className="text-xl font-semibold mb-4">
          Account Overview
        </h3>

        <p className="text-gray-500">
          Total PDFs created:
          {" "}
          {stats.totalPdfs}
        </p>

        <p className="text-gray-500 mt-2">
          Total signatures:
          {" "}
          {stats.totalSignatures}
        </p>

      </div>

      {/* Recent PDFs */}

      <div className="bg-white rounded-3xl border p-6">

        <h3 className="text-xl font-semibold mb-4">
          Recent PDFs
        </h3>

        {recentPdfs.length === 0 ? (
          <p className="text-gray-500">
            No PDFs created yet.
          </p>
        ) : (
          <div className="space-y-3">

            {recentPdfs
              .slice(0, 5)
              .map((pdf) => (
                <div
                  key={pdf.id}
                  className="
                    border
                    rounded-xl
                    p-4
                  "
                >

                  <h4 className="font-semibold">
                    {pdf.title}
                  </h4>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(
                      pdf.createdAt
                    ).toLocaleString()}
                  </p>

                </div>
              ))}

          </div>
        )}

      </div>

    </div>

  </main>
  );
}