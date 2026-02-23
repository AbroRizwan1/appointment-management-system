import Button from "../Button";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import StatsCard from "./StatsCard";
const Leftside = () => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="
      flex flex-col items-center lg:items-start
      justify-center
      px-4 sm:px-8 lg:px-20
      pt-24 sm:pt-28 md:pt-18 lg:pt-0
      text-center lg:text-left
    "
      >
        {/* Heading */}
        <h1
          className="
        text-3xl sm:text-4xl md:text-6xl xl:text-7xl
        font-semibold
        text-gray-50
        leading-tight
        max-w-4xl
      "
        >
          Medicine <br className="hidden sm:block" />
          And Clinic Center
        </h1>

        {/* Paragraph */}
        <p
          className="
        text-sm sm:text-base md:text-lg lg:text-xl
        text-gray-200
        mt-5
        max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl
      "
        >
          We provide trusted healthcare services with experienced doctors and
          modern facilities. Our mission is to make quality medical care simple,
          accessible, and comfortable for every patient.
        </p>

        {/* Button */}
        <div className="mt-6">
          <Button
            text="Book Appointment"
            onClick={() => navigate("/Appointment")}
          />
        </div>
      </div>
    </>
  );
};

export default Leftside;
