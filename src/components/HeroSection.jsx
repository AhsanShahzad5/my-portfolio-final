"use client";
import React from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import Link from "next/link";
import { hero, siteLinks } from "@/data/site";

const HeroSection = () => {
  return (
    <section className="lg:py-16" id="hero">
      <div className="grid grid-cols-1 sm:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-8 place-self-center text-center sm:text-left justify-self-start"
        >
          <h1 className="text-white mb-4 min-h-[11rem] sm:min-h-[12rem] lg:min-h-[17rem] xl:min-h-[20.5rem] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl lg:leading-normal font-extrabold">
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-secondary-600" >
              {hero.greeting}{" "}
            </span>
            <br></br>
            <TypeAnimation
              sequence={hero.roles.flatMap((role) => [role, 1000])}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <p className="text-[#ADB7BE] text-base sm:text-lg mb-6 lg:text-xl">
            {hero.subtitle}
          </p>
          <div>
            <Link
              href="/#contact"
              className="px-6 inline-block py-3 w-full sm:w-fit rounded-full mr-4 bg-linear-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white"
            >
              {hero.buttons.contact}
            </Link>
            <Link href="/#projects"
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-linear-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                {hero.buttons.work}
              </span>
            </Link>
            <a
              href={siteLinks.resume}
              download
              className="px-1 inline-block py-1 w-full sm:w-fit rounded-full bg-linear-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3 sm:ml-4"
            >
              <span className="block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2">
                {hero.buttons.resume}
              </span>
            </a>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="col-span-4 w-full place-self-center mt-4 lg:mt-0"
        >
          <div className="relative mx-auto h-[200px] w-[200px] overflow-hidden rounded-full bg-[#181818] lg:h-[280px] lg:w-[280px] xl:h-[350px] xl:w-[350px]">
            <Image
              src="/images/Profile.png"
              alt="hero image"
              className="object-cover"
              fill
              sizes="(min-width: 1280px) 350px, (min-width: 1024px) 280px, 200px"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
