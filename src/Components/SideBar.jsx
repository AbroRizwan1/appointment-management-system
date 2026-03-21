import { useContext, useEffect, useState } from "react";
import { AppContext } from "../Context/SidebarContext";
import { getUnseenCount, markSeenUtil } from "../Utiles/Dashboard/Notification";

import {
  DashIcon,
  CalIcon,
  MsgIcon,
  ClkIcon,
  CogIcon,
  BrandIcon,
  XIcon,
} from "../Constant/Icons";

// ─── Sidebar Component ───────────────────────────────────────
export default function SideBar() {
  const { open, setOpen, active, onSelect, onClose, counts } =
    useContext(AppContext);

  let admin = JSON.parse(localStorage.getItem("admin"));

  const NAV = [
    {
      section: "Menu",
      links: [
        {
          id: "dashboard",
          label: "Dashboard",
          path: "/dashboard",
          badge: null,
          icon: DashIcon,
        },
        {
          id: "appointments",
          label: "Appointments",
          path: "/dashboard/appointments",
          badge: counts.appointments > 0 ? `${counts.appointments}` : null,
          icon: CalIcon,
        },
        {
          id: "messages",
          label: "Messages",
          path: "/dashboard/messages",
          badge: counts.messages > 0 ? `${counts.messages}` : null,
          icon: MsgIcon,
        },
        {
          id: "calendar",
          label: "Calendar",
          path: "/dashboard/calendar",
          badge: null,
          icon: ClkIcon,
        },
      ],
    },
    {
      section: "Settings",
      links: [
        {
          id: "settings",
          label: "Settings",
          path: "/dashboard/setting",
          badge: null,
          icon: CogIcon,
        },
      ],
    },
  ];

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0   z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Drawer */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 flex flex-col
          bg-[#0b1120] border-r border-white/[0.06]
          shadow-[6px_0_40px_rgba(0,0,0,0.4)]
          transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:shadow-none
        `}
      >
        {/* ── Logo ─────────────────────────────────── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_0_16px_rgba(99,102,241,0.5)]">
              <BrandIcon />
            </div>
            <span className="text-white font-bold text-[15px] tracking-tight">
              SLOTIFY
            </span>
          </div>
          {/* Close — mobile only */}
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-lg
                       text-white/40 hover:text-white hover:bg-white/10 transition-all"
          >
            <XIcon />
          </button>
        </div>

        {/* ── User card ────────────────────────────── */}
        <div className="mx-3 mt-4 flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.07]">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">
              SA
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#0b1120]" />
          </div>
          <div className="min-w-0">
            <p className="text-white text-[13px] font-semibold truncate leading-tight">
              {admin.name}
            </p>
            <p className="text-white/35 text-[11px]">{admin.role}</p>
          </div>
          <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 shrink-0">
            Pro
          </span>
        </div>

        {/* ── Nav ──────────────────────────────────── */}
        <nav
          className="flex-1 overflow-y-auto px-3 pt-3 pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {NAV.map(({ section, links }) => (
            <div key={section} className="mb-2">
              <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white/20 select-none">
                {section}
              </p>

              {links.map(({ id, label, path, badge, icon: Icon }) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    onClick={() => onSelect(id, path)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 mb-0.5
                      rounded-xl text-[13.5px] font-medium
                      transition-all duration-150 relative group
                      ${
                        isActive
                          ? "bg-sky-500/[0.12] text-white"
                          : "text-white/45 hover:text-white/85 hover:bg-white/[0.05]"
                      }
                    `}
                  >
                    {/* Active bar */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                    )}

                    {/* Icon */}
                    <span
                      className={`shrink-0 transition-colors ${isActive ? "text-sky-400" : "text-white/25 group-hover:text-white/60"}`}
                    >
                      <Icon />
                    </span>

                    {/* Label */}
                    <span className="flex-1 text-left">{label}</span>

                    {/* Badge */}
                    {badge && (
                      <span
                        className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-sky-400 text-slate-900" : "bg-sky-500/20 text-sky-400"}`}
                      >
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
