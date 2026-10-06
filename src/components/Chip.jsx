import React from "react";

// Small rounded label used for patterns, stacks and tech names that have no icon.
const Chip = ({ children, variant = "muted" }) => {
  const styles =
    variant === "accent"
      ? "border-primary-500/60 text-primary-300"
      : "border-[#33353F] text-[#ADB7BE]";
  return (
    <span className={`inline-block rounded-full border px-3 py-1 text-xs sm:text-sm ${styles}`}>
      {children}
    </span>
  );
};

export default Chip;
