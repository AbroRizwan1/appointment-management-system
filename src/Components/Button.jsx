import React from "react";

const Button = ({
  text = "Button",
  type = "button",
  onClick,
  variant = "primary",
  icon: Icon,
  iconPosition = "left",
  className = "",
}) => {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 " +
    "px-4 py-2 sm:px-5 sm:py-2.5 " +
    "text-sm sm:text-base font-medium rounded-xl " +
    "transition-all duration-300 ease-in-out " +
    "active:scale-95 focus:outline-none cursor-pointer whitespace-nowrap";

  const variants = {
    primary: "bg-gray-800 text-white hover:bg-gray-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    outline: "border border-blue-600 text-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {Icon && iconPosition === "left" && (
        <Icon size={16} className="flex-shrink-0" />
      )}
      <span>{text}</span>
      {Icon && iconPosition === "right" && (
        <Icon size={16} className="flex-shrink-0" />
      )}
    </button>
  );
};

export default Button;
