import React from "react";
import NavLink from "./NavLink";

const MenuOverlay = ({ links, active, onNavigate }) => {
  return (
    <ul className="flex flex-col gap-4 border-t border-[#33353F] px-6 py-5 md:hidden">
      {links.map((link) => (
        <li key={link.path}>
          <NavLink
            href={link.path}
            title={link.title}
            active={active === link.path.replace("#", "")}
            onClick={onNavigate}
            className="inline-block text-lg"
          />
        </li>
      ))}
    </ul>
  );
};

export default MenuOverlay;
