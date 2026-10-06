import React from "react";
import ExperienceCard from "./ExperienceCard";
import { experience } from "@/data/experience";

const ExperienceSection = () => {
  return (
    <section id="experience" className="pt-16 md:pt-20">
      <h2 className="text-center text-4xl font-bold text-white mb-4">Experience</h2>
      <div>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xl font-semibold text-white">
            {experience.role}, {experience.company}
          </p>
          <p className="text-sm text-primary-400">{experience.dates}</p>
          <p className="mt-3 text-[#ADB7BE]">{experience.intro}</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          {experience.stories.map((story) => (
            <ExperienceCard
              key={story.id}
              title={story.title}
              subtitle={story.subtitle}
              paragraphs={story.paragraphs}
              patterns={story.patterns}
              stack={story.stack}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
