"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthMiddleware } from "@/lib/authMiddleware";

export default function Home() {
  const router = useRouter();
  useAuthMiddleware();

  useEffect(() => {
    router.push("/login");
  }, [router]);

  return <div className="">Redirecting to login...</div>;
}
