import React from "react";

export default function Chip({ label, active, onClick }: { label: string; active?: boolean; onClick?: () => void; }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-[12px] font-semibold transition ${
        active ? "bg-primary text-white shadow-[0_8px_18px_rgba(79,45,255,0.25)]" : "border border-line bg-white text-[#50648f]"
      }`}
    >
      {label}
    </button>
  );
}
