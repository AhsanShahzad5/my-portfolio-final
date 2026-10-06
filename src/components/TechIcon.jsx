import React from "react";
import { getTechIcon } from "@/data/icons";

const sizes = {
  md: "h-9 w-9 p-1.5 sm:h-10 sm:w-10",
  sm: "h-7 w-7 p-1",
};

// A tech logo on a light rounded tile. Renders nothing when the tech has no authentic icon.
const TechIcon = ({ name, size = "md" }) => {
  const icon = getTechIcon(name);
  if (!icon) return null;
  return (
    <span
      title={name}
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-white ${sizes[size]}`}
    >
      {icon}
      <span className="sr-only">{name}</span>
    </span>
  );
};

export default TechIcon;
