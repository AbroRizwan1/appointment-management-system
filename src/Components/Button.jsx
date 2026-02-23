import React from "react";

const Button = ({
  text = "Button",
  type = "button",
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyle =
    "px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 " +
    "text-sm sm:text-base font-medium rounded-full " +
    "transition-all duration-300 ease-in-out " +
    "active:scale-95 focus:outline-none cursor-pointer";

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
      {text}
    </button>
  );
};

export default Button;
