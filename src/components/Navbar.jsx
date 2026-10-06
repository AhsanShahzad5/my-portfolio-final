"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import NavLink from "./NavLink";
import MenuOverlay from "./MenuOverlay";
import { navLinks } from "@/data/site";

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [active, setActive] = useState("");

  // Scroll-spy: highlight the link of the section currently in the middle of the viewport.
  useEffect(() => {
    const ids = ["hero", ...navLinks.map((link) => link.path.replace("#", ""))];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "hero" ? "" : entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-[#33353F] bg-[#121212]/85 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-[77rem] items-center justify-between px-6 sm:px-10">
        <Link href="#hero" className="text-lg font-semibold text-white">
          Ahsan<span className="text-primary-400">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                href={link.path}
                title={link.title}
                active={active === link.path.replace("#", "")}
                className="text-sm"
              />
            </li>
          ))}
        </ul>

        <button suppressHydrationWarning
          type="button"
          onClick={() => setNavbarOpen((open) => !open)}
          aria-label={navbarOpen ? "Close menu" : "Open menu"}
          aria-expanded={navbarOpen}
          className="flex items-center rounded-sm border border-slate-200 px-3 py-2 text-slate-200 hover:border-white hover:text-white md:hidden"
        >
          {navbarOpen ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}
        </button>
      </nav>
      {navbarOpen && (
        <MenuOverlay links={navLinks} active={active} onNavigate={() => setNavbarOpen(false)} />
      )}
    </header>
  );
};

export default Navbar;
