"use client";
import React, { useState } from "react";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import CaseStudy from "./CaseStudy";
import ProjectRow from "./ProjectRow";
import { projectsData, projectTags } from "@/data/projectData";
import { sections } from "@/data/site";

const pad = (n) => String(n).padStart(2, "0");

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");

  const filtered = projectsData.filter((project) => tag === "All" || project.tags.includes(tag));
  const featured = filtered.filter((project) => project.tier === "featured");
  const rows = filtered.filter((project) => project.tier !== "featured");
  const countFor = (name) =>
    projectsData.filter((project) => name === "All" || project.tags.includes(name)).length;

  return (
    <section id="projects" className="scroll-mt-24 py-16">
      <SectionHeader {...sections.projects} />

      <Reveal className="mb-8 flex flex-wrap gap-2" y={12}>
        {projectTags.map((name) => (
          <button suppressHydrationWarning
            key={name}
            type="button"
            onClick={() => setTag(name)}
            aria-pressed={tag === name}
            className={`cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors ${
              tag === name
                ? "border-primary-500 bg-primary-500/10 text-white"
                : "border-[#33353F] text-[#ADB7BE] hover:border-white hover:text-white"
            }`}
          >
            {name} <span className="ml-1 text-slate-500">{countFor(name)}</span>
          </button>
        ))}
      </Reveal>

      {featured.length > 0 && (
        <div className="space-y-8">
          {featured.map((project, index) => (
            <CaseStudy key={project.id} number={pad(index + 1)} project={project} />
          ))}
        </div>
      )}

      {rows.length > 0 && (
        <ul className={`border-b border-[#33353F] ${featured.length > 0 ? "mt-12" : ""}`}>
          {rows.map((project, index) => (
            <ProjectRow
              key={project.id}
              number={pad(featured.length + index + 1)}
              project={project}
              delay={Math.min(index, 6) * 0.04}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectsSection;
