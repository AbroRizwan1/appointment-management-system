import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const StateCardDash = ({ card }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const target = card.value;
  const duration = 2000;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 500; // fast
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          delay: card.delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.10)" }}
        className={`relative bg-gradient-to-br ${card.gradient} border ${card.border} rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm cursor-pointer overflow-hidden transition-shadow duration-300`}
        style={{ willChange: "transform" }}
      >
        {/* Decorative blob */}
        <div
          className={`absolute -right-5 -bottom-5 w-20 h-20 sm:w-24 sm:h-24 rounded-full opacity-20 blur-2xl ${card.accent}`}
        />

        {/* Icon */}
        <div
          className={`inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-xl ${card.iconBg} ${card.iconColor} mb-3 sm:mb-5 shadow-sm`}
        >
          {card.icon}
        </div>

        {/* Number */}
        <div
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${card.numberColor} mb-1 leading-none`}
        >
          <span ref={ref}>{count.toLocaleString()}</span>
        </div>

        {/* Label */}
        <p className="text-xs sm:text-sm font-medium text-slate-500 mt-1 sm:mt-1.5 leading-tight">
          {card.label}
        </p>

        {/* Accent bar */}
        <div
          className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${card.accent} opacity-60`}
        />
      </motion.div>
    </div>
  );
};

export default StateCardDash;
