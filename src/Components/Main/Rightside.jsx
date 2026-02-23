import React from "react";

import doctorImage from "../../assets/doctor.png";

const Rightside = () => {
  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <img
        src={doctorImage}
        alt="Doctor"
        className="
      w-64 sm:w-80 md:w-[420px] lg:w-[500px] 
      object-contain lg:object-cover
      rounded-lg lg:rounded-r-lg
    "
      />
    </div>
  );
};

export default Rightside;
