"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { isAuthenticated } from "../../lib/auth";

export default function Signin() {
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [router]);

  return null;
}
