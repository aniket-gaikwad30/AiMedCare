import React from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../ai/chatbot.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/auth";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      /* ignore */
    }
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white">
      <header className="flex flex-wrap justify-between items-center gap-3 p-4 border-b border-white/40 bg-white/30 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 rounded-full border border-gray-600 text-gray-800 hover:bg-white/80 transition-colors"
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => navigate("/chatbot")}
            className="px-4 py-2 rounded-full border border-gray-600 text-gray-800 hover:bg-white/80 transition-colors"
          >
            Open assistant
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          >
            Log out
          </button>
        </div>
      </header>
      <main className="p-6 md:p-8 max-w-4xl mx-auto text-gray-700">
        <p className="mb-6 text-center">
          Your health assistant is below. Explore tools or open the full chat
          experience.
        </p>
        <div className="mt-14 w-full max-w-5xl mx-auto md:mx-0">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
            Health tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                to: "/report",
                label: "Report analysis",
                desc: "Upload lab reports (sign in)",
              },
              {
                to: "/assessment",
                label: "Mental health",
                desc: "Stress, mood & sleep screening",
              },
              {
                to: "/dietscreen",
                label: "Diet & nutrition",
                desc: "BMI, calories & macros",
              },
              {
                to: "/riskscreen",
                label: "Risk calculator",
                desc: "Diabetes, heart & obesity risk",
              },
              {
                to: "/reminderscreen",
                label: "Rx reminders",
                desc: "Medicine schedules",
              },
              {
                to: "/startrating",
                label: "Find doctors",
                desc: "Search & ratings",
              },
            ].map((item) => (
              <button
                key={item.to}
                type="button"
                onClick={() => navigate(item.to)}
                className="text-left p-5 rounded-2xl border-2 border-gray-800/40 bg-white/30 backdrop-blur-sm
                  hover:bg-white/80 hover:border-blue-800 transition-colors shadow-sm"
              >
                <span className="block font-semibold text-gray-900">
                  {item.label}
                </span>
                <span className="block text-sm text-gray-700 mt-1">
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => navigate("/chatbot")}
            className="mt-8 w-full sm:w-auto px-8 py-3 rounded-full bg-blue-600 text-white font-semibold
              hover:bg-blue-700 transition-colors"
          >
            AIMedcare assistant
          </button>
        </div>
        {/* <div className="flex justify-center mb-6">
          <Chatbot />
        </div> */}
      </main>
    </div>
  );
}
