import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardNav = ({ setIsLogin }) => {
  const admin = JSON.parse(localStorage.getItem("admin"));
  const [active, setActive] = React.useState("home");
  const navigate = useNavigate();

  return (
    <div
      className="
    
      w-full
      flex flex-col md:flex-row
      md:items-center md:justify-between
      gap-4
      px-4 sm:px-6 md:px-10 lg:px-16
      py-4
      text-gray-700
      bg-gray-100 shadow-sm
    "
    >
      {/* Admin Role */}
      <div className="text-center md:text-left text-xl sm:text-2xl font-semibold">
        {admin?.role}
      </div>

      {/* Menu */}
      <ul
        className="
        flex
        flex-col sm:flex-row
        items-center
        justify-center
        gap-4 sm:gap-8
      "
      >
        <li className="font-medium text-base sm:text-lg">
          <button
            className={`${
              active === "login" ? "scale-105 text-blue-600" : ""
            } transition duration-200`}
            onClick={() => {
              setActive("login");
              navigate("/login");
            }}
          >
            Appointment
          </button>
        </li>

        <li className="font-medium text-base sm:text-lg">
          <button
            className={`${
              active === "query" ? "scale-105 text-blue-600" : ""
            } transition duration-200`}
            onClick={() => {
              setActive("query");
              navigate("/query");
            }}
          >
            Queries
          </button>
        </li>
      </ul>

      {/* Logout */}
      <button
        className="
        bg-red-800 text-white
        px-5 py-2.5
        text-sm sm:text-base
        rounded-lg
        w-full md:w-auto
        hover:bg-red-900
        transition
      "
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