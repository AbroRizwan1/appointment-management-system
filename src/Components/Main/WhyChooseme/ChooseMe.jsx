import { ShieldCheck, Users, Clock, Heart } from "lucide-react";
import whyImage from "../../../assets/chooseMe.avif";
import HeadingText from "../../HeadingText";

const features = [
  {
    icon: <ShieldCheck size={24} className="text-blue-500" />,
    title: "Trusted & Safe",
    desc: "We maintain strict hygiene and patient safety standards.",
  },
  {
    icon: <Users size={24} className="text-green-500" />,
    title: "Professional Team",
    desc: "Experienced doctors and healthcare staff at your service.",
  },
  {
    icon: <Clock size={24} className="text-purple-500" />,
    title: "24/7 Support",
    desc: "Round-the-clock assistance for all our patients.",
  },
  {
    icon: <Heart size={24} className="text-pink-500" />,
    title: "Patient Care",
    desc: "We prioritize care, comfort, and empathy for every patient.",
  },
];

const ChooseMe = () => {
  return (
    <section className="py-20 px-4 md:px-10 bg-gray-50 ">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        {/* Left Image */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <img
            src={whyImage}
            alt="Why Choose Us"
            className="lg:w-[70%] md:w-[80%] md:w-[64%] rounded-xl shadow-lg object-cover"
          />
        </div>
        {/* Right Text */}
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Why Choose Us
          </h2>
          <p className="text-gray-600 mb-8">
            Our clinic is trusted by thousands of patients. Here’s why you
            should choose us:
          </p>

          {/* Points */}
          <div className="flex flex-col gap-6">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">{feature.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseMe;
