import { useEffect, useRef, useState, useMemo } from "react";
import { Chart, registerables } from "chart.js";
import { getFilteredAppointments } from "../../Utiles/Dashboard/PieUtiles";

Chart.register(...registerables);

const fadeInStyle = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.8); }
    to   { opacity: 1; transform: scale(1); }
  }
`;

const FILTERS = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "yearly", label: "Yearly" },
];

const buildStatuses = ({ completed, pending, cancelled }) => [
  {
    label: "Completed",
    value: completed,
    color: "#22c55e",
    bg: "#f0fdf4",
    text: "#15803d",
  },
  {
    label: "Pending",
    value: pending,
    color: "#facc15",
    bg: "#fefce8",
    text: "#a16207",
  },
  {
    label: "Cancelled",
    value: cancelled,
    color: "#ef4444",
    bg: "#fef2f2",
    text: "#b91c1c",
  },
];

export default function PieChart() {
  const appointments = useMemo(() => {
    return JSON.parse(localStorage.getItem("appointmentData")) || [];
  }, []);
  const filtered = getFilteredAppointments(appointments);

  const DATA = {
    weekly: {
      completed: filtered.weeklyStatus.completed,
      pending: filtered.weeklyStatus.pending,
      cancelled: filtered.weeklyStatus.cancelled,
    },
    monthly: {
      completed: filtered.monthlyStatus.completed,
      pending: filtered.monthlyStatus.pending,
      cancelled: filtered.monthlyStatus.cancelled,
    },
    quarterly: {
      completed: filtered.quarterlyStatus.completed,
      pending: filtered.quarterlyStatus.pending,
      cancelled: filtered.quarterlyStatus.cancelled,
    },
    yearly: {
      completed: filtered.yearlyStatus.completed,
      pending: filtered.yearlyStatus.pending,
      cancelled: filtered.yearlyStatus.cancelled,
    },
  };

  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState("weekly");

  const statuses = buildStatuses(DATA[filter]);

  const total = statuses.reduce((s, x) => s + x.value, 0);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!visible || !canvasRef.current) return;

    chartRef.current?.destroy();

    const ctx = canvasRef.current.getContext("2d");

    chartRef.current = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: statuses.map((s) => s.label),
        datasets: [
          {
            data: statuses.map((s) => s.value),
            backgroundColor: statuses.map((s) => s.color),
            hoverBackgroundColor: statuses.map((s) => s.color),
            borderColor: "#ffffff",
            borderWidth: 3,
            hoverOffset: 10,
            hoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        animation: {
          animateRotate: true,
          animateScale: false,
          duration: 1800,
          easing: "easeInOutCubic",
        },
        transitions: {
          active: { animation: { duration: 300 } },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#1a1a1a",
            bodyColor: "#555",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            padding: 12,
            cornerRadius: 10,
            titleFont: { size: 13, weight: "600" },
            bodyFont: { size: 13 },
            callbacks: {
              label: (ctx) => {
                const pct = ((ctx.parsed / total) * 100).toFixed(1);
                return `  ${ctx.parsed} appointments (${pct}%)`;
              },
            },
          },
        },
        onHover: (_, elements) => {
          setHovered(elements.length > 0 ? elements[0].index : null);
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [visible, filter]);

  const anim = (delay) => ({
    opacity: visible ? 1 : 0,
    animation: visible ? `fadeSlideUp 0.6s ease forwards ${delay}ms` : "none",
  });

  const activeStatus = hovered !== null ? statuses[hovered] : null;

  return (
    <>
      <style>{fadeInStyle}</style>
      <div className="w-full max-w-sm sm:max-w-md mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-4" style={anim(0)}>
          <p className="text-xs text-gray-400 mb-1">Appointment breakdown</p>
          <p className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-tight">
            {total}{" "}
            <span className="text-sm font-normal text-gray-400">total</span>
          </p>
        </div>

        {/* Filter Tabs */}
        <div
          className="grid grid-cols-4 gap-1 mb-5 bg-gray-100 rounded-xl p-1"
          style={anim(50)}
        >
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => {
                setFilter(key);
                setHovered(null);
              }}
              className={`
        w-full py-1.5 px-1 rounded-lg font-medium
        transition-all duration-200 leading-tight
        text-[10px] min-[400px]:text-[11px] sm:text-xs
        ${
          filter === key
            ? "bg-white text-gray-800 shadow-sm"
            : "text-gray-400 hover:text-gray-600 active:bg-white/50"
        }
      `}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Donut Chart */}
        <div className="relative w-full h-52 sm:h-64" style={anim(100)}>
          <canvas ref={canvasRef} />

          {/* Center label */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none transition-all duration-300">
            {activeStatus ? (
              <>
                <p
                  className="text-xl sm:text-2xl font-semibold leading-tight"
                  style={{ color: activeStatus.color }}
                >
                  {activeStatus.value}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {activeStatus.label}
                </p>
              </>
            ) : (
              <>
                <p className="text-xl sm:text-2xl font-semibold text-gray-900 leading-tight">
                  {total}
                </p>
                <p className="text-xs text-gray-400 mt-1">Total</p>
              </>
            )}
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-5" style={anim(200)}>
          {statuses.map((s, i) => (
            <div
              key={s.label}
              className="rounded-xl p-2.5 sm:p-3 transition-all duration-200 cursor-default"
              style={{
                background: s.bg,
                border: `1.5px solid ${hovered === i ? s.color : "transparent"}`,
                transform: hovered === i ? "translateY(-2px)" : "translateY(0)",
              }}
            >
              <div className="flex items-center gap-1.5 mb-1.5">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: s.color }}
                />
                <span
                  className="text-[10px] sm:text-xs font-medium truncate"
                  style={{ color: s.text }}
                >
                  {s.label}
                </span>
              </div>
              <p
                className="text-lg sm:text-xl font-semibold leading-none"
                style={{ color: s.text }}
              >
                {s.value}
              </p>
              <p
                className="text-[10px] sm:text-xs mt-1 opacity-70"
                style={{ color: s.text }}
              >
                {((s.value / total) * 100).toFixed(1)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
