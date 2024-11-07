import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-red-200 via-red-300 to-red-400 text-white text-center p-6">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
          <i className="fab fa-instagram"></i>
        </a>
      </div>
      <p>&copy; 2024 Admin Dashboard. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
