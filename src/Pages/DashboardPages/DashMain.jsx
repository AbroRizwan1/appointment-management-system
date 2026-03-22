import { motion, useSpring, useInView } from "framer-motion";
import { useContext, useState, useMemo } from "react";
import { AppContext } from "../../Context/SidebarContext";
import StateCardDash from "./StateCardDash";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Table, { StatusBadge } from "../../Components/Table";

import {
  XIcon,
  CheckIcon,
  ClockIcon,
  CalendarIcon,
} from "../../Constant/Icons";

const columns = [
  { key: "name", label: "Patient Name" },
  { key: "phone", label: "Phone" },
  { key: "select", label: "doctor" },
  { key: "date", label: "date" },

  { key: "slot", label: "Slot" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge value={val} />,
  },
];




const DashMain = () => {
  const { active, activeLabel } = useContext(AppContext);

  const objStatus = useMemo(() => {
    const appointments = JSON.parse(localStorage.getItem("appointmentData"));
    const objStatus = {
      completed: appointments.filter((apt) => apt.status === "completed")
        .length,
      cancelled: appointments.filter((apt) => apt.status === "cancelled")
        .length,
      pending: appointments.filter((apt) => apt.status === "pending").length,
      total: appointments.length,
    };
    return objStatus;
  });

  const cards = [
    {
      label: "Total Appointments",
      value: objStatus.total,
      icon: <CalendarIcon />,
      gradient: "from-[#e0f2fe] via-[#f0f9ff] to-[#f8fafc]",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-500",
      accent: "bg-sky-400",
      numberColor: "text-sky-700",
      border: "border-sky-100",
      delay: 0,
    },
    {
      label: "Pending",
      value: objStatus.pending,
      icon: <ClockIcon />,
      gradient: "from-[#fef9c3] via-[#fefce8] to-[#f8fafc]",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-500",
      accent: "bg-amber-400",
      numberColor: "text-amber-700",
      border: "border-amber-100",
      delay: 0.1,
    },
    {
      label: "Completed",
      value: objStatus.completed,
      icon: <CheckIcon />,
      gradient: "from-[#dcfce7] via-[#f0fdf4] to-[#f8fafc]",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-500",
      accent: "bg-emerald-400",
      numberColor: "text-emerald-700",
      border: "border-emerald-100",
      delay: 0.2,
    },
    {
      label: "Cancelled",
      value: objStatus.cancelled,
      icon: <XIcon />,
      gradient: "from-[#ffe4e6] via-[#fff1f2] to-[#f8fafc]",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-400",
      accent: "bg-rose-400",
      numberColor: "text-rose-600",
      border: "border-rose-100",
      delay: 0.3,
    },
  ];

  const appointmentData = useMemo(() => {
    return JSON.parse(localStorage.getItem("appointmentData")) || [];
  }, []);

  const recentAppointments = [...appointmentData].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div>
      <main className="flex-1 p-3 sm:p-4 md:p-6">
        <div className="max-w-8xl mx-auto">
          <div className="w-full">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 sm:mb-8"
            >
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                Dashboard / {active}
              </p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4 sm:mb-6">
                {activeLabel}
              </h1>
            </motion.div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {cards.map((card, i) => (
                <StateCardDash key={i} card={card} />
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1  md:grid-cols-3  gap-3 py-4 sm:py-6">
              <div className="bg-white p-3 sm:p-4  md:col-span-2 rounded-lg shadow">
                <LineChart />
              </div>
              <div className="bg-white p-3 sm:p-4 rounded-lg shadow">
                <PieChart />
              </div>
            </div>

            {/* Table */}
            <Table
              title="Recent Appointments"
              subtitle=""
              columns={columns}
              data={recentAppointments}
              pageSize={4}
              onRowClick={(row) => console.log(row)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashMain;
