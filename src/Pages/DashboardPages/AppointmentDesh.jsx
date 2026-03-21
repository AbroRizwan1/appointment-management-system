import { motion, useSpring, useInView } from "framer-motion";
import { AppContext } from "../../Context/SidebarContext";

import React, { useEffect, useState, useContext, useMemo } from "react";
import {
  CircleCheck,
  XCircle,
  Trash2,
  Undo2,
  Pencil,
  CalendarCheck,
} from "lucide-react";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";
import Table, { StatusBadge } from "../../Components/Table";

// localStorage.removeItem("appointmentData");

const AppointmentDesh = () => {
  const { active, activeLabel } = useContext(AppContext);

  const [appointments, setAppointments] = useState(() => {
    const data = localStorage.getItem("appointmentData");
    return data ? JSON.parse(data) : [];
  });

  const [recentlyDeleted, setRecentlyDeleted] = useState(null);

  const navigate = useNavigate();

  // ================= Load Data
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointmentData")) || [];

    const updatedData = data.map((apt) => ({
      ...apt,
      status: apt.status,
    }));

    setAppointments(updatedData);
  }, []);

  // ================= Confirm Appointment
  const handleConfirm = (id) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status: "confirmed" } : apt,
    );

    setAppointments(updated);
    localStorage.setItem("appointmentData", JSON.stringify(updated));

    const appointment = updated.find((item) => item.id === id);

    let phoneNumber = appointment.phone.replace(/\D/g, "");

    if (!phoneNumber.startsWith("92")) {
      phoneNumber = "92" + phoneNumber.substring(1);
    }

    const date = new Date();

    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };

    const formatted = date.toLocaleDateString("en-US", options);

    const name =
      appointment.name.charAt(0).toUpperCase() +
      appointment.name.slice(1).toLowerCase();

    const message = `Hello ${name}, your appointment with ${appointment.select} on ${formatted} at ${appointment.slot} is confirmed. Thank you`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank");
  };

  // ================= Completed Appointment
  const handleCompleted = (id) => {
    const updated = appointments.map((apt) => {
      let res = apt.id === id ? { ...apt, status: "completed" } : apt;
      return res;
    });

    setAppointments(updated);
    localStorage.setItem("appointmentData", JSON.stringify(updated));
  };

  useEffect(() => {
    localStorage.setItem("appointmentData", JSON.stringify(appointments));
  }, [appointments]);

  // ============== Cancelled
  const handleCancel = (id) => {
    const updated = appointments.map((apt) =>
      Number(apt.id) === Number(id) ? { ...apt, status: "cancelled" } : apt,
    );

    setAppointments(updated);
  };

  // ================= Delete Appointment
  const handleDelete = (id) => {
    const index = appointments.findIndex((apt) => apt.id === id);
    const deletedItem = appointments[index];

    const updated = appointments.filter((apt) => apt.id !== id);

    setAppointments(updated);
    localStorage.setItem("appointmentData", JSON.stringify(updated));

    setRecentlyDeleted({ item: deletedItem, index });
  };

  // ================= Undo Delete
  const handleUndoDelete = () => {
    if (!recentlyDeleted) return;

    const { item, index } = recentlyDeleted;

    const updated = [...appointments];
    updated.splice(index, 0, item);

    setAppointments(updated);
    localStorage.setItem("appointmentData", JSON.stringify(updated));

    setRecentlyDeleted(null);
  };

  // ================= Edit Appointment
  const handleEdit = (row) => {
    navigate("/appointment", {
      state: { data: row },
    });
  };

  // ================= Download Excel
  const downloadData = () => {
    let data = JSON.parse(localStorage.getItem("appointmentData")) || [];

    if (!data.length) {
      alert("No data to download");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

    XLSX.writeFile(workbook, "appointments.xlsx");
  };
  const columns = [
    { key: "id", label: "Id Number" },
    { key: "token", label: "Token" },
    { key: "name", label: "Patient Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "select", label: "Doctor" },
    { key: "date", label: "date" },
    { key: "slot", label: "Slot" },

    {
      key: "status",
      label: "Status",
      render: (val, row, index) => (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <StatusBadge value={val} />

          <div className="flex gap-1">
            {/* completed */}
            <button
              onClick={() => handleCompleted(row.id)}
              disabled={row.status === "completed"}
              title="Mark Completed"
              className={`group flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
    ${
      row.status === "completed"
        ? "bg-emerald-50 text-emerald-300 cursor-not-allowed"
        : "bg-emerald-50 hover:bg-emerald-500 text-emerald-500 hover:text-white cursor-pointer active:scale-95"
    }`}
            >
              <CircleCheck
                size={15}
                className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-[-8deg]"
              />
            </button>

            {/* Confirm */}
            <button
              onClick={() => handleConfirm(row.id)}
              disabled={row.status === "confirmed"}
              title="Confirm Appointment"
              className={`group flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                ${
                  row.status === "confirmed"
                    ? "bg-blue-50 text-blue-300 cursor-not-allowed"
                    : "bg-blue-50 hover:bg-blue-500 text-blue-400 hover:text-white cursor-pointer active:scale-95"
                }`}
            >
              <CalendarCheck
                size={15}
                className="transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6"
              />
            </button>

            {/* Cancel */}
            <button
              onClick={() => handleCancel(row.id)}
              disabled={row.status === "cancelled"}
              title="Cancel Appointment"
              className={`group flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-200
                 ${
                   row.status === "cancelled"
                     ? "bg-red-50 text-red-300 cursor-not-allowed"
                     : "bg-red-50 hover:bg-red-500 text-red-400 hover:text-white cursor-pointer active:scale-95"
                 }`}
            >
              <XCircle
                size={15}
                className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12"
              />
            </button>
            {/* Undo Delete (optional) */}
            {recentlyDeleted && (
              <button
                onClick={handleUndoDelete}
                title="Undo Delete"
                className="group flex items-center justify-center w-8 h-8 rounded-lg bg-amber-50 hover:bg-amber-500 text-amber-400 hover:text-white transition-all duration-200"
              >
                <Undo2
                  size={14}
                  className="transition-transform duration-200 group-hover:-rotate-45"
                />
              </button>
            )}
          </div>
        </div>
      ),
    },

    // Actions Column (Edit/Delete)
    {
      key: "actions",
      label: "Actions",
      render: (_, row, index) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleEdit(row)}
            title="Edit"
            className="group flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-800 text-gray-500 hover:text-white transition-all duration-200"
          >
            <Pencil
              size={14}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </button>

          <button
            onClick={() => handleDelete(row.id)}
            title="Delete"
            className="group flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 hover:bg-red-500 text-red-400 hover:text-white transition-all duration-200"
          >
            <Trash2
              size={14}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full p-5">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 sm:mb-8"
      >
        <p className="text-xs pl-5 font-bold text-slate-400 uppercase tracking-widest mb-1">
          Dashboard / {active}
        </p>

        <Table
          title="Appointments"
          subtitle=""
          columns={columns}
          data={appointments} // ✅
          pageSize={5}
          onAddNew={() => downloadData()}
          addNewLabel="Download"
          // onRowClick={(row) => console.log(row)}
        />
      </motion.div>
    </div>
  );
};

export default AppointmentDesh;
