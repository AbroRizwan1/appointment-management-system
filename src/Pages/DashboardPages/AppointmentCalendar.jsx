import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  User,
  Stethoscope,
  Search,
  CalendarDays,
  X,
} from "lucide-react";

const normalizeStatus = (val) => {
  if (!val) return "Pending";
  const map = {
    confirmed: "Confirmed",
    pending: "Pending",
    completed: "Completed",
    cancelled: "Cancelled",
    canceled: "Cancelled",
    complete: "Completed",
    confirm: "Confirmed",
  };
  return map[val.toLowerCase()] ?? val;
};

// ─── Status Config ─────────────────────────────────────────────────────────
const STATUS = {
  Confirmed: {
    color: "bg-blue-500",
    light: "bg-blue-50 text-blue-700",
    ring: "ring-blue-200",
    dot: "bg-blue-500",
    bar: "bg-blue-500",
    footerBg: "bg-blue-50",
    footerText: "text-blue-700",
    footerCount: "text-blue-600",
    footerBorder: "border-blue-100",
  },
  Pending: {
    color: "bg-amber-400",
    light: "bg-amber-50 text-amber-600",
    ring: "ring-amber-200",
    dot: "bg-amber-400",
    bar: "bg-amber-400",
    footerBg: "bg-amber-50",
    footerText: "text-amber-600",
    footerCount: "text-amber-500",
    footerBorder: "border-amber-100",
  },
  Completed: {
    color: "bg-green-500",
    light: "bg-green-50 text-green-700",
    ring: "ring-green-200",
    dot: "bg-green-500",
    bar: "bg-green-500",
    footerBg: "bg-green-50",
    footerText: "text-green-700",
    footerCount: "text-green-600",
    footerBorder: "border-green-100",
  },
  Cancelled: {
    color: "bg-red-500",
    light: "bg-red-50 text-red-600",
    ring: "ring-red-200",
    dot: "bg-red-500",
    bar: "bg-red-500",
    footerBg: "bg-red-50",
    footerText: "text-red-600",
    footerCount: "text-red-500",
    footerBorder: "border-red-100",
  },
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const pad = (n) => String(n).padStart(2, "0");
const makeKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;

export default function AppointmentCalendar() {
  const today = new Date();

  const [viewDate, setViewDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );
  const [selected, setSelected] = useState(today);
  const [search, setSearch] = useState("");

  const vy = viewDate.getFullYear();
  const vm = viewDate.getMonth();

  const firstDOW = new Date(vy, vm, 1).getDay();
  const daysInMonth = new Date(vy, vm + 1, 0).getDate();
  const prevTotal = new Date(vy, vm, 0).getDate();

  const cells = useMemo(() => {
    const out = [];
    for (let i = 0; i < firstDOW; i++)
      out.push({ day: prevTotal - firstDOW + 1 + i, cur: false });
    for (let d = 1; d <= daysInMonth; d++) out.push({ day: d, cur: true });
    while (out.length < 42)
      out.push({ day: out.length - firstDOW - daysInMonth + 1, cur: false });
    return out;
  }, [vy, vm, firstDOW, daysInMonth, prevTotal]);

  const appointments = useMemo(
    () => JSON.parse(localStorage.getItem("appointmentData")) || [],
    [],
  );

  const data = useMemo(() => {
    return appointments.reduce((acc, app) => {
      const dateObj = new Date(app.date);
      const key = makeKey(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        dateObj.getDate(),
      );
      if (!acc[key]) acc[key] = [];
      acc[key].push({
        id: app.id,
        time: app.slot,
        patient: app.name,
        doctor: app.select,
        status: app.status,
        status: normalizeStatus(app.status),
      });
      return acc;
    }, {});
  }, [appointments]);

  const selKey = makeKey(
    selected.getFullYear(),
    selected.getMonth(),
    selected.getDate(),
  );
  const todayKey = makeKey(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  const rawAppts = data[selKey] ?? [];

  const appts = useMemo(() => {
    if (!search.trim()) return rawAppts;
    const q = search.toLowerCase();
    return rawAppts.filter(
      (a) =>
        a.patient?.toLowerCase().includes(q) ||
        a.doctor?.toLowerCase().includes(q) ||
        a.status?.toLowerCase().includes(q) ||
        a.time?.toLowerCase().includes(q),
    );
  }, [rawAppts, search]);

  const selLabel = selected.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const statusSummary = Object.entries(STATUS).map(([label]) => ({
    label,
    count: rawAppts.filter((a) => a.status === label).length,
  }));

  return (
    <div className="min-h-screen bg-slate-50 p-3 sm:p-6 lg:p-8">
      {/* ── Page Header ── */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6"
      >
        <div>
          <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
            Schedule
          </p>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            Appointment Calendar
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setViewDate(new Date(today.getFullYear(), today.getMonth(), 1));
              setSelected(today);
            }}
            className="px-4 py-2 text-sm font-semibold bg-blue-500 text-white rounded-xl hover:bg-blue-600 active:scale-95 transition-all duration-150 shadow-sm shadow-blue-200"
          >
            Today
          </button>
          <input
            type="date"
            defaultValue={today.toISOString().split("T")[0]}
            onChange={(e) => {
              const d = new Date(e.target.value);
              if (!isNaN(d)) {
                setSelected(d);
                setViewDate(new Date(d.getFullYear(), d.getMonth(), 1));
              }
            }}
            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-gray-600"
          />
        </div>
      </motion.div>

      {/* ── Layout ── */}
      <div className="flex flex-col xl:flex-row gap-5">
        {/* ════ LEFT: CALENDAR ════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="xl:w-[380px] flex-shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
        >
          {/* Month nav */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-50">
            <button
              onClick={() => setViewDate(new Date(vy, vm - 1, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-bold text-gray-800 text-sm tracking-tight">
              {MONTHS[vm]} {vy}
            </span>
            <button
              onClick={() => setViewDate(new Date(vy, vm + 1, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 px-4 pt-4 pb-1">
            {DAYS.map((d, i) => (
              <div
                key={i}
                className="text-center text-[11px] font-bold text-gray-400 py-1"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Date cells */}
          <div className="grid grid-cols-7 px-4 pb-4 gap-y-1">
            {cells.map((cell, i) => {
              const key = cell.cur ? makeKey(vy, vm, cell.day) : null;
              const hasAppts = key ? (data[key] ?? []).length > 0 : false;
              const isToday = key === todayKey;
              const isSel = key === selKey;

              return (
                <button
                  key={i}
                  disabled={!cell.cur}
                  onClick={() =>
                    cell.cur && setSelected(new Date(vy, vm, cell.day))
                  }
                  className={`
                    relative flex flex-col items-center justify-center rounded-xl h-10 text-sm font-semibold transition-all duration-150
                    ${!cell.cur ? "opacity-20 cursor-default" : "cursor-pointer"}
                    ${
                      isSel
                        ? "bg-blue-500 text-white shadow-md shadow-blue-200"
                        : isToday
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  {cell.day}
                  {hasAppts && !isSel && (
                    <span className="absolute bottom-1 w-1 h-1 rounded-full bg-blue-400" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Status legend */}
          <div className="border-t border-gray-50 px-5 py-3 grid grid-cols-2 gap-2">
            {Object.entries(STATUS).map(([label, cfg]) => (
              <div key={label} className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`}
                />
                <span className="text-xs text-gray-500">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ════ RIGHT: APPOINTMENTS ════ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col min-h-[500px]"
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-4 border-b border-gray-50">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <CalendarDays size={16} className="text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium leading-none mb-0.5">
                    Selected date
                  </p>
                  <h2 className="text-sm font-bold text-gray-800 leading-tight">
                    {selLabel}
                  </h2>
                </div>
              </div>

              <span
                className={`self-start sm:self-auto text-xs font-bold px-3 py-1.5 rounded-full ring-1
                  ${
                    rawAppts.length > 0
                      ? "bg-blue-50 text-blue-600 ring-blue-200"
                      : "bg-gray-100 text-gray-400 ring-gray-200"
                  }`}
              >
                {rawAppts.length}{" "}
                {rawAppts.length === 1 ? "appointment" : "appointments"}
              </span>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by patient, doctor or status..."
                className="w-full pl-9 pr-8 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition placeholder:text-gray-400"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Appointment list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            <AnimatePresence mode="wait">
              {appts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center mb-3">
                    <CalendarDays size={24} className="text-gray-300" />
                  </div>
                  <p className="text-sm font-semibold text-gray-400">
                    {search ? "No results found" : "No appointments"}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">
                    {search
                      ? "Try a different search term"
                      : "Select a highlighted date to view appointments"}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key={selKey + search}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-2.5"
                >
                  {appts.map((a, i) => {
                    const sc = STATUS[a.status] ?? STATUS.Pending;
                    return (
                      <motion.div
                        key={a.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.05 }}
                        className="flex items-center gap-3 sm:gap-4 p-3.5 rounded-xl bg-gray-50 border border-gray-100 hover:border-gray-200 hover:bg-white hover:shadow-sm transition-all duration-200 group"
                      >
                        {/* Time */}
                        <div className="flex-shrink-0 text-center w-14">
                          <div className="flex items-center justify-center text-gray-300 mb-0.5">
                            <Clock size={10} />
                          </div>
                          <p className="text-xs font-bold text-gray-700 leading-none">
                            {a.time?.split(" ")[0] ?? "—"}
                          </p>
                          <p className="text-[10px] text-gray-400 mt-0.5">
                            {a.time?.split(" ")[1] ?? ""}
                          </p>
                        </div>

                        {/* Status bar */}
                        <div
                          className={`w-0.5 h-10 rounded-full flex-shrink-0 ${sc.color}`}
                        />

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            <User
                              size={11}
                              className="text-gray-400 flex-shrink-0"
                            />
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {a.patient ?? "—"}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Stethoscope
                              size={11}
                              className="text-gray-400 flex-shrink-0"
                            />
                            <p className="text-xs text-gray-500 truncate">
                              {a.doctor ?? "—"}
                            </p>
                          </div>
                        </div>

                        {/* Badge */}
                        <span
                          className={`flex-shrink-0 text-[11px] font-semibold px-2.5 py-1 rounded-lg ring-1 ${sc.light} ${sc.ring}`}
                        >
                          {a.status}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary footer */}
          {rawAppts.length > 0 && (
            <div className="border-t border-gray-100 px-4 py-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {statusSummary.map(({ label, count }) => {
                const cfg = STATUS[label];
                return (
                  <div
                    key={label}
                    className={`
            rounded-xl py-3 px-3 text-center border transition-all duration-200
            ${
              count > 0
                ? `${cfg.footerBg} ${cfg.footerBorder}`
                : "bg-gray-50 border-gray-100"
            }
          `}
                  >
                    {/* Colored dot + label row */}
                    <div className="flex items-center justify-center gap-1.5 mb-1.5">
                      <span
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${count > 0 ? cfg.dot : "bg-gray-300"}`}
                      />
                      <p
                        className={`text-[10px] font-semibold uppercase tracking-wide ${count > 0 ? cfg.footerText : "text-gray-400"}`}
                      >
                        {label}
                      </p>
                    </div>

                    {/* Count */}
                    <p
                      className={`text-xl font-bold leading-none ${count > 0 ? cfg.footerCount : "text-gray-300"}`}
                    >
                      {count}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
