const HeadingText = ({
  heading,
  text,
  align = "center",
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col gap-3 sm:gap-4 md:gap-6
      px-4 sm:px-6 md:px-0
      ${
        align === "center"
          ? "items-center text-center"
          : "items-start text-left"
      }
      ${className}`}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-gray-800 leading-tight">
        {heading}
      </h2>

      <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 max-w-xs sm:max-w-md md:max-w-2xl leading-relaxed">
        {text}
      </p>
    </div>
  );
};

export default HeadingText;