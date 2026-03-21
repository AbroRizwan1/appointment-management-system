import { useEffect, useState } from "react";

const StatsCard = () => {
  const cards = [
    { number: 50, label: "Expert Doctors" },
    { number: 1000, label: "Happy Patients" },
    { number: 200, label: "Medical Staff" },
    { number: 24, label: "24/7 Emergency" },
  ];

  const [counts, setCounts] = useState(cards.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const intervalTime = 16;

    const timers = cards.map((card, index) => {
      let start = 0;
      const increment = card.number / (duration / intervalTime);

      return setInterval(() => {
        start += increment;

        setCounts((prev) => {
          const updated = [...prev];
          if (start >= card.number) {
            updated[index] = card.number;
            clearInterval(timers[index]);
          } else {
            updated[index] = Math.floor(start);
          }
          return updated;
        });
      }, intervalTime);
    });

    return () => timers.forEach((timer) => clearInterval(timer));
  }, []);

  return (
    <div className="bg-white/100  -translate-y-0 rounded-3xl  shadow-lg grid grid-cols-2 md:grid-cols-4 text-center gap-6 md:gap-8 px-6 py-12 mx-4 sm:mx-8 md:mx-20 lg:mx-40 -mt-10 md:-mt-20">
      {cards.map((card, index) => (
        <div key={index} className="space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            {counts[index]}
            {card.label === "24/7 Emergency" ? "/7" : "+"}
          </h2>

          <p className="text-sm sm:text-base text-gray-600 font-medium">
            {card.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
