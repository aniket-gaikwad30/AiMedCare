import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api/auth";

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetStatus = () => {
    setError("");
    setSuccess("");
  };

  useEffect(() => {
    if (location.state?.mode === "register") {
      setIsLogin(false);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    resetStatus();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to sign in");
      }

      setSuccess("Signed in successfully");
      const next = "/dashboard";
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    resetStatus();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      setSuccess("Account created successfully");
      const next = "/dashboard";
      navigate(next, { replace: true });
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-180 px-4">
      {/* LOGIN */}
      {isLogin && (
        <div
          className="w-400 max-w-4xl h-130 rounded-3xl shadow-xl overflow-hidden
                        flex flex-col md:flex-row
                        bg-gradient-to-r from-blue-500 to-blue-500 md:via-white md:via-50% md:to-white "
        >
          {/* INFO */}
          <div
            className="md:w-1/2 w-full flex flex-col items-center justify-center
                          text-center p-8 md:p-12"
          >
            <h1 className="text-3xl font-extrabold font-serif mb-2">
              AI MEDCARE CHATBOT
            </h1>
            <h2 className="text-2xl font-bold mb-2">
              Welcome to Our Application
            </h2>
            <p className="text-lg">Please Sign In to continue</p>
          </div>

          {/* LOGIN FORM */}
          <form
            className="md:w-1/2 w-full flex flex-col items-center justify-center
                           p-8 md:p-12 bg-white md:bg-transparent"
            onSubmit={handleLogin}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">SIGN IN</h1>

            <input
              type="email"
              className="w-full mb-4 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full mb-2 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-600 mt-2 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 mt-2 text-sm text-center">
                {success}
              </p>
            )}

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      )}

      {/* REGISTER */}
      {!isLogin && (
        <div
          className="w-400 max-w-4xl h-130 rounded-3xl shadow-xl overflow-hidden
           flex flex-col md:flex-row
           bg-blue-500
           md:bg-gradient-to-r md:from-white md:via-white md:via-50% md:to-blue-550"


        >
          {/* REGISTER FORM */}
          <form
            className="md:w-1/2 w-full flex flex-col items-center justify-center
                           p-8 md:p-12 bg-white md:bg-transparent"
            onSubmit={handleSignup}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8">SIGN UP</h1>

            <input
              className="w-full mb-4 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            <input
              type="email"
              className="w-full mb-4 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full mb-4 px-4 py-2 rounded-full bg-blue-200
                              focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-red-600 mt-2 text-sm text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-600 mt-2 text-sm text-center">
                {success}
              </p>
            )}

            <div className="flex gap-4 mt-6">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
              >
                Sign In
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-60"
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
          </form>

          {/* INFO */}
          <div
            className="md:w-1/2 w-full flex flex-col items-center justify-center
                          text-center p-8 md:p-12"
          >
            <h1 className="text-3xl font-extrabold font-serif mb-2">
              AI MEDCARE CHATBOT
            </h1>
            <h2 className="text-2xl font-bold mb-2">
              Welcome to Our Application
            </h2>
            <p className="text-lg">Please Sign up to continue</p>
          </div>
        </div>
      )}
    </div>
  );
}
