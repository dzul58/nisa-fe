import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiMenuFoldLine, RiCloseLine, RiLogoutBoxLine } from 'react-icons/ri';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="bg-[#6A1B9A] text-white md:relative">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          <Link to="/" className="hover:text-white">
            Moving Address
          </Link>
        </h2>
        <div className="flex items-center">
          <button
            className="bg-white text-[#6A1B9A] px-4 py-2 rounded-md mr-4 hover:bg-gray-200"
            onClick={handleLogout}
          >
            <RiLogoutBoxLine className="inline-block mr-2" />
            Logout
          </button>
          <button className="md:hidden focus:outline-none" onClick={handleLogout}>
            {isOpen ? (
              <RiCloseLine className="w-6 h-6" />
            ) : (
              <RiMenuFoldLine className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;