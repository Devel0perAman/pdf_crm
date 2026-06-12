"use client";

import { useEffect, useState } from "react";

import {
  getAnalytics,
} from "@/services/analytics.service";

interface AnalyticsData {
  totalPdfs: number;
  totalSignatures: number;
  totalActivities: number;
  recentPdfs: Array<{ id: string; title: string }>;
}

interface PDF {
  id: string;
  title: string;
}

export default function AnalyticsPage() {
  const [data, setData] =
    useState<AnalyticsData | null>(null);

  useEffect(() => {
    const loadAnalytics =
      async () => {
        try {
          const response =
            await getAnalytics();

          setData(
            response.data
          );
        } catch (error) {
          console.error(error);
        }
      };

    loadAnalytics();
  }, []);

  if (!data) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Analytics
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-white rounded-3xl border p-6">
          <p>Total PDFs</p>

          <h2 className="text-5xl font-bold mt-3">
            {data.totalPdfs}
          </h2>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <p>Total Signatures</p>

          <h2 className="text-5xl font-bold mt-3">
            {
              data.totalSignatures
            }
          </h2>
        </div>

        <div className="bg-white rounded-3xl border p-6">
          <p>Activities</p>

          <h2 className="text-5xl font-bold mt-3">
            {
              data.totalActivities
            }
          </h2>
        </div>

      </div>

      <div className="mt-8 bg-white rounded-3xl border p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Recent PDFs
        </h2>

        <div className="space-y-3">

          {data.recentPdfs.map(
            (pdf: PDF) => (
              <div
                key={pdf.id}
                className="border rounded-xl p-4"
              >
                {pdf.title}
              </div>
            )
          )}

        </div>

      </div>

    </main>
  );
} 