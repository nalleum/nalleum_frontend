import React from "react";

export default function AppShell({ children, className = "", padded = true }: { children: React.ReactNode; className?: string; padded?: boolean; }) {
  return (
    <div className={`min-h-screen ${className}`}>
      <div className={`mx-auto w-full max-w-[430px] ${padded ? "px-5 pb-28 pt-5" : ""}`}>{children}</div>
    </div>
  );
}
