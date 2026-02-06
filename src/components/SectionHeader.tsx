import React from "react";

export default function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-[28px] font-extrabold tracking-[-0.02em] text-text">{title}</h2>
      {right}
    </div>
  );
}
