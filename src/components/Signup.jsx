import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pending from "./Pending";
import Navbar from "./Navbar";

const Signup = () => {
  const [step, setStep] = useState(1);
  const steps = ["Step 1", "Step 2"];
  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessCategory: "",
    accountNo: "",
    image: null,
    houseNumber: "",
    street: "",
    city: "",
    state: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });
  const [stepCompletion, setStepCompletion] = useState(
    Array(steps.length).fill(false)
  );
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      image: file,
    }));
  };

  const completeStep = (stepIndex) => {
    setStepCompletion((prevCompletion) => {
      const newCompletion = [...prevCompletion];
      newCompletion[stepIndex] = true;
      return newCompletion;
    });
  };

  const handlePasswordToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (step === steps.length && isStepTwoValid()) {
      // Perform API call or submit data as needed
      console.log("Form submitted:", formData);
      // Mark both steps as completed
      completeStep(0);
      completeStep(1);
      setShowModal(true);
      // navigate("/pending");
    } else if (step < steps.length && isStepOneValid()) {
      // Move to the next step if the current step is valid
      handleNext();
    } else {
      // Show an error toast message if form data is invalid
      toast.error("Please complete all required fields in the current step.");
    }
  };

  const isStepOneValid = () => {
    const {
      businessName,
      businessEmail,
      businessPhone,
      businessCategory,
      accountNo,
      image,
    } = formData;
    return (
      businessName.trim() !== "" &&
      businessEmail.trim() !== "" &&
      businessPhone.trim() !== "" &&
      businessCategory !== "" &&
      accountNo.trim() !== "" &&
      image !== null
    );
  };

  const isStepTwoValid = () => {
    const {
      houseNumber,
      street,
      city,
      state,
      contactName,
      contactPhone,
      contactEmail,
      password,
      confirmPassword,
    } = formData;
    return (
      houseNumber.trim() !== "" &&
      street.trim() !== "" &&
      city.trim() !== "" &&
      state !== "" &&
      contactName.trim() !== "" &&
      contactPhone.trim() !== "" &&
      contactEmail.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword
    );
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="w-full max-w-md p-8 bg-white rounded-md shadow-xl">
          <h2 className="md:text-left text-center text-xl font-bold text-[#039BF0]">
            Welcome to Xpress Rewards
          </h2>
          <p className="text-[12px]">
            Please complete the form below to get started
          </p>
          <form className="mt-10" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="">
                <h1 className="text-[#039BF0]">Bussiness Information</h1>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="businessName">
                    Business Name:
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    type="text"
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="businessEmail">
                    Business Email Address:
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 "
                    type="email"
                    id="businessEmail"
                    name="businessEmail"
                    value={formData.businessEmail}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="businessPhone">
                    Business Phone Number:
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 "
                    type="text"
                    id="businessPhone"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-medium"
                    htmlFor="businessCategory"
                  >
                    Business Category:
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    id="businessCategory"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a category</option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="accountNo">
                    Account No:
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    type="number"
                    id="accountNo"
                    name="accountNo"
                    value={formData.accountNo}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="image">
                    Image(Logo):
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="">
                <h3 className="text-[#039BF0]">Business Address</h3>
                <div className="md:flex">
                  <div className="mb-4 md:w-1/2 md:pr-2">
                    <label className="block font-medium" htmlFor="houseNumber">
                      House Number:
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-md py-2 px-3 "
                      type="text"
                      id="houseNumber"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="mb-4 md:w-1/2 md:pl-2">
                    <label className="block font-medium" htmlFor="street">
                      Street:
                    </label>
                    <input
                      className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                      type="text"
                      id="street"
                      name="street"
                      value={formData.street}
                      onChange={handleFormChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="city">
                    City:
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="state">
                    State:
                  </label>
                  {/* Replace 'stateOptions' with API data for Nigerian states */}
                  <select
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                  >
                    <option value="">Select a state</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    {/* Add more state options */}
                  </select>
                </div>

                <h3 className="text-[#039BF0]">Contact Person Information</h3>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="contactName">
                    Contact Name:
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="contactPhone">
                    Contact Phone Number:
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    type="number"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="contactEmail">
                    Contact Email Address:
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleFormChange}
                  />
                </div>

                <h3 className="text-[#039BF0]">Password</h3>
                <div className="mb-4">
                  <label className="block font-medium" htmlFor="password">
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      className="w-full border border-gray-300 rounded-md py-2 px-3 "
                      type={formData.showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleFormChange}
                    />
                    <button
                      onClick={handlePasswordToggle}
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                    >
                       {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block font-medium"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password:
                  </label>
                  <div className="relative">
                    <input
                      className="w-full border border-gray-300 rounded-md py-2 px-3 "
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleFormChange}
                    />
                    <button
                      onClick={handlePasswordToggle}
                      type="button"
                      className="absolute right-3 top-2 text-gray-500"
                    >
                       {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4">
              <div className="flex items-center">
                {step > 1 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePrev}
                  >
                    Previous
                  </button>
                )}
                {step < 2 ? (
                  <button
                    className={`${
                      step === 1 && !isStepOneValid() ? "opacity-50" : ""
                    } bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
                    type="submit"
                    onClick={handleNext}
                    disabled={step === 1 && !isStepOneValid()}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    className={`${
                      !isStepTwoValid() ? "opacity-50" : ""
                    } bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded`}
                    type="submit"
                    disabled={!isStepTwoValid()}
                  >
                    Submit
                  </button>
                )}

                <div>
                  Step {step} of {steps.length}
                </div>
              </div>
            </div>
          </form>
        </div>
        <Pending showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default Signup;
