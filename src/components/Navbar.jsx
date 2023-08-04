import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [linkText, setLinkText] = useState("Sign Up");
  const [linkDestination, setLinkDestination] = useState("/signup");
  const [additionalText, setAdditionalText] = useState(
    "New to Xpress rewards?"
  );

  const handleLinkClick = () => {
    if (linkText === "Sign Up") {
      setLinkText("Sign In");
      setLinkDestination("/login");
      setAdditionalText("Already have an account?");
    } else {
      setLinkText("Sign Up");
      setLinkDestination("/signup");
      setAdditionalText("New to Xpress rewards?");
    }
  };

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-50">
      <Link to="/" className="flex items-center text-[#039BF0] text-2xl">
        {/* <img src={brandLogo} alt="XPRESS" className="w-8 h-8 mr-2" /> */}
        XPRESS
      </Link>
      <div className="text-[#606060] text-sm">
        {additionalText} &nbsp;
        <Link
          to={linkDestination}
          className="text-[#039BF0] border p-2 py-4 font-medium"
          onClick={handleLinkClick}
        >
          {linkText}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
