import axios from "../axiosSetup";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    showPassword: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handlePasswordToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock login (you can replace this with actual login authentication)
    try {
      const response = await axios.post("/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Mock login formData:", formData);
      console.log("Mock login response data:", response.data);
      console.log("Response:", response);

      toast.success("Login Successful", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 1000,
      });

      // Save to local storage
      localStorage.setItem("session", JSON.stringify(response.data.session));
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Incorrect Username or Password", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 500,
        });
      } else {
        toast.error("Oops!, Network error");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md p-8 bg-white rounded-md">
          <h2 className="md:text-left text-center text-xl font-medium text-[#039BF0]">
            Welcome Back!
          </h2>
          <p className="text-[12px] text-[#606060]">
            Sign in to your Xpress reward partner's dashboard
          </p>
          <form className="mt-10" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-[#1a1619]"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-1 text-[#1a1619]"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={formData.showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handlePasswordToggle}
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                >
                  {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                <div className="flex items-center text-[12px]">
                  <p className="text-[#606060]">Forgot Password?</p>
                  <Link to="" className="text-[#039BF0] p-2 font-medium">
                    Reset it
                  </Link>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-[#039BF0] text-white font-medium py-2 px-4 rounded"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
