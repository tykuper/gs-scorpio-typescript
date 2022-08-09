import React from "react";
import Footer from "./components/Footer";

import Navbar from "./components/Navbar/Navbar";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Navbar />
      <div id="routes">
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
