import React from "react";
import { footer, siteLinks } from "@/data/site";

const linkStyles = "text-[#ADB7BE] hover:text-white";

const Footer = () => {
  return (
    <footer className="border-t border-[#33353F] text-white">
      <div className="mx-auto flex max-w-[77rem] flex-col items-center gap-4 px-6 py-10 text-sm sm:px-10 md:flex-row md:justify-between">
        <span>
          {footer.name} <span className="text-slate-500">· {footer.role}</span>
        </span>
        <nav className="flex gap-6">
          <a href={siteLinks.github} target="_blank" rel="noopener noreferrer" className={linkStyles}>
            GitHub
          </a>
          <a href={siteLinks.linkedin} target="_blank" rel="noopener noreferrer" className={linkStyles}>
            LinkedIn
          </a>
          <a href={siteLinks.resume} download className={linkStyles}>
            Resume
          </a>
        </nav>
        <p className="text-slate-600">{footer.rights}</p>
      </div>
    </footer>
  );
};

export default Footer;
