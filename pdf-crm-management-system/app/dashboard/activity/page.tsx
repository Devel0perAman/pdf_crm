"use client";

import { useEffect, useState } from "react";

import {
  getActivities,
} from "@/services/activity.service";

interface Activity {
  id: string;
  action: string;
  pdfDocument?: {
    title: string;
  };
  createdAt: string;
}

export default function ActivityPage() {
  const [activities, setActivities] =
    useState<Activity[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response =
          await getActivities();

        setActivities(
          response.data
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <main className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold mb-8">
        Activity Log
      </h1>

      <div className="bg-white rounded-3xl border p-6">

        {loading ? (
          <div className="py-10">
            Loading...
          </div>
        ) : (
          <div className="space-y-4">

            {activities.map((item) => (
              <div
                key={item.id}
                className="border rounded-2xl p-4"
              >
                <p className="font-semibold">
                  {item.action}
                </p>

                <p className="text-sm text-gray-500">
                  {
                    item.pdfDocument
                      ?.title
                  }
                </p>

                <p className="text-xs text-gray-400 mt-2">
                  {new Date(
                    item.createdAt
                  ).toLocaleString()}
                </p>
              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}