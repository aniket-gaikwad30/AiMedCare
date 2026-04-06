import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/auth";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const [status, setStatus] = useState("checking");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/check`, {
          credentials: "include",
        });
        if (!cancelled) setStatus(res.ok ? "ok" : "fail");
      } catch {
        if (!cancelled) setStatus("fail");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-white">
        <p className="text-lg text-gray-700">Loading…</p>
      </div>
    );
  }

  if (status === "fail") {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}
