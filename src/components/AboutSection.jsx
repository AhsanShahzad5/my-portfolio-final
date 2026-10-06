"use client";
import React from "react";
import { about } from "@/data/site";

const AboutSection = () => {

  return (
    <section className="text-white pt-16 md:pt-20" id="about">
      <div>
        <h2 className="text-center text-4xl font-bold text-white mb-6">{about.heading}</h2>
        <div className="mx-auto max-w-3xl space-y-4 text-base lg:text-lg">
          {about.paragraphs.map((text) => (
            <p key={text.slice(0, 40)}>{text}</p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
