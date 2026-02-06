import React from "react";

export default function Chip({
  label,
  active,
  onClick,
  size = "md",
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}) {
  const sizeClass = size === "sm" ? "px-3 py-1.5 text-[12px]" : "px-4 py-2 text-[13px]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border transition ${sizeClass} ${
        active
          ? "border-primary bg-primary text-white"
          : "border-line bg-white text-[#6f7fa6] hover:border-primary/40"
      }`}
    >
      {label}
    </button>
  );
}
