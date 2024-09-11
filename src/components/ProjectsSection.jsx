"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Quick Bites",
    description: "Project 1 description",
    image: "/images/projects/quickbites.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/AhsanShahzad5/Quick-Bites-Frontend",
    previewUrl: "https://quick-bites-frontend-za1k.onrender.com/",
  },
  {
    id: 2,
    title: "Social Link",
    description: "Project 2 description",
    image: "/images/projects/socialLink3.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/AhsanShahzad5/Social-Link",
    previewUrl: "https://social-link-iz2i.onrender.com/",
  },
  {
    id: 3,
    title: "Next-Js Developer Protfolio",
    description: "Project 3 description",
    image: "/images/projects/portfolio2.png",
    tag: ["All", "Web"],
    gitUrl: "https://github.com/AhsanShahzad5/my-portfolio-final",
    previewUrl: "/",
  },
  {
    id: 4,
    title: "Newzy",
    description: "Project 4 description",
    image: "/images/projects/newzy.png",
    tag: ["All", "Mobile"],
    gitUrl: "https://github.com/AhsanShahzad5/Newzy",
    previewUrl: "",
  },
  {
    id: 5,
    title: "React Firebase Template",
    description: "Authentication and CRUD operations",
    image: "/images/projects/5.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
  {
    id: 6,
    title: "Full-stack Roadmap",
    description: "Project 5 description",
    image: "/images/projects/6.png",
    tag: ["All", "Web"],
    gitUrl: "/",
    previewUrl: "/",
  },
];

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="pt-[70px]">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-2 md:mb-3">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Mobile"
          isSelected={tag === "Mobile"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
