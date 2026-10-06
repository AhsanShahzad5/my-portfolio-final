import React from "react";
import Reveal from "./Reveal";

// Numbered eyebrow + large left-aligned title, with an optional short note on the right.
const SectionHeader = ({ index, label, title, note }) => (
  <Reveal className="mb-10 grid gap-5 md:grid-cols-12 md:items-end">
    <div className="md:col-span-8">
      <p className="mb-4 flex items-center gap-4 font-mono text-base font-medium uppercase tracking-[0.16em] text-primary-400 sm:text-lg">
        <span>{index}</span>
        <span className="h-px w-14 bg-primary-500/50" />
        <span>{label}</span>
      </p>
      <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">{title}</h2>
    </div>
    {note && <p className="text-sm leading-relaxed text-[#ADB7BE] md:col-span-4">{note}</p>}
  </Reveal>
);

export default SectionHeader;
