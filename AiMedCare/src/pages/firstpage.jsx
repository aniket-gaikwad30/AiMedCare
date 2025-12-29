import React from "react";
import { useNavigate } from "react-router-dom";
import chatbot from "../ai/chatbot";

const FirstPage = () => {
   const navigate = useNavigate();
  return (
    <div className="h-screen w-full bg-gradient-to-r from-blue-400 to-white min-h-screen flex flex-col items-center overflow-x-hidden">
      
      {/* Navbar */}
      <div
        class="h-[18%] w-[95%] mt-3 bg-gradient-to-r from-blue-400 to-white rounded-3xl fixed z-10
flex flex-row items-center justify-between px-5 mx-auto overflow-hidden border-2 border-black"

      >
        <img src="./logo.jpeg" className="h-20 rounded-4xl border-2 border-gray-700" alt="" />

        <div className="flex gap-10 text-black text-2xl relative left-10">
          <div className="hover:text-blue-950 font-500">Home</div>
          <div className="hover:text-blue-950 font-500">About Us</div>
          <div className="hover:text-blue-950 font-500">Contact Us</div>
        </div>

        <div className="flex gap-6">
          <button   className="relative overflow-hidden px-5 py-2 border border-gray-500 rounded-full 
font-medium text-gray-700
after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-full after:w-full
after:bg-black after:translate-y-full after:transition-all after:duration-300 after:z-[-1]
hover:after:translate-y-0 hover:text-white transition-colors duration-300">
            Sign in
          </button>
          <button className="relative overflow-hidden px-5 py-2 border border-gray-500 rounded-full 
font-medium text-gray-700
after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-full after:w-full
after:bg-black after:translate-y-full after:transition-all after:duration-300 after:z-[-1]
hover:after:translate-y-0 hover:text-white transition-colors duration-300">
            Sign up
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="flex flex-col   items-end  px-10 text-center">
        <h1 className="text-7xl font-bold mb-4 relative right-230 top-45">AiMedCare</h1>

        <p className="text-2xl relative  font-inter font-600 right-4 top-95 w-[45%]">
          Your AI-powered health assistant designed to guide, analyze, predict,
          and support your well-being — all in one intelligent platform.
        </p>
      </div>
      <button onClick={() => navigate("/chatbot")}>
        AICHATBOT
      </button>
      
      
    </div>
  );
};

export default FirstPage;
