import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const Thirdpage = () => {
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  const useCases = [
    {
      title: "Students",
      desc: "Quick health advice during study hours, hostel sickness, and diet planning",
    },
    {
      title: "Working Professionals",
      desc: "Manage stress, medicine reminders, and lifestyle disease tracking",
    },
    {
      title: "Senior Citizens",
      desc: "Medicine reminders, diet suggestions, and easy symptom explanation",
    },
    {
      title: "Rural Communities",
      desc: "Access basic medical guidance without expensive hospital visits",
    },
    {
      title: "General Public",
      desc: "Quick health advice, diet planning, and lifestyle management",
    },
    {
      title: "Hospitals & Clinics",
      desc: "Integration for patient triaging and early assessment",
    },
    {
      title: "Healthcare Providers",
      desc: "24/7 availability for patient queries and symptom checking",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        }
      );

      gsap.to(cardsRef.current, {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-r from-blue-400 to-white flex flex-col items-center justify-center px-10 py-20"
    >
      <h1 className="text-5xl font-bold mb-16 text-gray-800 tracking-wide">
        Real-world Use Cases
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl">
        {useCases.map((item, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/40 hover:scale-105 transition-transform duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h2 className="text-2xl font-bold text-blue-600 mb-3">
              {item.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Thirdpage;
