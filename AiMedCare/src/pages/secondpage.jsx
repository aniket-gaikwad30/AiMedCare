import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Secondpage = () => {
  const cardsRef = useRef([]);

  const features = [
    {
      title: "Instant Medical Insights",
      desc: "Get quick answers without waiting for appointments",
    },
    {
      title: "Clear Explanations",
      desc: "Understand complex medical terms in simple language",
    },
    {
      title: "Smart Health Tracking",
      desc: "Monitor your daily health with intelligent insights",
    },
    {
      title: "Personalized Care",
      desc: "Receive recommendations tailored just for you",
    },
    {
      title: "24×7 Availability",
      desc: "Access help anytime, anywhere in the world",
    },
  ];

  useEffect(() => {
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-400 to-white flex flex-col items-center justify-center px-10">
      <h1 className="text-4xl font-bold mb-16 text-gray-800">
        Why Choose AIMedCare?
      </h1>

      {/* Cards Container */}
      <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
        {features.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="w-[260px] h-[160px] bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg transition-transform"
          >
            <h2 className="text-xl font-semibold text-blue-600 mb-3">
              {item.title}
            </h2>
            <p className="text-gray-700">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Secondpage;
