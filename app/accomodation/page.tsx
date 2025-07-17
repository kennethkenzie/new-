"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AccommodationRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/accommodation");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#A80532] mx-auto mb-4"></div>
        <p className="text-[#4A3F36]">Redirecting to accommodations...</p>
      </div>
    </div>
  );
}