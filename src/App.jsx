import React from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { Dashboard, Home, Navbar, Pending, SignIn, Signup } from "./components";


const App = () => {
  return (
    <>
      <div>
        <ToastContainer />
        {/* <Navbar /> */}
        {/* <Home /> */}
        <div className="content">
          <Routes>
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pending" element={<Pending />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
