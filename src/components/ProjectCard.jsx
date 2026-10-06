"use client";
import React, { useState } from "react";
import { ChevronDownIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import TechIcon from "./TechIcon";

const ProjectCard = ({ title, summary, details, image, links, techStack, status, featured }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`flex h-full flex-col overflow-hidden rounded-xl border bg-[#181818] ${
        featured ? "border-primary-500/50" : "border-[#33353F]"
      }`}
    >
      {image && (
        <div
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${image})` }}
          role="img"
          aria-label={`${title} screenshot`}
        />
      )}

      <div className="flex flex-1 flex-col p-5 text-white">
        <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          {status === "wip" && (
            <span className="rounded-full border border-secondary-500 bg-secondary-600/20 px-2 py-0.5 text-xs text-secondary-300">
              Work in progress
            </span>
          )}
        </div>

        <p className="text-[#ADB7BE]">{summary}</p>

        {details && (
          <div className="mt-3">
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              className="flex cursor-pointer items-center gap-1 text-sm text-primary-400 hover:text-white"
            >
              {open ? "Hide details" : "Details"}
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <p className="mt-2 text-sm leading-relaxed text-[#ADB7BE]">{details}</p>}
          </div>
        )}

        {/* Footer: tech icons on the left, links on the right */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-[#33353F] pt-4">
          <div className="flex flex-wrap items-center gap-2">
            {techStack.map((name) => (
              <TechIcon key={name} name={name} />
            ))}
          </div>
          {links.length > 0 && (
            <div className="flex flex-wrap gap-2">
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
      </div>
    </div>
  );
};

export default ProjectCard;
