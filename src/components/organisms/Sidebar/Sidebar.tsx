import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { navLinks } from "../../../constants/navLinks";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
        onClick={() => setIsOpen((s) => !s)}
        className={`md:hidden fixed top-4 z-50 flex items-center justify-center w-10 h-10 p-2 rounded-md border transition-all duration-300
          ${
            isOpen
              ? "left-[calc(16rem+0.5rem)] bg-[#031434] border-[#031434] text-white"
              : "left-4 bg-white border-[#0f3b66] text-[#0f3b66]"
          }`}
      >
        <span
          className={`block w-5 h-[2px] rounded bg-current transform transition duration-300
            ${isOpen ? "rotate-45 translate-y-[6px]" : "-translate-y-1.5"}`}
        />
        <span
          className={`block w-5 h-[2px] rounded bg-current transition-opacity duration-300 absolute
            ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`block w-5 h-[2px] rounded bg-current transform transition duration-300
            ${isOpen ? "-rotate-45 -translate-y-[6px]" : "translate-y-1.5"}`}
        />
      </button>

      <aside
        className={`sidebar fixed top-0 left-0 h-full w-64 lg:w-[19.5vw] bg-[#031434] text-white flex flex-col p-6
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="mx-auto w-24 md:w-40">
          <Link to="/">
            {" "}
            <img
              src="/images/logo.png"
              alt="Star Wars Logo"
              className="object-contain w-full"
            />
          </Link>
        </div>

        <nav className="flex-1 mt-8">
          <ul className="space-y-4">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              return (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center gap-2 py-2 px-3 rounded-md ${
                        isActive
                          ? "bg-blue-700 text-white"
                          : "hover:bg-blue-800"
                      }`
                    }
                  >
                    <LinkIcon size={18} color="white" /> {link.name}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
