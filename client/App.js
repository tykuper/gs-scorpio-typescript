import React from 'react';
import Footer from './components/Footer';

import Navbar from './components/Navbar/Navbar';
import Routes from './Routes';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="bg-medium" id="routes">
        <ToastContainer
          limit={3}
          closeOnClick={true}
          autoClose={3000}
          position="bottom-right"
        />
        <Routes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
