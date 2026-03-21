import { useEffect, useRef, useState, useMemo } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const fadeInStyle = `
  @keyframes fadeSlideUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes tabPop {
    0%   { transform: scale(1); }
    40%  { transform: scale(0.93); }
    70%  { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
`;

const FILTERS = [
  { key: "weekly", label: "Weekly" },
  { key: "monthly", label: "Monthly" },
  { key: "quarterly", label: "Quarterly" },
  { key: "yearly", label: "Yearly" },
];

function buildChartData(appointments, filter) {
  switch (filter) {
    case "weekly": {
      const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const counts = new Array(7).fill(0);
      const now = new Date();
      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
      appointments.forEach((app) => {
        const d = new Date(app.date);
        const diff = Math.floor((d - startOfWeek) / 86400000);
        if (diff >= 0 && diff < 7) counts[diff]++;
      });
      return { labels, data: counts };
    }

    case "monthly": {
      const labels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      const counts = new Array(12).fill(0);
      appointments.forEach((app) => {
        const m = new Date(app.date).getMonth();
        counts[m]++;
      });
      return { labels, data: counts };
    }

    case "quarterly": {
      const labels = [
        "Q1 (Jan–Mar)",
        "Q2 (Apr–Jun)",
        "Q3 (Jul–Sep)",
        "Q4 (Oct–Dec)",
      ];
      const counts = [0, 0, 0, 0];
      appointments.forEach((app) => {
        const m = new Date(app.date).getMonth();
        counts[Math.floor(m / 3)]++;
      });
      return { labels, data: counts };
    }

    case "yearly": {
      const yearMap = {};
      appointments.forEach((app) => {
        const y = new Date(app.date).getFullYear().toString();
        yearMap[y] = (yearMap[y] || 0) + 1;
      });
      const labels = Object.keys(yearMap).sort();
      const data = labels.map((y) => yearMap[y]);
      return { labels, data };
    }

    default:
      return { labels: [], data: [] };
  }
}

export default function LineChart() {
  const appointments = useMemo(() => {
    return JSON.parse(localStorage.getItem("appointmentData")) || [];
  }, []);

  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("monthly");

  const { labels, data } = buildChartData(appointments, filter);
  const total = data.reduce((a, b) => a + b, 0);
  const avg = data.length ? (total / data.length).toFixed(1) : "0";
  const min = data.length ? Math.min(...data) : 0;
  const max = data.length ? Math.max(...data) : 0;

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!visible || !canvasRef.current) return;

    chartRef.current?.destroy();

    const ctx = canvasRef.current.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, "rgba(55, 138, 221, 0.18)");
    gradient.addColorStop(1, "rgba(55, 138, 221, 0)");

    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Appointments",
            data,
            borderColor: "#378add",
            backgroundColor: gradient,
            borderWidth: 2.5,
            pointBackgroundColor: "#378add",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: "#378add",
            pointHoverBorderColor: "#fff",
            pointHoverBorderWidth: 2.5,
            tension: 0.45,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1600,
          easing: "easeInOutQuart",
          x: { duration: 0 },
          y: {
            from: (ctx) => ctx.chart.scales.y.getPixelForValue(0),
            duration: 1600,
            easing: "easeInOutQuart",
          },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: "#fff",
            titleColor: "#1a1a1a",
            bodyColor: "#378add",
            borderColor: "#e0e8f4",
            borderWidth: 1,
            padding: 10,
            cornerRadius: 8,
            titleFont: { size: 12, weight: "500" },
            bodyFont: { size: 14, weight: "500" },
            callbacks: {
              label: (ctx) => `  ${ctx.parsed.y} appointments`,
            },
          },
        },
        scales: {
          x: {
            grid: { display: false },
            border: { display: false },
            ticks: {
              color: "#888780",
              font: { size: 12 },
              autoSkip: false,
              maxRotation: filter === "quarterly" ? 10 : 0,
            },
          },
          y: {
            grid: { color: "rgba(136,135,128,0.12)" },
            border: { display: false },
            ticks: {
              color: "#888780",
              font: { size: 12 },
              stepSize: 1,
              padding: 8,
            },
            min: 0,
            suggestedMax: max + Math.ceil(max * 0.2) || 10,
          },
        },
        interaction: {
          mode: "index",
          intersect: false,
        },
      },
    });

    return () => chartRef.current?.destroy();
  }, [visible, filter]);

  const anim = (delay) => ({
    opacity: visible ? 1 : 0,
    animation: visible ? `fadeSlideUp 0.6s ease forwards ${delay}ms` : "none",
  });

  return (
    <>
      <style>{fadeInStyle}</style>
      <div style={{ padding: "1.5rem", fontFamily: "sans-serif" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "1rem",
            ...anim(0),
          }}
        >
          <div>
            <p style={{ fontSize: 13, color: "#888780", margin: "0 0 4px" }}>
              Total appointments
            </p>
            <p
              style={{
                fontSize: 28,
                fontWeight: 500,
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {total}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#e6f1fb",
              borderRadius: 20,
              padding: "5px 12px",
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#378add",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 12, color: "#185fa5", fontWeight: 500 }}>
              Appointments
            </span>
          </div>
        </div>

        {/* Filter Tabs */}
        <div
          style={{
            display: "flex",
            gap: 4,
            background: "#f3f4f6",
            borderRadius: 12,
            padding: 4,
            marginBottom: "1.25rem",
            ...anim(60),
          }}
        >
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                flex: 1,
                padding: "6px 0",
                fontSize: 12,
                fontWeight: 500,
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                animation:
                  filter === key ? "tabPop 0.35s ease forwards" : undefined,
                background: filter === key ? "#fff" : "transparent",
                color: filter === key ? "#1a1a1a" : "#888780",
                boxShadow:
                  filter === key ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: 280,
            ...anim(100),
          }}
        >
          <canvas ref={canvasRef} />
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 24,
            marginTop: "1rem",
            fontSize: 12,
            color: "#888780",
            ...anim(200),
          }}
        >
          <span>
            Min: <strong style={{ color: "#1a1a1a" }}>{min}</strong>
          </span>
          <span>
            Avg: <strong style={{ color: "#1a1a1a" }}>{avg}</strong>
          </span>
          <span>
            Max: <strong style={{ color: "#1a1a1a" }}>{max}</strong>
          </span>
        </div>
      </div>
    </>
  );
}
