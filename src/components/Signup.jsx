import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { TiAttachmentOutline } from "react-icons/ti";
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
          <p className="text-[12px] text-[#606060]">
            Please complete the form below to get started
          </p>
          <form className="mt-10" onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="">
                <h1 className="text-[#039BF0] mb-4">Bussiness Information</h1>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="businessName"
                  >
                    Business Name
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
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="businessEmail"
                  >
                    Business Email Address
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
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="businessPhone"
                  >
                    Business Phone Number
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 "
                    type="number"
                    inputMode="numeric"
                    id="businessPhone"
                    name="businessPhone"
                    value={formData.businessPhone}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="businessCategory"
                  >
                    Business Category
                  </label>
                  <select
                    className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 capitalize"
                    id="businessCategory"
                    name="businessCategory"
                    value={formData.businessCategory}
                    onChange={handleFormChange}
                  >
                    <option value=""></option>
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="accountNo"
                  >
                    Account No
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3"
                    type="number"
                    inputMode="numeric"
                    id="accountNo"
                    name="accountNo"
                    value={formData.accountNo}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="image"
                  >
                    Image[Logo]
                  </label>
                  <div className="border-dotted border border-[#1A1619] rounded p-4 mt-2 flex items-center justify-center flex-col">
                    <AiOutlineCloudDownload className="text-[#039BF0] text-3xl" />
                    <p className="text-[#1A141F] text-[12px] mt-2">
                      Drag here or click the button below to upload
                    </p>
                    <label
                      htmlFor="image"
                      className="cursor-pointer px-4 p-1 rounded mt-2 bg-[#039BF0] text-white"
                    >
                      <TiAttachmentOutline className="text-white text-[14px] inline-block mr-2" />
                      Choose file
                    </label>
                    <p className="text-[14px] text-[#4B3A5A] mt-2">
                      Maximum upload size: 10MB (.jpg)
                    </p>
                    <input
                      type="file"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="">
                <h3 className="text-[#039BF0] mb-4">Business Address</h3>
                <div className="md:flex">
                  <div className="mb-4 md:w-1/2 md:pr-2">
                    <label
                      className="block font-medium text-[#1A1619] text-[14px]"
                      htmlFor="houseNumber"
                    >
                      House Number
                    </label>
                    <input
                      className="w-[50%] border border-gray-300 rounded-md py-2 px-3"
                      type="number"
                      inputMode="numeric"
                      id="houseNumber"
                      name="houseNumber"
                      value={formData.houseNumber}
                      onChange={handleFormChange}
                    />
                  </div>
                  <div className="mb-4 md:w-1/2 md:pl-2">
                    <label
                      className="block font-medium text-[#1A1619] text-[14px]"
                      htmlFor="street"
                    >
                      Street
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
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="city"
                  >
                    City
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
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="state"
                  >
                    State
                  </label>
                  {/* Replace 'stateOptions' with API data for Nigerian states */}
                  <select
                    className="w-full border border-gray-300 bg-white rounded-md py-2 px-3 capitalize"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleFormChange}
                  >
                    <option value=""></option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    {/* Add more state options */}
                  </select>
                </div>

                <h3 className="text-[#039BF0] mb-4">Contact Person Information</h3>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="contactName"
                  >
                    Contact Name
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
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="contactPhone"
                  >
                    Contact Phone Number
                  </label>
                  <input
                    className="w-full border border-gray-300 rounded-md py-2 px-3 capitalize"
                    type="number"
                    inputMode="numeric"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleFormChange}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="contactEmail"
                  >
                    Contact Email Address
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

                <h3 className="text-[#039BF0] mb-4">Password</h3>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="password"
                  >
                    Password
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
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block font-medium text-[#1A1619] text-[14px]"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
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
                      className="absolute right-3 top-3 text-gray-500"
                    >
                      {formData.showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="mt-4">
              <div className="flex items-center">
                {step < 2 ? (
                  <button
                    className={`${
                      step === 1 && !isStepOneValid() ? "opacity-50" : ""
                    } bg-[#039BF0] text-white font-medium py-3 px-14 rounded`}
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
                    } bg-[#039BF0] text-white text-[14px] font-medium py-3 px-14 rounded`}
                    type="submit"
                    disabled={!isStepTwoValid()}
                  >
                    Submit
                  </button>
                )}

                <div className="ml-2 text-[#808080] text-[14px]">
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
