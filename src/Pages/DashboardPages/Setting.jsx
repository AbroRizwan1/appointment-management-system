import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, ShieldCheck, KeyRound } from "lucide-react";

// ─── Password Input ───────────────────────────────────────────────────────────
function PasswordInput({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  error,
  placeholder,
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-xs font-semibold text-gray-600 uppercase tracking-wide"
      >
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-xl border bg-gray-50 transition-all duration-200
        ${error ? "border-red-300 bg-red-50/40" : "border-gray-200 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100"}`}
      >
        <span className="pl-3.5 text-gray-400 flex-shrink-0">
          <Icon size={16} />
        </span>
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 px-3 py-2.5 text-sm bg-transparent focus:outline-none text-gray-800 placeholder-gray-400"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="pr-3.5 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
        >
          {show ? <EyeOff size={15} /> : <Eye size={15} />}
        </button>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-500 flex items-center gap-1"
        >
          <span className="w-1 h-1 rounded-full bg-red-400 inline-block" />
          {error}
        </motion.p>
      )}
    </div>
  );
}

// ─── Strength Bar ─────────────────────────────────────────────────────────────
function StrengthBar({ password }) {
  if (!password) return null;

  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const levels = [
    { label: "Weak", color: "bg-red-400" },
    { label: "Fair", color: "bg-orange-400" },
    { label: "Good", color: "bg-yellow-400" },
    { label: "Strong", color: "bg-green-500" },
  ];
  const level = levels[score - 1] ?? levels[0];

  return (
    <div className="mt-1">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300
            ${i <= score ? level.color : "bg-gray-200"}`}
          />
        ))}
      </div>
      <p
        className={`text-xs font-medium ${
          score <= 1
            ? "text-red-400"
            : score === 2
              ? "text-orange-400"
              : score === 3
                ? "text-yellow-500"
                : "text-green-500"
        }`}
      >
        {level.label} password
      </p>
    </div>
  );
}

// ─── Main Form ────────────────────────────────────────────────────────────────
export default function Setting({ onSubmit, LoginUpdate }) {
  const admin = useMemo(() => {
    return JSON.parse(localStorage.getItem("admin")) || [];
  }, []);

  const [form, setForm] = useState({ current: "", newPass: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const set = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((er) => ({ ...er, [field]: "" }));
    setSuccess(false);
  };

  const validate = () => {
    const errs = {};
    if (form.current !== admin.password)
      errs.current = "Current password is Incorrect";
    if (!form.current) errs.current = "Current password is required";
    if (!form.newPass) errs.newPass = "New password is required";
    else if (form.newPass.length < 8)
      errs.newPass = "Must be at least 8 characters";
    else if (form.newPass === form.current)
      errs.newPass = "New password must differ from current";
    if (!form.confirm) errs.confirm = "Please confirm your new password";
    else if (form.confirm !== form.newPass)
      errs.confirm = "Passwords do not match";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update Password
    LoginUpdate(form);

    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000)); // simulate API
    setLoading(false);
    setSuccess(true);
    setForm({ current: "", newPass: "", confirm: "" });
    onSubmit?.(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full    m-6 max-w-lg  "
    >
      <div className="bg-white  rounded-2xl border border-gray-100 shadow-sm overflow-hidden ">
        {/* Header */}
        <div className="px-6 pt-6 pb-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={18} className="text-blue-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                Change Password
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Update your account password
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <PasswordInput
            id="current"
            label="Current Password"
            icon={Lock}
            value={form.current}
            onChange={set("current")}
            error={errors.current}
            placeholder="Enter current password"
          />

          <div>
            <PasswordInput
              id="newPass"
              label="New Password"
              icon={KeyRound}
              value={form.newPass}
              onChange={set("newPass")}
              error={errors.newPass}
              placeholder="Enter new password"
            />
            <StrengthBar password={form.newPass} />
          </div>

          <PasswordInput
            id="confirm"
            label="Confirm New Password"
            icon={ShieldCheck}
            value={form.confirm}
            onChange={set("confirm")}
            error={errors.confirm}
            placeholder="Re-enter new password"
          />

          {/* Success message */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
              <p className="text-xs font-medium text-green-700">
                Password updated successfully!
              </p>
            </motion.div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white text-sm font-semibold rounded-xl transition-all duration-200 active:scale-95 disabled:cursor-not-allowed mt-2"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
                Updating...
              </>
            ) : (
              <>
                <ShieldCheck size={15} />
                Update Password
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
}
