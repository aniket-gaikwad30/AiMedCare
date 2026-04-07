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
        <p className="text-lg font-bold  mb-2">Contact AiMedCare</p><br></br>
        <p className="text-gray-300 text-sm">
          <label>Linkedin : </label>
          <a href="https://www.linkedin.com/in/aniket-gaikwad30/">Aniket Gaikwad</a><br></br>
          <label>Linkedin : </label>
          <a href="https://www.linkedin.com/in/swaraj-bais24/">Swaraj Bais</a><br></br><br></br>
          Email: aniketapg123@gmail.com, swarajbais06@gmail.com
        </p>
      </footer>
    </div>
  );
};

export default Home;






