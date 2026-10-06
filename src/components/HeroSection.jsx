"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import HeroGrid from "./HeroGrid";
import { hero, siteLinks } from "@/data/site";

const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
});

const socialStyles = "text-xl text-[#ADB7BE] transition-colors hover:text-white";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-5rem)] scroll-mt-24 flex-col justify-center py-14"
    >
      <HeroGrid />

      {/* soft background glow, purely decorative */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-0 h-[26rem] w-[26rem] rounded-full bg-primary-500/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 top-48 h-[20rem] w-[20rem] rounded-full bg-secondary-500/10 blur-3xl"
      />

      <div className="relative max-w-3xl">
        <motion.p {...rise(0.08)} className="mb-2 text-base text-[#ADB7BE]">
          {hero.greeting} <span className="font-medium text-white">{hero.name}</span>
        </motion.p>

        <motion.h1
          {...rise(0.16)}
          className="text-3xl font-extrabold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl"
        >
          {hero.headline[0]}{" "}
          <span className="bg-linear-to-r from-primary-400 to-secondary-500 bg-clip-text text-transparent">
            {hero.headline[1]}
          </span>{" "}
          {hero.headline[2]}
        </motion.h1>

        <motion.p {...rise(0.24)} className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#ADB7BE] sm:text-base">
          {hero.subtitle}
        </motion.p>

        <motion.div {...rise(0.32)} className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href="#projects"
            className="rounded-full bg-linear-to-br from-primary-500 to-secondary-500 px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            {hero.buttons.work}
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-[#33353F] px-5 py-2.5 text-sm font-medium text-white hover:border-white"
          >
            {hero.buttons.contact}
          </Link>
          <a
            href={siteLinks.resume}
            download
            className="inline-flex items-center gap-2 py-2.5 text-sm text-[#ADB7BE] hover:text-white sm:px-2"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            {hero.buttons.resume}
          </a>
        </motion.div>

        <motion.div {...rise(0.4)} className="mt-5 flex items-center gap-5">
          <a href={siteLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className={socialStyles}>
            <FaGithub />
          </a>
          <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialStyles}>
            <FaLinkedin />
          </a>
        </motion.div>

      </div>

      <Link
        href="#about"
        className="relative mt-14 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500 hover:text-white sm:flex"
      >
        Scroll
        <span className="h-px w-12 bg-slate-600" />
      </Link>
    </section>
  );
};

export default HeroSection;
