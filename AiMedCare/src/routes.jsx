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
    </div>
  );
};

export default Home;
