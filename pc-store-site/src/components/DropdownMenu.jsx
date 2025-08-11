import React, { useState, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";

const DropdownMenu = ({ label, links }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      timeoutRef.current = null;
    }, 5);
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <button className="nav-link flex items-center gap-1 py-2">
        {label}
        <FaChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } text-xs`}
        />
      </button>

      {isOpen && (
        <div className="dropdown-gold">
          <div className="dropdown-gold-inner">
            <ul className="flex flex-col text-lg">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block px-5 py-3 hover:bg-yellow-700 text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
