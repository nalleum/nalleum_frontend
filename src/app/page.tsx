"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useHydratedStore } from "@/hooks/useHydratedStore";
import { useProfileStore } from "@/store/useProfileStore";

export default function IndexPage() {
  const router = useRouter();
  const hydrated = useHydratedStore();
  const onboardingCompleted = useProfileStore((state) => state.profile.onboardingCompleted);

  useEffect(() => {
    if (!hydrated) return;
    router.replace(onboardingCompleted ? "/home" : "/onboarding");
  }, [hydrated, onboardingCompleted, router]);

  return <div className="min-h-screen bg-background" />;
}
