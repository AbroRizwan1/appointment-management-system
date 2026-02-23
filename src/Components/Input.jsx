import React from "react";

const Input = ({
  label,
  type,
  placeholder,
  id,
  name,
  value,
  onChange,
  design = "default", // default | outlined | filled
  options = [], // for dropdown
}) => {
  // Tailwind classes for different designs
  const baseClass =
    "rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500";

  const designClasses = {
    default: "border border-gray-300 bg-white text-gray-700 ",
    outlined: "border-2 border-indigo-500 bg-white text-gray-800",
    filled: "bg-indigo-100 border border-transparent text-gray-800",
  };

  // If options are provided → render select dropdown
  if (options.length > 0) {
    return (
      <div className="flex flex-col">
        {label && (
          <label className="mb-2 text-gray-700 font-medium">{label}</label>
        )}
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          className={`${baseClass} ${designClasses[design]}`}
        >
          <option> {label}</option>
          {options.map((opt, idx) => (
            <option key={idx} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  //  options={[{ value: "Dr. Smith", label: "Dr. Smith" }]}

  function submitform(params) {}
  // Normal input
  return (
    <>
      <div className="flex flex-col ">
        {label && (
          <label className="mb-2 text-gray-700 font-medium">{label}</label>
        )}

        {type === "textarea" ? (
          <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClass} ${designClasses[design]}  `}
            rows={8} // default height, changeable
          />
        ) : (
          <input
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            type={type || "text"}
            placeholder={placeholder}
            className={`${baseClass} ${designClasses[design]}`}
          />
        )}
      </div>
    </>
  );
};

export default Input;
