"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.replace("/");
      return;
    }

    setAuthenticated(true);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!authenticated) {
    return null;
  }

  return <>{children}</>;
}