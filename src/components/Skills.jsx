import React from "react";
import { skillGroups, skillIconKey } from "@/data/skills";
import { getTechIcon } from "@/data/icons";
import TechIcon from "./TechIcon";

const Skills = () => {
  return (
    <section id="skills" className="pt-16 md:pt-20">
      <h2 className="text-center text-4xl font-bold text-white mb-8">Skills &amp; Tools</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {skillGroups.map(({ group, items }) => {
          // Items with an authentic icon become tiles; the rest (concepts like RAG or OOP) go in a text line.
          const withIcon = items.filter((name) => getTechIcon(skillIconKey(name)));
          const textOnly = items.filter((name) => !getTechIcon(skillIconKey(name)));
          return (
            <div key={group} className="rounded-xl border border-[#33353F] bg-[#181818] p-5">
              <h3 className="mb-4 text-lg font-semibold text-white">{group}</h3>
              {withIcon.length > 0 && (
                <div className="flex flex-wrap items-start gap-3">
                  {withIcon.map((name) => (
                    <div
                      key={name}
                      className="flex w-20 flex-col items-center gap-2 text-center sm:w-24"
                    >
                      <TechIcon name={skillIconKey(name)} />
                      <p className="text-xs text-white sm:text-sm">{name}</p>
                    </div>
                  ))}
                </div>
              )}
              {textOnly.length > 0 && (
                <p className={`text-sm text-[#ADB7BE] ${withIcon.length > 0 ? "mt-4 border-t border-[#33353F] pt-3" : ""}`}>
                  {withIcon.length > 0 && <span className="text-slate-500">Also: </span>}
                  {textOnly.join(" · ")}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
