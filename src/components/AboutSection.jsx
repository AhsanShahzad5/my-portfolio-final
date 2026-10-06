import React from "react";
import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { about, sections } from "@/data/site";

const AboutSection = () => {
  return (
    <section id="about" className="scroll-mt-24 py-16">
      <SectionHeader {...sections.about} />
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <Reveal className="md:col-span-4">
          <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-full bg-[#181818] ring-1 ring-[#33353F] sm:h-52 sm:w-52">
            <Image src="/images/Profile.png" alt="Ahsan Shahzad" fill sizes="208px" className="object-cover" />
          </div>
        </Reveal>
        <div className="space-y-5 text-[15px] leading-relaxed text-[#ADB7BE] md:col-span-8 lg:text-base">
          {about.paragraphs.map((text, i) => (
            <Reveal key={text.slice(0, 40)} delay={i * 0.08}>
              <p className={i === 0 ? "text-white" : ""}>{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
