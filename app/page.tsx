"use client";

import { Suspense, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import CatalogPage from "./cetalog/page";

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    if (user && pathname === "/auth") {
      router.replace("/"); 
    }
  }, [user, pathname, router]);

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen">
        <p className="text-lg">Checking authentication…</p>
      </main>
    );
  }

  return (
    <Suspense
      fallback={
        <main className="flex items-center justify-center h-screen">
          <p className="text-lg">Loading...</p>
        </main>
      }
    >
      <CatalogPage />
    </Suspense>
  );
}
