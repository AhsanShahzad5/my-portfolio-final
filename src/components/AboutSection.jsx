"use client";
import React from "react";

const AboutSection = () => {

  return (
    <section className="text-white md:pt-16" id="about">
      <div className="py-3 px-4 xl:gap-16 sm:py-5 xl:px-16 align-middle justify-center text-center"> {/* Removed grid classes */}
        <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
        <p className="text-base lg:text-lg ">
        I’m a software engineer passionate about creating dynamic, user-friendly Web and Mobile applications. With expertise in HTML, CSS, JavaScript, TypeScript, and frameworks like React.js and Next.js, I turn complex problems into seamless digital experiences. I specialize in both front-end design and back-end development, leveraging tools like Node.js, Express, MongoDB, and PostgreSQL to build scalable and efficient solutions. Combining creativity with technical skill, I’m always exploring new technologies—like Framer Motion for animations or Recoil for state management—to deliver impactful, innovative web solutions tailored to your needs.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
