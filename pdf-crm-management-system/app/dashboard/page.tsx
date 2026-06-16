"use client";

import { useEffect, useState } from "react";

import AdminDashboard from "@/components/dashboard/AdminDashboard";
import UserDashboard from "@/components/dashboard/UserDashboard";

export default function DashboardPage() {
  const [role, setRole] =
    useState("");

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user") ||
      "{}"
    );

    setRole(user.role);
  }, []);

  if (!role) {
    return null;
  }

  return role === "admin"
    ? <AdminDashboard />
    : <UserDashboard />;
}