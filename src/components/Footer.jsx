import React from "react";
import { footer, siteLinks } from "@/data/site";

const linkStyles = "text-[#ADB7BE] hover:text-white";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white">
      <div className="container mx-auto px-12 py-12 flex flex-col gap-4 items-center md:flex-row md:justify-between">
        <span>
          {footer.name} · {footer.role}
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
