"use client";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Reveal from "./Reveal";
import Chip from "./Chip";
import TechIcon from "./TechIcon";

// One line per project; click to open details, tech and links in place.
const ProjectRow = ({ number, project, delay = 0 }) => {
  const [open, setOpen] = useState(false);
  const { title, summary, details, image, links, techStack, status, tags, badges } = project;

  return (
    <Reveal as="li" delay={delay} className="border-t border-[#33353F]">
      <button suppressHydrationWarning
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="group grid w-full cursor-pointer grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 py-5 text-left sm:grid-cols-[3.5rem_1fr_auto]"
      >
        <span className="pt-0.5 font-mono text-base font-semibold text-slate-500 transition-colors group-hover:text-primary-400">
          {number}
        </span>
        <span className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-base font-semibold text-white">{title}</span>
            {tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
            {badges?.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-primary-500 bg-primary-500/10 px-2 py-0.5 font-mono text-xs text-primary-300"
              >
                {badge}
              </span>
            ))}
            {status === "wip" && (
              <span className="rounded-full border border-secondary-500 bg-secondary-600/20 px-2 py-0.5 text-xs text-secondary-300">
                Work in progress
              </span>
            )}
          </span>
          <span className="mt-1 block text-sm text-[#ADB7BE]">{summary}</span>
        </span>
        <span className="flex items-center gap-4 pt-0.5">
          <span className="hidden gap-1.5 lg:flex">
            {techStack.slice(0, 5).map((name) => (
              <TechIcon key={name} name={name} size="sm" />
            ))}
          </span>
          <ChevronDownIcon
            className={`h-5 w-5 text-[#ADB7BE] transition-transform group-hover:text-white ${open ? "rotate-180" : ""}`}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-7 pl-[3.5rem] sm:pl-[4.5rem]">
              {details && <p className="max-w-3xl text-[15px] leading-relaxed text-[#ADB7BE]">{details}</p>}
              {image && (
                <div
                  className="mt-4 h-44 max-w-md rounded-lg border border-[#33353F] bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                  role="img"
                  aria-label={`${title} screenshot`}
                />
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {techStack.map((name) => (
                  <TechIcon key={name} name={name} />
                ))}
              </div>
              {links.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-full border border-slate-600 px-3 py-1 text-sm text-[#ADB7BE] hover:border-white hover:text-white"
                    >
                      {link.label}
                      <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  );
};

export default ProjectRow;
