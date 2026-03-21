import React, { useRef } from "react";
import Main from "../Pages/Landingpage/HeroSection/Main";
import DoctorsCard from "../Pages/Landingpage/DoctorsCard/DoctorsCard";
import Services from "../Pages/Landingpage/Services/Services";
import ChooseMe from "../Pages/Landingpage/WhyChooseme/ChooseMe";
import CTASection from "../Pages/Landingpage/CTS/CTASection";
import QueryForm from "../Pages/Landingpage/QueryForm/QueryForm";
import Navbar from "../Components/Navbar";

const Landing = ({
  homeref,
  doctorsref,
  servicesref,
  contactref,
  setAppointedDoc,
  ScrollSection,
}) => {
  return (
    <>
      <h1>Hellow</h1>
      <Navbar
        ScrollSection={ScrollSection}
        homeref={homeref}
        doctorsref={doctorsref}
        servicesref={servicesref}
        contactref={contactref}
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
