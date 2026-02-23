import five from "../../Button";
import React, { useEffect, useState } from "react";
import Button from "../../Button";
import { Heading } from "lucide-react";
import HeadingText from "../../HeadingText";
import Input from "../../Input";
import { doctorsList } from "../../DoctorsData";

const DoctorsCard = ({ onselectDoctor }) => {
  const [selectFilter, setSelectFilter] = useState("all");

  //------ filter
  const filteredDoctors = doctorsList.filter((doctor) => {
    if (selectFilter === "all") return true;
    return doctor.status === selectFilter;
  });

  function handleFilter(e) {
    setSelectFilter(e.target.value);
  }

  return (
    <>
      <div className="mb-4 mt-20 bg-gray-50 ">
        <HeadingText
          heading="Meet Our Doctors"
          text="Our expert doctors provide quality care with compassion, keeping your health and comfort our top priority."
        />
      </div>

      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-30 no-scroll-x">
        <div className="flex justify-end items-center  ">
          {/* ============ DropDown */}
          <Input
            value={selectFilter}
            design="default"
            options={[
              {
                value: `all`,
                label: `All Doctors ( ${filteredDoctors.length} ) `,
              },
              {
                value: `available`,
                label: `Available Now ( ${
                  doctorsList.filter((doctor) => doctor.status === "available")
                    .length
                } ) `,
              },
              {
                value: `Unavailable`,
                label: `Unavailable ( ${
                  doctorsList.filter(
                    (doctor) => doctor.status === "Unavailable",
                  ).length
                } )`,
              },
            ]}
            onChange={(e) => {
              handleFilter(e);
            }}
          />
        </div>

        <div className="w-full rounded-lg pt-5 ">
          {/* Horizontal Scroll Container */}
          <div className="flex gap-4 overflow-x-auto py-8 scrollbar-hide no-scrollbar">
            {filteredDoctors.length === 0 ? (
              <p className="text-gray-600">
                No doctors available for this filter.
              </p>
            ) : (
              filteredDoctors.map((doctor, idx) => (
                <div
                  key={idx}
                  className="
                flex-shrink-0
                lg:w-86 sm:w-[300px] md:w-80
                bg-white rounded-xl shadow-md
                flex flex-col items-center justify-between
                py-8 px-6 border border-gray-100
                transition transform hover:scale-105
              "
                >
                  {/* Status Badge */}
                  <div className="flex items-end w-full justify-end">
                    <span
                      className={`px-3 py-1 mb-8 rounded-full text-white font-semibold ${
                        doctor.status === "available"
                          ? "bg-green-600"
                          : "bg-red-600"
                      }`}
                    >
                      {doctor.status === "available"
                        ? "Available"
                        : "Not Available"}
                    </span>
                  </div>

                  {/* Image */}
                  <img
                    src={doctor.image}
                    alt={doctor.title}
                    className="
                  w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36
                  rounded-full object-cover
                  border-4 border-white shadow-md
                "
                  />

                  {/* Text */}
                  <div className="py-4 text-center">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                      {doctor.title}
                    </h2>
                    <p className="text-gray-600 mt-2 text-sm sm:text-base">
                      {doctor.description}
                    </p>
                  </div>

                  {/* Appointment Button */}

                  <Button
                    onClick={() => {
                      onselectDoctor(doctor.title);
                    }}
                    text="Appoint"
                    variant="outline"
                    className="w-full mt-2"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DoctorsCard;
