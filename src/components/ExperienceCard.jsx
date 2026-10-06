import React from "react";
import Chip from "./Chip";

const ExperienceCard = ({ title, subtitle, paragraphs, patterns, stack }) => {
  return (
    <article className="flex h-full flex-col rounded-xl border border-[#33353F] bg-[#181818] p-6 text-white">
      <h3 className="text-xl font-semibold">{title}</h3>
      {subtitle && <p className="mb-4 mt-1 text-sm text-primary-400">{subtitle}</p>}
      <div className={`flex-1 space-y-3 text-[#ADB7BE] ${subtitle ? "" : "mt-3"}`}>
        {paragraphs.map((text) => (
          <p key={text.slice(0, 40)}>{text}</p>
        ))}
      </div>

      {patterns.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Patterns</p>
          <div className="flex flex-wrap gap-2">
            {patterns.map((item) => (
              <Chip key={item} variant="accent">
                {item}
              </Chip>
            ))}
          </div>
        </div>
      )}

      {stack.length > 0 && (
        <div className="mt-4">
          <p className="mb-2 text-xs uppercase tracking-wide text-slate-500">Stack</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </div>
        </div>
      )}
    </article>
  );
};

export default ExperienceCard;
