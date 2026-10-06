import React from "react";
import { getTechIcon } from "@/data/icons";

// A tech logo on a light rounded tile. Renders nothing when the tech has no authentic icon.
const TechIcon = ({ name }) => {
  const icon = getTechIcon(name);
  if (!icon) return null;
  return (
    <span
      title={name}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white p-1.5 sm:h-11 sm:w-11"
    >
      {icon}
      <span className="sr-only">{name}</span>
    </span>
  );
};

export default TechIcon;
