import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { checkAuth } from "@/lib/check-auth";

export function usePrivateRouteRedirect() {
  const router = useRouter();
  const isAuthenticated = checkAuth();
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/students");
    }
  }, [router, isAuthenticated]);
}

export function usePublicRouteRedirect() {
  const router = useRouter();
  const isAuthenticated = checkAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth");
    }
  }, [isAuthenticated, router]);
}
