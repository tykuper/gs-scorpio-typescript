import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="text-center text-white bg-secondary fixed-bottom">
      <div className="text-center p-3">
        © 2022 Copyright:
        <Link className="text-white" to="/">
          OrcaAudio.com
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
