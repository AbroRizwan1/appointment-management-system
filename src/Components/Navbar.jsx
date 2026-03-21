// import { CalendarCheck, LogIn, ArrowRight, Plus, Trash2 } from "lucide-react";
import {
  Home,
  User,
  Stethoscope,
  Phone,
  LogIn,
  CalendarCheck,
} from "lucide-react";
import Button from "./Button";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/Doctors/slotify.png";

const Navbar = ({
  ScrollSection,
  homeref,
  doctorsref,
  servicesref,
  contactref,
}) => {
  const [active, setActive] = useState("home");

  const navigate = useNavigate();

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          zIndex: 1,
          background: "#fff",
          width: "100%",
        }}
        className="hidden md:flex items-center justify-between lg:px-14 md:px-4 py-6 mb-1  bg-gray-50  shadow-xl "
      >
        <h1 className="lg:text-4xl lg:text-3xl md:text-2xl font-medium  text-gray-800">
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            Slotify
          </button>
        </h1>

        <ul className=" flex items-center justify-center lg:w-[50%] md:w-[40%] gap-6 lg:gap-10">
          <li
            className={`${active === "home" ? "active" : "scale-100"} nav-link md:text-[92%] lg:text-xl font-medium`}
          >
            {/* <Link to="/">Home</Link> */}
            <button
              className={`${active === "home" ? "active scale-110" : ""} cursor-pointer transition-all ease-in-out duration-200`}
              onClick={() => {
                setActive("home");
                ScrollSection(homeref);
              }}
            >
              Home
            </button>
          </li>
          <li
            className={`${active === "doctor" ? "active" : "scale-100"} nav-link md:text-[92%] lg:text-xl font-medium`}
          >
            {/* <Link to="/doctors">Doctor</Link> */}
            <button
              className={`${active === "doctor" ? "active scale-110" : ""} cursor-pointer transition-all ease-in-out duration-200`}
              onClick={() => {
                setActive("doctor");
                ScrollSection(doctorsref);
              }}
            >
              Doctors
            </button>
          </li>
          <li
            className={`${active === "service" ? "active" : "scale-100"} nav-link md:text-[92%] lg:text-xl font-medium`}
          >
            {/* <Link to="/services">Services</Link> */}
            <button
              className={`${active === "service" ? "active scale-110" : ""} cursor-pointer transition-all ease-in-out duration-200`}
              onClick={() => {
                setActive("service");
                ScrollSection(servicesref);
              }}
            >
              Services
            </button>
          </li>
          <li
            className={`${active === "contact" ? "active" : "scale-100"} nav-link md:text-[92%] lg:text-xl font-medium`}
          >
            {/* <Link to="/contact">Contact</Link> */}
            <button
              className={`${active === "contact" ? "active scale-110" : ""} cursor-pointer transition-all ease-in-out duration-200`}
              onClick={() => {
                setActive("contact");
                ScrollSection(contactref);
              }}
            >
              Contact
            </button>
          </li>
        </ul>
        <div>
          <Button
            className=" sm:text-sm md:text-[base] lg:text-lg "
            text="Book appointment"
            onClick={() => navigate("/Appointment")}
          />
          <Button
            className=" sm:!px-3 sm:!py-2 sm:text-sm md:text-[base] ml-2 lg:text-lg "
            text="Login"
            variant="secondary"
            icon={LogIn}
            onClick={() => navigate("/login")}
          />
        </div>
      </nav>

      {/* BOTTOM NAVBAR (Mobile) */}

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3">
        <div className="bg-white/90 backdrop-blur-md border border-gray-100 shadow-xl shadow-black/10 rounded-2xl px-2 py-2">
          <ul className="flex justify-around items-center">
            {[
              {
                key: "home",
                icon: Home,
                label: "Home",
                action: () => {
                  setActive("home");
                  ScrollSection(homeref);
                  navigate("/");
                },
              },
              {
                key: "doctor",
                icon: User,
                label: "Doctors",
                action: () => {
                  setActive("doctor");
                  ScrollSection(doctorsref);
                },
              },
              {
                key: "service",
                icon: Stethoscope,
                label: "Services",
                action: () => {
                  setActive("service");
                  ScrollSection(servicesref);
                },
              },
              {
                key: "contact",
                icon: Phone,
                label: "Contact",
                action: () => {
                  setActive("contact");
                  ScrollSection(contactref);
                },
              },
              {
                key: "login",
                icon: LogIn,
                label: "Login",
                action: () => navigate("/login"),
                isLogin: true,
              },
            ].map(({ key, icon: Icon, label, action, isLogin }) => {
              const isActive = active === key;
              return (
                <li key={key} className="flex-1">
                  <button
                    onClick={action}
                    className={`
                relative w-full flex flex-col items-center gap-0.5 py-1.5 px-1 rounded-xl
                transition-all duration-200 active:scale-95
                ${
                  isLogin
                    ? "text-blue-500"
                    : isActive
                      ? "text-blue-600"
                      : "text-gray-400 hover:text-gray-600"
                }
              `}
                  >
                    {/* Active pill background */}
                    {isActive && (
                      <span className="absolute inset-0 bg-blue-50 rounded-xl" />
                    )}

                    {/* Icon */}
                    <span className="relative">
                      <Icon
                        size={20}
                        className={`transition-all duration-200 ${isActive ? "stroke-[2.5]" : "stroke-[1.8]"}`}
                      />
                      {/* Active dot */}
                      {isActive && (
                        <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      )}
                    </span>

                    {/* Label */}
                    <span
                      className={`relative text-[10px] font-medium leading-none transition-all duration-200 ${isActive ? "font-semibold" : ""}`}
                    >
                      {label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
