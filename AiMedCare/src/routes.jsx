import React from "react";

import FirstPage from "./pages/firstpage.jsx";
import SecondPage from "./pages/secondpage.jsx";
import Thirdpage from "./pages/thirdpage.jsx";
export const Home = () => {
  return (
    <div>
      <FirstPage />
      <SecondPage />
      <Thirdpage />
      <footer
        id="contact"
        className="w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white py-12 px-6 text-center"
      >
        <p className="text-lg font-semibold mb-2">Contact AiMedCare</p>
        <p className="text-gray-300 text-sm">
          Email: support@aimedcare.example — For emergencies, call your local
          emergency number.
        </p>
      </footer>
    </div>
  );
};

export default Home;






