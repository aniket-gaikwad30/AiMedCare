import { useNavigate } from "react-router-dom";
import Chatbot from "../ai/chatbot.jsx";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/auth";

export default function ChatbotPage() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      /* still navigate away */
    }
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-white">
      <header className="flex flex-wrap justify-end gap-3 p-4 border-b border-white/40 bg-white/30 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded-full border border-gray-600 text-gray-800 hover:bg-white/80 transition-colors"
        >
          Home
        </button>
        <button
          type="button"
          onClick={handleLogout}
          className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          Log out
        </button>
      </header>
      <main className="flex flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          AI MedCare Assistant
        </h1>
        <p className="text-gray-700 max-w-lg">
          Open the chat widget in the corner to ask health questions and get
          guidance from AIMEDCARE.
        </p>
      </main>
      <Chatbot />
    </div>
  );
}
