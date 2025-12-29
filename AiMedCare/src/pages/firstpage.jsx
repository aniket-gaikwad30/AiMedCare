import React from "react";
import { useNavigate } from "react-router-dom";
import Chatbot from "../ai/chatbot";

const FirstPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-blue-400 to-white overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="w-[95%] mx-auto mt-3 bg-gradient-to-r from-blue-400 to-white 
      rounded-3xl fixed top-0 left-1/2 -translate-x-1/2 z-10
      border-2 border-black px-6 py-4">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo */}
          <img
            src="./logo.jpeg"
            className="h-14 md:h-20 rounded-2xl border-2 border-gray-700"
            alt="logo"
          />

          {/* Nav Links */}
          <div className="flex gap-6 md:gap-10 text-lg md:text-2xl text-black">
            <div className="hover:text-blue-950 cursor-pointer">Home</div>
            <div className="hover:text-blue-950 cursor-pointer">About Us</div>
            <div className="hover:text-blue-950 cursor-pointer">Contact Us</div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            {["Sign in", "Sign up"].map((btn) => (
              <button
                key={btn}
                className="relative overflow-hidden px-5 py-2 border border-gray-500 rounded-full 
                font-medium text-gray-700
                after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-full after:w-full
                after:bg-black after:translate-y-full after:transition-all after:duration-300 after:z-[-1]
                hover:after:translate-y-0 hover:text-white transition-colors duration-300"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col justify-center min-h-screen px-6 md:px-16 pt-40 md:pt-48">

        <h1 className="text-4xl md:text-7xl font-bold mb-6 text-center md:text-left">
          AiMedCare
        </h1>

        <p className="text-lg md:text-2xl max-w-xl text-center md:text-left">
          Your AI-powered health assistant designed to guide, analyze, predict,
          and support your well-being — all in one intelligent platform.
        </p>

      </section>

      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default FirstPage;
