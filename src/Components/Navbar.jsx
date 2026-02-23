import { Home, User, Stethoscope, Phone, CalendarCheck } from "lucide-react";
import Button from "./Button";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = ({
  ScrollSection,
  homeref,
  doctorsref,
  servicesref,
  contactref,
}) => {
  const [active, setActive] = useState("home");
  const [DesActive, setDesActive] = useState("home");

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
        className="hidden md:flex items-center justify-between px-8 py-6 mb-1 bg-gray-50  shadow-xl "
      >
        <h1 className="lg:text-4xl lg:text-3xl md:text-2xl font-medium  text-gray-800">
          <button
            className="cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
          >
            MediSense
          </button>
        </h1>

        <ul className="flex items-center justify-center gap-7">
          <li
            className={`${active === "home" ? "active" : "scale-90"} nav-link md:text-[92%] lg:text-xl font-medium`}
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
            className={`${active === "doctor" ? "active" : "scale-90"} nav-link md:text-[92%] lg:text-xl font-medium`}
          >
            {/* <Link to="/doctors">Doctor</Link> */}
            <button
              className={`${active === "home" ? "active scale-110" : ""} cursor-pointer transition-all ease-in-out duration-200`}
              onClick={() => {
                setActive("doctor");
                ScrollSection(doctorsref);
              }}
            >
              Doctors
            </button>
          </li>
          <li
            className={`${active === "service" ? "active" : "scale-90"} nav-link md:text-[92%] lg:text-xl font-medium`}
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
            className={`${active === "contact" ? "active" : "scale-90"} nav-link md:text-[92%] lg:text-xl font-medium`}
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
        <Button
          text="Book Appointment"
          onClick={() => navigate("/Appointment")}
        />
      </nav>

      {/* BOTTOM NAVBAR (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full shadow-lg bg-white  z-10">
        <ul className="flex justify-around py-4 shadow-2xl text-sm mb-4 text-gray-600 rounded-xl mx-5   ">
          <li
            className={`flex flex-col items-center cursor-pointer transition-all ease-in-out duration-300 ${
              active === "home"
                ? "scale-108  text-indigo-600 font-semibold"
                : ""
            }`}
          >
            <button
              onClick={() => {
                setActive("home");
                ScrollSection(homeref);
                navigate("/");
              }}
            >
              <Home
                size={20}
                className={active === "home" ? "stroke-[2.6]" : ""}
              />
            </button>
            Home
          </li>
          <li
            className={`flex flex-col items-center cursor-pointer transition-all ease-in-out duration-300 ${
              active === "doctor"
                ? "scale-108  text-indigo-600 font-semibold"
                : ""
            }`}
          >
            <button
              onClick={() => {
                setActive("doctor");
                ScrollSection(doctorsref);
              }}
            >
              <User
                size={20}
                className={active === "service" ? "stroke-[2.6]" : ""}
              />
            </button>
            Doctors
          </li>

          <li
            className={`flex flex-col items-center cursor-pointer transition-all ease-in-out duration-300 ${
              active === "service"
                ? "scale-108  text-indigo-600 font-semibold"
                : ""
            }`}
          >
            <button
              onClick={() => {
                setActive("service");
                ScrollSection(servicesref);
              }}
            >
              <Stethoscope
                size={20}
                className={active === "home" ? "stroke-[2.6]" : ""}
              />
            </button>
            Services
          </li>

          <li
            className={`flex flex-col items-center cursor-pointer transition-all ease-in-out duration-300 ${
              active === "contact"
                ? "scale-108  text-indigo-600 font-semibold"
                : ""
            }`}
          >
            <button
              onClick={() => {
                setActive("contact");
                ScrollSection(contactref);
              }}
            >
              <Phone
                size={20}
                className={active === "home" ? "stroke-[2.6]" : ""}
              />
            </button>
            Contact
          </li>

          <button
            onClick={() => navigate("/Appointment")}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full outline-none
             hover:bg-indigo-700 transition-all duration-300"
          >
            <CalendarCheck size={18} />
          </button>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
