const HeadingText = ({
  heading,
  text,
  align = "center",
  eyebrow,
  className = "",
}) => {
  return (
    <div
      className={`
        flex flex-col gap-3
        ${align === "center" ? "items-center text-center" : "items-start text-left"}
        ${className}
      `}
    >
      {/* Optional eyebrow label */}
      {eyebrow && (
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-500 uppercase tracking-widest">
          <span className="w-4 h-px bg-blue-400" />
          {eyebrow}
          <span className="w-4 h-px bg-blue-400" />
        </span>
      )}

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight tracking-tight">
        {heading}
      </h2>

      {/* Underline accent */}
      <span
        className={`block h-1 w-12 rounded-full bg-blue-500
          ${align === "center" ? "mx-auto" : ""}`}
      />

      {/* Body text */}
      {text && (
        <p className="text-sm sm:text-base lg:text-lg text-gray-500 max-w-md lg:max-w-2xl leading-relaxed">
          {text}
        </p>
      )}
    </div>
  );
};

export default HeadingText;