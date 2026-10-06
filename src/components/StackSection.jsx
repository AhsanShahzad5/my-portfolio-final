"use client";
import React, { useEffect, useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import TechIcon from "./TechIcon";
import { skillGroups, skillIconKey } from "@/data/skills";
import { getTechIcon } from "@/data/icons";
import { getUsage } from "@/data/stackUsage";
import { sections } from "@/data/site";

const nodeBase =
  "cursor-pointer rounded-lg border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400";

const StackSection = () => {
  const [selected, setSelected] = useState(null);
  const usage = selected ? getUsage(selected.name) : null;
  const hasUsage = usage && (usage.work.length > 0 || usage.projects.length > 0);

  const select = (name, group) => setSelected({ name, group });

  // the hero crystal can ask for a technology to be selected here
  useEffect(() => {
    const onSelect = (event) => setSelected(event.detail);
    window.addEventListener("select-tech", onSelect);
    return () => window.removeEventListener("select-tech", onSelect);
  }, []);

  return (
    <section id="stack" className="scroll-mt-24 py-16">
      <SectionHeader {...sections.stack} />

      <div className="relative">
        {/* the spine that connects every group */}
        <div
          aria-hidden
          className="absolute bottom-0 left-4 top-0 w-px bg-linear-to-b from-primary-500/60 via-[#33353F] to-secondary-500/40 md:left-1/2"
        />

        <div className="space-y-6 md:space-y-8">
          {skillGroups.map(({ group, items }, i) => {
            const right = i % 2 === 1;
            const withIcon = items.filter((name) => getTechIcon(skillIconKey(name)));
            const textOnly = items.filter((name) => !getTechIcon(skillIconKey(name)));
            return (
              <Reveal
                key={group}
                className={`relative pl-12 md:w-1/2 md:pl-0 ${right ? "md:ml-auto md:pl-12" : "md:pr-12"}`}
              >
                {/* node on the spine + connector to the panel */}
                <span
                  aria-hidden
                  style={{ top: 32 }}
                  className={`absolute left-4 h-3 w-3 -translate-x-1/2 rounded-full bg-primary-500 ring-4 ring-[#121212] ${
                    right ? "md:left-0" : "md:left-auto md:right-0 md:translate-x-1/2"
                  }`}
                />
                <span
                  aria-hidden
                  style={{ top: 38 }}
                  className={`absolute left-4 h-px w-8 bg-[#33353F] md:w-12 ${
                    right ? "md:left-0" : "md:left-auto md:right-0"
                  }`}
                />

                <div className="rounded-xl border border-[#33353F] bg-[#181818] p-5">
                  <h3 className="mb-3 font-mono text-sm font-medium uppercase tracking-[0.14em] text-primary-400">{group}</h3>

                  {withIcon.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {withIcon.map((name) => {
                        const isSelected = selected?.name === name;
                        return (
                          <button suppressHydrationWarning
                            key={name}
                            type="button"
                            aria-pressed={isSelected}
                            onMouseEnter={() => select(name, group)}
                            onFocus={() => select(name, group)}
                            onClick={() => select(name, group)}
                            className={`${nodeBase} flex w-[4.5rem] flex-col items-center gap-1.5 p-1.5 text-center sm:w-20 ${
                              isSelected ? "border-primary-500 bg-primary-500/10" : "border-transparent hover:border-[#33353F]"
                            }`}
                          >
                            <TechIcon name={skillIconKey(name)} />
                            <span className="text-xs text-white">{name}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {textOnly.length > 0 && (
                    <div className={`flex flex-wrap gap-2 ${withIcon.length > 0 ? "mt-4 border-t border-[#33353F] pt-4" : ""}`}>
                      {textOnly.map((name) => {
                        const isSelected = selected?.name === name;
                        return (
                          <button suppressHydrationWarning
                            key={name}
                            type="button"
                            aria-pressed={isSelected}
                            onMouseEnter={() => select(name, group)}
                            onFocus={() => select(name, group)}
                            onClick={() => select(name, group)}
                            className={`${nodeBase} px-2.5 py-1 text-xs sm:text-[13px] ${
                              isSelected
                                ? "border-primary-500 bg-primary-500/10 text-white"
                                : "border-[#33353F] text-[#ADB7BE] hover:border-white hover:text-white"
                            }`}
                          >
                            {name}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* inspector: stays in view while you move through the map */}
      <div className="sticky bottom-4 z-10 mt-8" aria-live="polite">
        <div className="rounded-xl border border-primary-500/40 bg-[#181818]/95 p-4 shadow-lg backdrop-blur sm:p-5">
          {selected ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
              {getTechIcon(skillIconKey(selected.name)) && <TechIcon name={skillIconKey(selected.name)} />}
              <div className="min-w-0 text-sm">
                <p className="font-semibold text-white">
                  {selected.name} <span className="ml-1 text-sm font-normal text-slate-500">{selected.group}</span>
                </p>
                {usage.work.length > 0 && (
                  <p className="mt-1 text-[#ADB7BE]">
                    <span className="text-slate-500">At work: </span>
                    {usage.work.join(", ")}
                  </p>
                )}
                {usage.projects.length > 0 && (
                  <p className="mt-1 text-[#ADB7BE]">
                    <span className="text-slate-500">In projects: </span>
                    {usage.projects.join(", ")}
                  </p>
                )}
                {usage.note && <p className="mt-1 text-[#ADB7BE]">{usage.note}</p>}
                {!hasUsage && !usage.note && (
                  <p className="mt-1 text-[#ADB7BE]">Part of my toolkit; not tied to a specific project listed here.</p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-sm text-[#ADB7BE]">
              Hover or tap a technology to see where I&apos;ve used it.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default StackSection;
