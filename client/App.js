import React from "react";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar/Navbar";
import Routes from "./Routes";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="bg-medium" id="routes">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
