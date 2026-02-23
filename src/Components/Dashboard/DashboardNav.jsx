import React from "react";

const DashboardNav = ({ setIsLogin }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));

  return (
    <div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
px-4 sm:px-6 md:px-10 lg:px-16 
py-3 sm:py-4 
gap-3 sm:gap-0 
text-gray-700"
    >
      {/* Admin Role */}
      <nav className="text-xl sm:text-2xl md:text-3xl font-semibold">
        {admin.role}
      </nav>

      {/* Logout Button */}
      <button
        className="bg-red-800 text-white 
    px-4 sm:px-5 md:px-6 
    py-2 sm:py-2.5 md:py-3 
    text-sm sm:text-base 
    rounded-lg 
    w-full sm:w-auto
    hover:bg-red-900 transition"
        onClick={() => {
          localStorage.removeItem("admin");
          setIsLogin(false);
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardNav;
