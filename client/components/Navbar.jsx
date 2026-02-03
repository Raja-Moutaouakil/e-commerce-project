import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, onLogout }) => {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-gray-100 shadow">
      <div className="text-xl font-bold">
        <Link to="/">Botanica Hair Boutique</Link>
      </div>
      <div className="flex gap-4 items-center">
        {!isAuthenticated ? (
          <>
            <Link to="/auth" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Login</Link>
            <Link to="/auth" className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600">Register</Link>
          </>
        ) : (
          <>
            <span className="text-gray-700">Welcome!</span>
            <button onClick={onLogout} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;