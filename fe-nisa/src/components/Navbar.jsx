import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiMenuFoldLine, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-purple-500 text-white md:relative">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          <Link to="/" className="hover:text-white">
           	Moving Address
          </Link>
        </h2>
        <button className="md:hidden focus:outline-none" onClick={toggleMenu}>
          {isOpen ? (
            <RiCloseLine className="w-6 h-6" />
          ) : (
            <RiMenuFoldLine className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;