import React, { useEffect, useState } from "react";
import HeadingText from "../HeadingText";
import Input from "../Input";
import Button from "../Button";
import { doctorsList } from "../DoctorsData";
import validateForm from "./ValidateForm";
import { useLocation, useNavigate } from "react-router-dom";

const AppointmentInputs = [
  {
    id: "input",
    label: "Patient Name",
    type: "text",
    placeholder: "Enter your patient name",
    value: "",
    name: "name",
  },
  {
    id: "input",
    label: "Email",
    type: "email",
    placeholder: "Enter your email address",
    value: "",
    email: "email",
    name: "email",
  },

  {
    id: "input",
    type: "number",
    label: "Phone",
    placeholder: "Enter your phone",
    value: "",
    name: "phone",
  },

  {
    id: "date",
    type: "date",
    label: "Date",
    placeholder: "Enter your date",
    value: "",
    name: "date",
  },

  {
    id: "select",
    label: "Select Doctor",
    type: "select",
    placeholder: "Enter your doctor's",
    value: "select",
    name: "select",
  },
];

const Appointment = ({ appointedDoc }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  // =========Get form data
  const [appointment, SetAppointment] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    select: "",
    slot: "",
  });

  const [AppointmentData, setAppointmentData] = useState(() => {
    const savedData = localStorage.getItem("appointmentData");
    return savedData ? JSON.parse(savedData) : [];
  });

  // =========== doctor List
  const selectedDoctor = doctorsList.find(
    (doc) => doc.title === appointment.select,
  );

  const editData = location.state?.data;

  // old Data filled to form when edit button click
  useEffect(() => {
    if (editData) {
      SetAppointment((prev) => ({
        ...prev,
        ...editData,
      }));
    }
  }, [editData]);

  //  =============== Submit Handler
  const handleAppointment = (e) => {
    e.preventDefault(); // ⛔ STOP browser submit

    // ========== validation
    const validationErrors = validateForm(appointment);
    setErrors(validationErrors);
    // ❗ if get errory → submit stop
    if (Object.keys(validationErrors).length > 0) return;

    const appointmentData =
      JSON.parse(localStorage.getItem("appointmentData")) || [];

    if (editData) {
      // EDIT CASE
      const updatedData = appointmentData.map((item) =>
        item.id === editData.id ? appointment : item,
      );
      localStorage.setItem("appointmentData", JSON.stringify(updatedData));
      navigate("/login");
    } else {
      // ADD CASE
      const newAppointment = {
        ...appointment,
        id: Date.now(), // only generate new id here
        token: appointmentData.length + 1,
        status: "pending",
      };

      appointmentData.push(newAppointment);
      localStorage.setItem("appointmentData", JSON.stringify(appointmentData));
    }
    alert(editData ? "Appointment Updated" : "Your Appointment has Submitted");

    // // form fileds Reset
    SetAppointment((prev) => ({
      ...prev,
      name: "",
      email: "",
      select: "",
      phone: "",
      date: "",
      slot: "",
    }));
  };

  return (
    <>
      <div className="xs:bg-red-600">
        <div className="my-10 md:mt-44  sm:my-20">
          <HeadingText
            heading="Book An Appointment"
            text="Fill Out The Form Schedule Your Appointment"
          />

          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
            <form
              onSubmit={(e) => {
                handleAppointment(e);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {AppointmentInputs.map((elem, idx) => {
                  if (elem.id === "input") {
                    return (
                      <div key={idx} className="w-full">
                        <Input
                          onChange={(e) => {
                            SetAppointment((prev) => ({
                              ...prev,
                              [elem.name]: e.target.value,
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              [elem.name]: "",
                            }));
                          }}
                          value={appointment?.[elem.name] || ""}
                          name={`${elem.name}`}
                          label={`${elem.label}`}
                          placeholder={`${elem.placeholder}`}
                          design="filled"
                        />
                        <p className="text-red-500 text-xs sm:text-sm mt-1">
                          {errors[elem.name]}
                        </p>
                      </div>
                    );
                  } else if (elem.id === "select") {
                    const doctorOptions = doctorsList.map((doctor) => ({
                      value: doctor.title, // ya doctor.id
                      label: doctor.title,
                      key: doctor.id,
                    }));

                    return (
                      <div key={idx}>
                        <Input
                          onChange={(e) => {
                            SetAppointment((prev) => ({
                              ...prev,
                              [elem.name]: e.target.value,
                              slot: "",
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              [elem.name]: "",
                            }));
                          }}
                          type={`${elem.type}`}
                          label={`${elem.label}`}
                          placeholder={`${elem.placeholder}`}
                          value={appointment?.[elem.name] || ""}
                          design="filled"
                          options={doctorOptions}
                        />
                        <p className="text-red-500 text-sm">
                          {errors[elem.name]}
                        </p>
                      </div>
                    );
                  } else if (elem.id === "date") {
                    return (
                      <div key={idx}>
                        <Input
                          onChange={(e) => {
                            SetAppointment((prev) => ({
                              ...prev,
                              [elem.name]: e.target.value,
                            }));
                            setErrors((prev) => ({
                              ...prev,
                              [elem.name]: "",
                            }));
                          }}
                          type={`${elem.type}`}
                          value={appointment?.[elem.name] || ""}
                          label={`${elem.label}`}
                          placeholder={`${elem.label}`}
                          design="filled"
                        />
                        <p className="text-red-500 text-sm">{errors.date}</p>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="border border-gray-300 mt-6 sm:mt-8 py-4 sm:py-5 px-3 sm:px-5 md:px-6 mb-5 rounded-lg">
                <h1 className="mb-4 sm:mb-6 text-gray-600 font-semibold text-base sm:text-lg">
                  Choose a Time Slot
                </h1>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {selectedDoctor ? (
                    selectedDoctor.slots.map((slotObj, idx) => (
                      <button
                        key={idx}
                        disabled={slotObj.booked}
                        className={`
          py-2 sm:py-3 md:py-4
          text-xs sm:text-sm md:text-base
          rounded-lg
          font-semibold
          transition
          ${
            slotObj.booked
              ? "bg-gray-300 text-gray-400 cursor-not-allowed"
              : appointment.slot === slotObj.time
                ? "bg-amber-500 text-white"
                : "bg-indigo-500 text-white hover:bg-indigo-600"
          }
        `}
                        onClick={(e) => {
                          e.preventDefault();
                          SetAppointment((prev) => ({
                            ...prev,
                            slot: slotObj.time,
                          }));
                          
                        }}
                      >
                        {slotObj.time}
                      </button>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-full">
                      Please select a doctor first
                    </p>
                  )}
                </div>
              </div>
              <p className="text-red-500 text-sm pb-3">{errors.slot}</p>
              <Button
                type="submit"
                text={editData ? "Update Appointment" : "Submit Appointment"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Appointment;
