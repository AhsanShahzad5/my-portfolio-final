import React from "react";
import Reveal from "./Reveal";
import Chip from "./Chip";
import SectionHeader from "./SectionHeader";
import { experience } from "@/data/experience";
import { education, sections } from "@/data/site";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const eyebrow = "mb-3 font-mono text-sm font-medium uppercase tracking-[0.16em] text-primary-400";

const ExperienceSection = () => {
  return (
    <section id="experience" className="scroll-mt-24 py-16">
      <SectionHeader {...sections.experience} />

      {/* what I do: the capabilities behind the stories below */}
      <Reveal className="mb-14">
        <h3 className={eyebrow}>What I do</h3>
        <ul className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
          {experience.capabilities.map((item) => (
            <li key={item.title} className="border-t border-[#33353F] pt-4">
              <p className="text-sm font-semibold text-white">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#ADB7BE]">{item.text}</p>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="grid gap-14 lg:grid-cols-12">
        {/* timeline */}
        <div className="lg:col-span-8">
          <Reveal className="mb-8">
            <p className="text-lg font-semibold text-white">
              {experience.role}, {experience.company}
            </p>
            <p className="text-sm text-primary-400">{experience.dates}</p>
          </Reveal>

          <ol className="relative space-y-12 border-l border-[#33353F] pl-8">
            {experience.stories.map((story) => (
              <li key={story.id} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[2.4rem] top-2 h-3 w-3 rounded-full bg-primary-500 ring-4 ring-[#121212]"
                />
                <Reveal>
                  <h3 className="text-lg font-semibold text-white sm:text-xl">{story.title}</h3>
                  {story.subtitle && <p className="mt-1 text-sm text-primary-400">{story.subtitle}</p>}
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#ADB7BE]">
                    {story.paragraphs.map((text) => (
                      <p key={text.slice(0, 40)}>{text}</p>
                    ))}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {story.patterns.map((item) => (
                      <Chip key={item} variant="accent">
                        {item}
                      </Chip>
                    ))}
                  </div>
                  {story.stack.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {story.stack.map((item) => (
                        <Chip key={item}>{item}</Chip>
                      ))}
                    </div>
                  )}
                </Reveal>
              </li>
            ))}
          </ol>
        </div>

        {/* education sidebar */}
        <aside className="lg:col-span-4">
          <div className="space-y-10 lg:sticky lg:top-28">
            <Reveal>
              <h3 className={eyebrow}>{education.heading}</h3>
              <ul className="divide-y divide-[#33353F] border-y border-[#33353F]">
                {education.items.map((item) => (
                  <li key={item.degree} className="py-4">
                    <p className="font-semibold text-white">{item.degree}</p>
                    <p className="text-[#ADB7BE]">{item.school}</p>
                    <p className="mt-1 text-sm text-primary-400">{item.dates}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            {education.certifications.length > 0 && (
              <Reveal delay={0.1}>
                <h3 className={eyebrow}>Certifications</h3>
                <ul className="space-y-3">
                  {education.certifications.map((cert) => (
                    <li key={cert.name}>
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white hover:text-primary-400"
                      >
                        {cert.name}
                        <span className="text-[#ADB7BE]">({cert.issuer})</span>
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>
        </aside>
      </div>
    </section>
  );
};

export default ExperienceSection;
