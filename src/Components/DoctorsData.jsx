import one from "../assets/Doctors/one.avif";
import two from "../assets/Doctors/two.avif";
import three from "../assets/Doctors/three.avif";
import four from "../assets/Doctors/four.avif";
// import five from "../assets/Doctors/five.avif";

export const doctorsList = [
  {
    id: 1,
    image: one,
    title: "Dr. John Doe",
    description: "Specialist in Cardiology",
    status: "Unavailable", // ya "Unavailable"
    slots: [
      { time: "1:00 AM", booked: false },
      { time: "2:30 AM", booked: false },
      { time: "3:00 AM", booked: false },
      { time: "4:30 AM", booked: false },
      { time: "5:00 AM", booked: false },
    ],
  },

  {
    id: 2,
    image: two,
    title: "Dr. Jane Smith",
    description: "Dentist with 10 years of experience",
    status: "available", // ya "Unavailable"
    token: 1,
    status2: "pending",
    slots: [
      { time: "10:00 AM", booked: false },
      { time: "10:30 AM", booked: true },
      { time: "11:00 AM", booked: false },
    ],
  },
  {
    id: 3,
    image: three,
    title: "Dr. Isabella Brown",
    description: "Neurologist expert in brain disorders",
    status: "Unavailable", // ya "Unavailable"
    token: 3,
    status2: "completed",
    slots: [
      { time: "10:00 AM", booked: false },
      { time: "10:30 AM", booked: true },
      { time: "11:00 AM", booked: false },
    ],
  },
  {
    id: 4,
    image: four,
    title: "Dr. Michael Johnson",
    description: "Oncologist with 20+ years of experience",
    status: "available", // ya "Unavailable"
    token: 4,
    status2: "confirmed",
    slots: [
      { time: "10:00 AM", booked: false },
      { time: "10:30 AM", booked: true },
      { time: "11:00 AM", booked: false },
    ],
  },
];
