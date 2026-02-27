import React, { useRef } from "react";
// import Navbar from "../Navbar";
import Main from "./Main";
import DoctorsCard from "./DoctorsCard/DoctorsCard";
import Services from "./Services/Services";
import ChooseMe from "./WhyChooseme/ChooseMe";
import CTASection from "./CTS/CTASection";
import QueryForm from "./QueryForm/QueryForm";
import Navbar from "../Navbar";

const Landing = ({
  homeref,
  doctorsref,
  servicesref,
  contactref,
  setAppointedDoc,
}) => {
  return (
    <>
    
      <Navbar
        // ScrollSection={ScrollSection}
        // homeref={homeref}
        // doctorsref={doctorsref}
        // servicesref={servicesref}
        // contactref={contactref}
      />

      <div className="bg-gray-50">
        <section ref={homeref}>
          <Main id="main" />
        </section>

        <section ref={servicesref}>
          <Services id="services" />
        </section>

        <section ref={doctorsref}>
          <DoctorsCard id="doctorscard" onselectDoctor={setAppointedDoc} />
        </section>
        <ChooseMe id="chooseme" />
      </div>
      <CTASection id="ctasection" />

      <section ref={contactref}>
        <QueryForm />
      </section>
    </>
  );
};

export default Landing;
