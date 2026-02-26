import React, { useEffect, useState } from "react";
import { CheckCircle, XCircle, Trash2, Pencil, Undo2 } from "lucide-react";
import Input from "../Input";
import Button from "../Button";
import * as XLSX from "xlsx";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ setIsLogin }) => {
  const [appointments, setAppointments] = useState([]);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null); // temporarily store deleted item

  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const status = {
    confirmed: "Confirmed",
    cancelled: "Cancelled",
    pending: "Pending",
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("appointmentData")) || [];
    if (data) {
      setAppointments(data);
    } else {
      setAppointments([]);
    }

    const updatedData = data.map((apt) => ({
      ...apt,
      status: apt.status || "Pending", // default to pending if no status
    }));
    setAppointments(updatedData);
  }, []);

  //  =========== Confirm
  const handleConfirm = (id) => {
    // status update
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status: status.confirmed } : apt,
    );
    setAppointments(updated);
    localStorage.setItem("appointmentData", JSON.stringify(updated));

    // whatsapp message
    const data = localStorage.getItem("appointmentData");
    const Id = JSON.parse(data).find((item) => item.id === id);

    let phoneNumber = Id.phone.replace(/\D/g, "");
    if (!phoneNumber.startsWith("92")) {
      phoneNumber = "92" + phoneNumber.substring(1); // Pakistan code
    }

    const appointmentDate = new Date(Id.date);
    const formattedDate = appointmentDate.toLocaleDateString("en-US", {
      weekday: "short", // Mon, Tue...
      year: "numeric",
      month: "short", // Jan, Feb...
      day: "numeric",
    });

    const name = (Id.name =
      Id.name.charAt(0).toUpperCase() + Id.name.slice(1).toLowerCase());
    const message = `Hello ${name}, your appointment with ${Id.select} on ${formattedDate} at  ${Id.slot} is confirmed. Thankyou`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, "_blank");
  };

  // ===================  Cancel
  const handleCancel = (id) => {
    const updated = appointments.map((apt) =>
      apt.id === id ? { ...apt, status: status.cancelled } : apt,
    );
    setAppointments(updated);
    localStorage.setItem("appointmentData", JSON.stringify(updated));
  };

  // ================  Delete
  const handleDelete = (id) => {
    const index = appointments.findIndex((apt) => apt.id === id);
    const deletedItem = appointments[index];

    const updated = appointments.filter((apt) => apt.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointmentData", JSON.stringify(updated));

    // ======= undo Option
    setRecentlyDeleted({ item: deletedItem, index });
  };

  // ======== Undo Button
  const handleUndoDelete = () => {
    if (recentlyDeleted) {
      const { item, index } = recentlyDeleted;
      const updated = [...appointments];
      updated.splice(index, 0, item);
      setAppointments(updated);
      localStorage.setItem("appointmentData", JSON.stringify(updated));
      setRecentlyDeleted(null);
    }
  };

  // ================ Edit
  const handleEdit = (id) => {
    const data = JSON.parse(localStorage.getItem("appointmentData"));

    navigate("/appointment", {
      state: {
        data: data[id],
      },
    });
  };

  // ================ Search
  const handleSearch = (value) => {
    setSearch(value);
  };

  // ============== Download
  const DownloadData = () => {
    const data = JSON.parse(localStorage.getItem("appointmentData")) || [];
    if (data.length === 0) {
      alert("No data to download");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Appointments");

    XLSX.writeFile(workbook, "appointments.xlsx");
  };

  return (
    <div className="bg-gray-100">
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-5 mt-5 mb-3 gap-4">
          {/* Heading */}
          <h1 className="text-xl md:text-2xl font-semibold">
            Appointments Dashboard
          </h1>

          {/* Search + Button */}
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Search by name or phone"
                text="type"
                design="default"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <Button
              text="Download"
              variant="outline"
              className="rounded-lg w-full sm:w-auto"
              onClick={DownloadData}
            />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-3">ID Number</th>
                <th className="px-4 py-3">Token</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Slot</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {appointments
                .filter((appointment) => {
                  return (
                    appointment.name
                      .toLowerCase()
                      .includes(search.toLowerCase()) ||
                    appointment.phone.includes(search)
                  );
                })
                .map((appointment, index) => {
                  return (
                    <tr key={index} className=" hover:bg-gray-50 ">
                      <td className="px-4 py-4">{appointment.id}</td>
                      <td className="px-4 py-4">{appointment.token}</td>
                      <td className="px-4 py-4">{appointment.name}</td>
                      <td className="px-4 py-4">{appointment.email}</td>
                      <td className="px-4 py-4">{appointment.phone}</td>
                      <td className="px-4 py-4">{appointment.select}</td>
                      <td className="px-4 py-4">{appointment.date}</td>
                      <td className="px-4 py-4">{appointment.slot}</td>

                      <td
                        className={`
  px-2 py-2 sm:px-3 sm:py-3 md:px-4 md:py-4
  text-sm sm:text-base md:text-lg
  font-semibold
  ${
    appointment.status === status.confirmed
      ? "text-green-500"
      : appointment.status === status.cancelled
        ? "text-red-500"
        : "text-yellow-600"
  }
                      `}
                      >
                        {appointment.status}
                      </td>
                      <td>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          {/* Confirm */}
                          <button
                            onClick={() => handleConfirm(appointment.id)}
                            disabled={appointment.status === status.confirmed}
                          >
                            <CheckCircle
                              size={24}
                              className={`
        p-1 text-white rounded-full 
        ${
          appointment.status === status.confirmed
            ? "bg-green-300 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 cursor-pointer"
        }
      `}
                            />
                          </button>

                          {/* Cancel */}
                          <button
                            onClick={() => handleCancel(appointment.id)}
                            disabled={appointment.status === status.cancelled}
                          >
                            <XCircle
                              size={24}
                              className={`
        p-1 text-white rounded-full
        ${
          appointment.status === status.cancelled
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 cursor-pointer"
        }
      `}
                            />
                          </button>

                          {/* Delete */}
                          <button onClick={() => handleDelete(appointment.id)}>
                            <Trash2
                              size={24}
                              className="bg-red-600 hover:bg-red-700 p-1 text-white rounded-full"
                            />
                          </button>

                          {/* Undo */}
                          {recentlyDeleted && (
                            <button
                              onClick={handleUndoDelete}
                              className="bg-gray-500 hover:bg-gray-600 p-1 text-white rounded-full"
                            >
                              <Undo2 size={20} />
                            </button>
                          )}

                          {/* Edit */}
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleEdit(index);
                            }}
                            className="bg-gray-600 hover:bg-gray-700 p-1 text-white rounded-full"
                            title="Edit"
                          >
                            <Pencil size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
