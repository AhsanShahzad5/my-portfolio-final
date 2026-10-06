import React from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Reveal from "./Reveal";
import TechIcon from "./TechIcon";

const labelStyles = "font-mono text-xs font-medium uppercase tracking-[0.14em] text-slate-500";

// Featured project: a full write-up on the left, a small spec sheet on the right.
const CaseStudy = ({ number, project }) => {
  const { title, summary, details, highlights, badges, techStack, links, status, type, role } = project;
  return (
    <Reveal>
      <article className="grid gap-7 rounded-2xl border border-primary-500/30 bg-[#181818] p-5 sm:p-7 lg:grid-cols-12 lg:gap-9">
        <div className="lg:col-span-8">
          <p className="mb-3 flex items-center gap-3 font-mono text-sm font-medium uppercase tracking-[0.16em] text-primary-400">
            <span>{number}</span>
            <span className="h-px w-8 bg-primary-500/50" />
            <span>Featured</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-xl font-bold text-white sm:text-2xl">{title}</h3>
            {badges?.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-primary-500 bg-primary-500/10 px-2.5 py-0.5 font-mono text-xs font-medium text-primary-300"
              >
                {badge}
              </span>
            ))}
          </div>
          <p className="mt-3 text-base text-white/90">{summary}</p>
          {details && <p className="mt-3 text-[15px] leading-relaxed text-[#ADB7BE]">{details}</p>}
          {highlights && (
            <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-relaxed text-[#ADB7BE] marker:text-primary-400">
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex flex-wrap gap-2">
            {techStack.map((name) => (
              <TechIcon key={name} name={name} />
            ))}
          </div>
        </div>

        <dl className="space-y-4 border-t border-[#33353F] pt-5 lg:col-span-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <dt className={labelStyles}>Status</dt>
            <dd className="mt-1 text-sm text-white">{status === "wip" ? "Work in progress" : "Complete"}</dd>
          </div>
          {type && (
            <div>
              <dt className={labelStyles}>Type</dt>
              <dd className="mt-1 text-sm text-white">{type}</dd>
            </div>
          )}
          {role && (
            <div>
              <dt className={labelStyles}>Role</dt>
              <dd className="mt-1 text-sm text-white">{role}</dd>
            </div>
          )}
          <div>
            <dt className={labelStyles}>Code</dt>
            <dd className="mt-2 flex flex-wrap gap-2">
              {links.length > 0 ? (
                links.map((link) => (
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
                ))
              ) : (
                <span className="text-[#ADB7BE]">Not public yet</span>
              )}
            </dd>
          </div>
        </dl>
      </article>
    </Reveal>
  );
};

export default CaseStudy;
