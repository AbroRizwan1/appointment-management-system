import {
  Stethoscope,
  UserRound,
  HeartPulse,
  CalendarCheck,
} from "lucide-react";
import HeadingText from "../../HeadingText";

const services = [
  {
    icon: <UserRound size={28} />,
    title: "Expert Doctors",
    desc: "Highly qualified doctors with years of experience.",
  },
  {
    icon: <Stethoscope size={28} />,
    title: "Medical Checkups",
    desc: "Advanced diagnostic and regular health checkups.",
  },
  {
    icon: <HeartPulse size={28} />,
    title: "Emergency Care",
    desc: "24/7 emergency healthcare services available.",
  },
  {
    icon: <CalendarCheck size={28} />,
    title: "Easy Appointment",
    desc: "Book your appointment online in minutes.",
  },
];

const Services = () => {
  return (
    <section className="px-4 md:px-10  bg-gray-50 mt-18  ">
      <HeadingText
        heading="Our Services"
        text="Trusted healthcare services designed for your comfort."
      />

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mt-18 mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="group bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* Icon */}
            <div
              className="w-14 h-14 flex items-center justify-center rounded-xl
              bg-gradient-to-br from-blue-500 to-indigo-500 text-white mb-6
              group-hover:scale-110 transition"
            >
              {service.icon}
            </div>

            {/* Text */}
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {service.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
