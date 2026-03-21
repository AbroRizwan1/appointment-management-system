import { motion, useSpring, useInView } from "framer-motion";
import { Trash2, CornerUpLeft } from "lucide-react";
import { useContext, useState,useMemo } from "react";
import { AppContext } from "../../Context/SidebarContext";
import Table, { StatusBadge } from "../../Components/Table";

const QueryDesh = () => {

  const message = useMemo(() => {
    return JSON.parse(localStorage.getItem("QUERY")) || [];
  }, []);

  const { active, activeLabel } = useContext(AppContext);

  const [allQueries, setAllQueries] = useState(() => {
    const savedData = localStorage.getItem("QUERY");
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleDelete = (id) => {
    const updatedQueries = allQueries.filter((q) => q.id !== Number(id));
    setAllQueries(updatedQueries);
    localStorage.setItem("QUERY", JSON.stringify(updatedQueries));
  };

  const handleReply = (id) => {
    const query = allQueries.find((item) => item.id === id);

    if (!query) return;

    let phoneNumber = query.phone.replace(/\D/g, "");

    if (!phoneNumber.startsWith("92")) {
      phoneNumber = "92" + phoneNumber.substring(1);
    }

    const name =
      query.name.charAt(0).toUpperCase() + query.name.slice(1).toLowerCase();

    const message = `Hello ${name}, we received your query. Our team will contact you soon. Thank you.`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };
  const columns = [
    { key: "name", label: "name" },
    { key: "email", label: "email" },
    { key: "subject", label: "subject" },
    { key: "phone", label: "phone" },
    { key: "message", label: "message" },

    {
      key: "Action",
      label: "Action",
      render: (_, row, index) => (
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => handleReply(row.id)}
            title="Edit"
            className="group flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-800 text-gray-500 hover:text-white transition-all duration-200"
          >
            <CornerUpLeft
              size={14}
              className="transition-transform duration-200 group-hover:scale-110"
            />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              handleDelete(row.id);
            }}
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
    <div className="p-5">
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
          title="Messages"
          subtitle=""
          columns={columns}
          data={message}
          pageSize={4}
          onRowClick={(row) => console.log(row)}
        />
      </motion.div>
    </div>
  );
};

export default QueryDesh;
