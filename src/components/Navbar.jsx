import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from 'styled-components';

const StyledLink = styled(Link)`
  font-family: 'Chiq Pro Bold', sans-serif;
  color: #039bf0;
  font-size: 2rem;
  /* Add any other custom styles you need */
`;

const Navbar = () => {
  const location = useLocation();
  const [linkText, setLinkText] = useState("Sign Up");
  const [linkDestination, setLinkDestination] = useState("/signup");
  const [additionalText, setAdditionalText] = useState(
    "New to Xpress rewards?"
  );

  useEffect(() => {
    if (location.pathname === '/signup') {
      setLinkText("Sign In");
      setLinkDestination("/login");
      setAdditionalText("Already have an account?");
    } else {
      setLinkText("Sign Up");
      setLinkDestination("/signup");
      setAdditionalText("New to Xpress rewards?");
    }
  }, [location]);

  return (
    <nav className="p-4 flex items-center justify-between sticky top-0 z-50">
    <StyledLink to="/">
    {/* <img src={brandLogo} alt="XPRESS" className="w-8 h-8 mr-2" /> */}
    XPRESS
  </StyledLink>
      <div className="text-[#606060] text-sm">
        {additionalText} &nbsp;
        <Link
          to={linkDestination}
          className="text-[#039BF0] border border-[#039BF0] p-2 py-2 rounded font-bold"        
        >
          {linkText}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
