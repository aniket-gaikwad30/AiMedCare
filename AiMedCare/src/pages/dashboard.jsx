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
        <div className="flex gap-3">
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
      <main className="p-8 text-center text-gray-700">
        <p className="mb-4">
          Your health assistant is available below. You can also use the full
          chat experience from &quot;Open assistant&quot;.
        </p>
        <Chatbot />
      </main>
    </div>
  );
}
