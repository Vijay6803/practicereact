// Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div>
            <p className="text-sm">
              &copy; 2024 SportsStore. All rights reserved.
            </p>
          </div>
          {/* Right side */}
          <div>
            <p className="text-sm">Contact Us | Privacy Policy</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
