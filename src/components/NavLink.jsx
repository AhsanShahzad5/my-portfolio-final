import Link from "next/link";

const NavLink = ({ href, title, active = false, onClick, className = "" }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`block border-b-2 pb-1 text-[#ADB7BE] transition-colors hover:text-white ${
        active ? "border-primary-500 text-white" : "border-transparent"
      } ${className}`}
    >
      {title}
    </Link>
  );
};

export default NavLink;
