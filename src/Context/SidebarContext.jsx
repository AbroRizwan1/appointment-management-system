import { createContext, useEffect, useState } from "react";
import { getUnseenCount, markSeenUtil } from "../Utiles/Dashboard/Notification";
import {
  DashIcon,
  CalIcon,
  UsersIcon,
  MsgIcon,
  ClkIcon,
  BarIcon,
  DocIcon,
  CogIcon,
  HelpIcon,
} from "../Constant/Icons";
import { useNavigate } from "react-router-dom";

const NAV = [
  {
    section: "Menu",
    links: [
      { id: "dashboard", label: "Dashboard", badge: null, icon: DashIcon },
      { id: "appointments", label: "Appointments", badge: "12", icon: CalIcon },
      { id: "patients", label: "Patients", badge: null, icon: UsersIcon },
      { id: "messages", label: "Messages", badge: "4", icon: MsgIcon },
      { id: "calendar", label: "Calendar", badge: null, icon: ClkIcon },
    ],
  },
  {
    section: "Reports",
    links: [
      { id: "analytics", label: "Analytics", badge: null, icon: BarIcon },
      { id: "reports", label: "Reports", badge: null, icon: DocIcon },
    ],
  },
  {
    section: "Settings",
    links: [
      { id: "settings", label: "Settings", badge: null, icon: CogIcon },
      { id: "help", label: "Help", badge: null, icon: HelpIcon },
    ],
  },
];

export const AppContext = createContext();

const SidebarContext = ({ children }) => {
  // //=================
  // Notification;
  // //================
  const [counts, setCount] = useState({
    appointments: 0,
    messages: 0,
    calendar: 0,
  });

  // loadCounts: localStorage se current counts
  const loadCounts = () => {
    setCount({
      appointments: getUnseenCount("appointmentData"),
      messages: getUnseenCount("messagesData"),
      calendar: getUnseenCount("calendarData"),
    });
  };

  // markAllAsSeen: module ke items ko seen mark karke counts update
  const markAllAsSeen = (module) => {
    if (module === "appointments") markSeenUtil("appointmentData");
    else if (module === "messages") markSeenUtil("messagesData");
    else if (module === "calendar") markSeenUtil("calendarData");

    loadCounts(); // update sidebar badge
  };

  // Page load pe count show
  useEffect(() => {
    loadCounts();
  }, []);

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("dashboard");

  const activeLabel =
    NAV.flatMap((g) => g.links).find((l) => l.id === active)?.label ??
    "Dashboard";

  const navigate = useNavigate();

  const onSelect = (id, path) => {
    setActive(id);
    setOpen(false); // mobile me sidebar close
    navigate(path);

    if (path.includes("appointments")) markAllAsSeen("appointments");
    else if (path.includes("messages")) markAllAsSeen("messages");
    else if (path.includes("calendar")) markAllAsSeen("calendar");
  };

  const onClose = () => {
    setOpen(false);
  };

  const value = {
    open,
    setOpen,
    active,
    setActive,
    activeLabel,
    onSelect,
    onClose,
    counts,
    loadCounts,
    markAllAsSeen,
  };

  return (
    <div>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </div>
  );
};

export default SidebarContext;
