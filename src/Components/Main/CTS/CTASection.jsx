import { useNavigate } from "react-router-dom";
import Button from "../../Button";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="absoulate py-20 px-4  -z-10 md:px-10  bg-[linear-gradient(60deg,rgba(172,193,242,1)_10%,rgba(255,212,216,1)_80%,rgba(172,193,242,1)_100%)]">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl bg-white/10  backdrop-blur-md p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          {/* Text */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white/90">
              Book Your Appointment Today
            </h2>
            <p className="text-white/90 mt-3 max-w-xl">
              Get expert medical care from trusted doctors. Book your
              appointment in just a few clicks.
            </p>
          </div>

          {/* Button */}
          <div>
            <Button
              text="Book Appointment"
              variant="primary"
              onClick={() => {
                navigate("/Appointment");
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
