"use client";

import Image from "next/image";
import { useMemo } from "react";
import { getAvatarDataUri } from "@/lib/avatar";

export default function ProfileAvatar({ nickname, size = 48, className = "" }: { nickname: string; size?: number; className?: string; }) {
  const src = useMemo(() => getAvatarDataUri(nickname || "nalleum"), [nickname]);

  return (
    <Image
      src={src}
      alt={nickname || "profile"}
      width={size}
      height={size}
      className={className}
      unoptimized
    />
  );
}
