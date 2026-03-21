import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Status Badge ────────────────────────────────────────────────────────────
const badgeStyles = {
  completed: "bg-emerald-50 text-emerald-600 ring-1 ring-emerald-200",
  confirmed: "bg-blue-50   text-blue-600   ring-1 ring-blue-200",
  cancelled: "bg-red-50    text-red-500    ring-1 ring-red-200",
  pending: "bg-amber-50  text-amber-600  ring-1 ring-amber-200",
  scheduled: "bg-violet-50 text-violet-600 ring-1 ring-violet-200",
};

export function StatusBadge({ value }) {
  const key = value?.toLowerCase();
  const style =
    badgeStyles[key] ?? "bg-gray-100 text-gray-500 ring-1 ring-gray-200";

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current opacity-70" />
      {value}
    </span>
  );
}

// ─── Sort Icon ────────────────────────────────────────────────────────────────
function SortIcon({ direction }) {
  return (
    <span className="ml-1.5 inline-flex flex-col gap-[2px]">
      <span
        className={`block w-0 h-0 border-l-[4px] border-r-[4px] border-b-[5px] border-l-transparent border-r-transparent transition-colors ${direction === "asc" ? "border-b-blue-500" : "border-b-gray-300"}`}
      />
      <span
        className={`block w-0 h-0 border-l-[4px] border-r-[4px] border-t-[5px] border-l-transparent border-r-transparent transition-colors ${direction === "desc" ? "border-t-blue-500" : "border-t-gray-300"}`}
      />
    </span>
  );
}

// ─── Main Table ───────────────────────────────────────────────────────────────
/**
 * Reusable Table Component
 *
 * @param {Object[]} columns    - [{ key, label, sortable?, render?, width? }]
 * @param {Object[]} data       - Array of row objects
 * @param {string}   title      - Optional table title
 * @param {string}   subtitle   - Optional subtitle
 * @param {boolean}  searchable - Show search bar (default: true)
 * @param {number}   pageSize   - Rows per page (default: 5)
 * @param {boolean}  striped    - Zebra stripes (default: true)
 * @param {Function} onRowClick - Optional row click handler
 */
function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d)) return value;
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
  });
}

export default function Table({
  columns = [],
  data = [],
  title,
  subtitle,
  searchable = true,
  pageSize = 5,
  striped = true,
  onRowClick,
  actionButton,
  onAddNew, // 👈 function — shows button when passed
  addNewLabel, // 👈 optional label, defaults to "Add New"
  addNewIcon, //button Icon
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    if (!query.trim()) return data;
    const q = query.toLowerCase();
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [data, query, columns]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const cmp = String(a[sortKey] ?? "").localeCompare(
        String(b[sortKey] ?? ""),
        undefined,
        { numeric: true },
      );
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
    .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
    .reduce((acc, p, idx, arr) => {
      if (idx > 0 && p - arr[idx - 1] > 1) acc.push("...");
      acc.push(p);
      return acc;
    }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      {/* ── Header ── */}
      {(title || searchable) && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-gray-100">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-gray-800 leading-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
            )}
          </div>
          {searchable && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto">
              <div className="relative w-full sm:w-56">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                  />
                </svg>
                <input
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search..."
                  className="pl-9 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition"
                />
              </div>
              {onAddNew && (
                <button
                  onClick={onAddNew}
                  className="flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 active:scale-95 text-white rounded-lg transition-all duration-200 whitespace-nowrap w-full sm:w-auto"
                >
                  {addNewIcon && <span className="w-4 h-4">{addNewIcon}</span>}
                  {addNewLabel ?? "Add New"}
                </button>
              )}

              {actionButton && (
                <div className="w-full sm:w-auto">{actionButton}</div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  style={col.width ? { width: col.width } : {}}
                  className={`px-3 sm:px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap select-none
                    ${col.sortable !== false ? "cursor-pointer hover:text-gray-700 transition-colors" : ""}`}
                >
                  <span className="inline-flex items-center">
                    {col.label}
                    {col.sortable !== false && (
                      <SortIcon
                        direction={sortKey === col.key ? sortDir : null}
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            <AnimatePresence mode="popLayout">
              {paginated.length === 0 ? (
                <motion.tr
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  <td
                    colSpan={columns.length}
                    className="px-5 py-12 text-center text-gray-400 text-sm"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg
                        className="w-8 h-8 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
                        />
                      </svg>
                      No results found
                    </div>
                  </td>
                </motion.tr>
              ) : (
                paginated.map((row, i) => (
                  <motion.tr
                    key={row?.id ?? i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{
                      duration: 0.2,
                      delay: i * 0.04,
                      ease: "easeOut",
                    }}
                    onClick={() => onRowClick?.(row)}
                    className={`
                    group transition-colors duration-150
                    ${striped && i % 2 !== 0 ? "bg-gray-50/60" : "bg-white"}
                    ${onRowClick ? "cursor-pointer hover:bg-blue-50/50" : "hover:bg-gray-50/80"}
                  `}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 sm:px-5 py-3 sm:py-3.5 text-gray-700 whitespace-nowrap"
                      >
                        {col.render ? (
                          col.render(row[col.key], row)
                        ) : (
                          <span className="text-sm">
                            {col.key === "date"
                              ? formatDate(row[col.key])
                              : (row[col.key] ?? "—")}
                          </span>
                        )}
                      </td>
                    ))}
                  </motion.tr>
                ))
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* ── Footer / Pagination ── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-5 py-3.5 border-t border-gray-100 bg-gray-50/50">
        <p className="text-xs text-gray-400 text-center sm:text-left">
          Showing{" "}
          <span className="font-medium text-gray-600">
            {Math.min((page - 1) * pageSize + 1, sorted.length)}–
            {Math.min(page * pageSize, sorted.length)}
          </span>{" "}
          of <span className="font-medium text-gray-600">{sorted.length}</span>{" "}
          results
        </p>
        <div className="flex items-center gap-1 flex-wrap justify-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            ← Prev
          </button>
          {pageNumbers.map((p, idx) =>
            p === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 text-gray-400 text-xs"
              >
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-xs rounded-lg border transition font-medium
                  ${
                    page === p
                      ? "bg-blue-500 border-blue-500 text-white shadow-sm"
                      : "border-gray-200 text-gray-500 hover:bg-white hover:border-gray-300"
                  }`}
              >
                {p}
              </button>
            ),
          )}
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-500 hover:bg-white hover:border-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Usage Example ────────────────────────────────────────────────────────────
const SAMPLE_COLUMNS = [
  { key: "id", label: "#", width: "60px" },
  { key: "name", label: "Patient" },
  { key: "doctor", label: "Doctor" },
  { key: "date", label: "Date" },
  {
    key: "status",
    label: "Status",
    render: (val) => <StatusBadge value={val} />,
  },
];

const SAMPLE_DATA = [
  {
    id: 1,
    name: "Sarah Johnson",
    doctor: "Dr. Ahmed",
    date: "2026-03-01",
    status: "Completed",
  },
  {
    id: 2,
    name: "James Lee",
    doctor: "Dr. Patel",
    date: "2026-03-03",
    status: "Pending",
  },
  {
    id: 3,
    name: "Maria Garcia",
    doctor: "Dr. Chen",
    date: "2026-03-05",
    status: "Cancelled",
  },
  {
    id: 4,
    name: "David Kim",
    doctor: "Dr. Ahmed",
    date: "2026-03-07",
    status: "Completed",
  },
  {
    id: 5,
    name: "Emily Clark",
    doctor: "Dr. Patel",
    date: "2026-03-09",
    status: "confirm",
  },
  {
    id: 6,
    name: "Robert Brown",
    doctor: "Dr. Chen",
    date: "2026-03-11",
    status: "Pending",
  },
  {
    id: 7,
    name: "Linda Martinez",
    doctor: "Dr. Ahmed",
    date: "2026-03-12",
    status: "Completed",
  },
  {
    id: 8,
    name: "Michael Scott",
    doctor: "Dr. Patel",
    date: "2026-03-13",
    status: "Inactive",
  },
];

export function TableDemo() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Table
        title="Appointments"
        subtitle="All patient appointments"
        columns={SAMPLE_COLUMNS}
        data={SAMPLE_DATA}
        pageSize={5}
        onRowClick={(row) => console.log("Clicked:", row)}
      />
    </div>
  );
}
