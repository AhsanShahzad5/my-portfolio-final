"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import { projectsData, projectTags } from "@/data/projectData";
import { projectsIntro } from "@/data/site";

const cardVariants = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
};

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const filteredProjects = projectsData.filter(
    (project) => tag === "All" || project.tags.includes(tag)
  );

  // Standard cards are laid out 3 per row on lg and 2 per row on md. If the last row would be
  // short, stretch its cards so the grid never ends with an empty slot.
  const standard = filteredProjects.filter((project) => project.tier !== "featured");
  const spanClass = (project) => {
    if (project.tier === "featured") return "md:col-span-2 lg:col-span-3";
    const index = standard.indexOf(project);
    const fromEnd = standard.length - index;
    const lgRemainder = standard.length % 3;
    let classes = "lg:col-span-2";
    if (lgRemainder === 1 && fromEnd <= 4 && standard.length >= 4) classes = "lg:col-span-3";
    if (lgRemainder === 2 && fromEnd <= 2) classes = "lg:col-span-3";
    if (standard.length % 2 === 1 && fromEnd === 1) classes += " md:col-span-2";
    return classes;
  };

  return (
    <section id="projects" className="pt-16 md:pt-20">
      <h2 className="text-center text-4xl font-bold text-white mb-3">
        {projectsIntro.heading}
      </h2>
      <p className="mx-auto mb-2 max-w-2xl text-center text-[#ADB7BE]">{projectsIntro.subheading}</p>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        {projectTags.map((name) => (
          <ProjectTag key={name} onClick={setTag} name={name} isSelected={tag === name} />
        ))}
      </div>
      <ul
        ref={ref}
        className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-6"
      >
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: Math.min(index, 8) * 0.1 }}
            className={spanClass(project)}
          >
            <ProjectCard
              title={project.title}
              summary={project.summary}
              details={project.details}
              image={project.image}
              links={project.links}
              techStack={project.techStack}
              status={project.status}
              featured={project.tier === "featured"}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
