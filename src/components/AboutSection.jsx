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
          <div className="relative mx-auto w-fit md:sticky md:top-28">
            <div className="absolute -inset-6 rounded-full bg-primary-500/20 blur-3xl" aria-hidden="true" />
            <div className="relative h-52 w-52 overflow-hidden rounded-full bg-[#181818] ring-2 ring-primary-500/50 ring-offset-4 ring-offset-[#121212] sm:h-60 sm:w-60">
              <Image src="/images/Profile.png" alt="Ahsan Shahzad" fill sizes="240px" className="object-cover object-top" />
            </div>
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
