import { useContext } from "react";
import { AppContext } from "../Context/SidebarContext";

import SideBar from "../Components/SideBar";
import Header from "../Pages/DashboardPages/Header";
import AppointmentDesh from "../Pages/DashboardPages/AppointmentDesh";
import Main from "../Pages/DashboardPages/DashMain";
import DashMain from "../Pages/DashboardPages/DashMain";
import { Outlet } from "react-router-dom";

// ─── App Shell ───────────────────────────────────────────────
export default function Dashboard({ setIsLogin }) {
  const { setOpen, active, activeLabel } = useContext(AppContext);

  return (
    <div>
      <div
        className="flex h-screen bg-slate-100 overflow-hidden"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');`}</style>
        <SideBar />

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0 overflow-auto">
          <Header setIsLogin={setIsLogin} />

          {/* Page content placeholder */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────
const icon =
  (d, opts = {}) =>
  () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={opts.w || 2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {typeof d === "string" ? <path d={d} /> : d}
    </svg>
  );
