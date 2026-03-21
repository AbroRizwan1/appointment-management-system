import { useContext } from "react";
import { AppContext } from "../../Context/SidebarContext";
import { MenuIcon, BellIcon } from "../../Constant/Icons";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const Header = ({ setIsLogin }) => {
  const navigate = useNavigate();
  const { setOpen, active, activeLabel } = useContext(AppContext);
  return (
    <div>
      {/* Top bar */}
      <header className="flex items-center justify-between  px-5 py-3.5 bg-white border-b border-slate-200 sticky top-0 z-30">
        <button
          onClick={() => setOpen(true)}
          className="lg:hidden w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
        >
          <MenuIcon />
        </button>
        <h1 className="text-[17px] font-bold text-slate-800 lg:ml-0 ml-3">
          {activeLabel}
        </h1>
        <div className="flex items-center gap-2">
          <button className="relative w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
            <BellIcon />
            <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-red-500" />
          </button>
          <button
            onClick={() => {
              setIsLogin(false);
              navigate("/login");
            }}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-red-50 hover:bg-red-500 text-red-500 hover:text-white border border-red-100 hover:border-red-500 rounded-xl transition-all duration-200 active:scale-95 w-full md:w-auto group"
          >
            <LogOut
              size={15}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
            <span>Logout</span>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
