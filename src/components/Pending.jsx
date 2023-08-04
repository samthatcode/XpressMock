import React, { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Pending = ({ showModal, setShowModal }) => {
  const navigate = useNavigate();

  const handleCloseButton = () => {
    setShowModal(false);
    navigate("/");
  };

  return (
    <>
      {showModal ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex items-center flex-col">
                      <AiOutlineExclamationCircle className="text-[#FF9900] text-2xl" />
                      <h2 className="text-[#FF9900] text-xl font-medium mt-2">Pending</h2>
                    </div>
                    <p className="mt-4 [#1a1619] text-center text-[12px] font-medium">
                      Your registration is awaiting approval from our partnership team.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  onClick={handleCloseButton}
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#039BF0] text-base font-medium text-white hover:bg-[#039Be5] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#039BF0] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Pending;










// import React from "react";
// import { AiOutlineExclamationCircle } from "react-icons/ai";
// import { useNavigate } from "react-router-dom";

// const Pending = ({ showModal, setShowModal }) => {
//   const navigate = useNavigate();

//   const handleCloseButton = () => {
//     navigate("/");
//   };

//   return (
//     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
//       <div className="bg-white rounded-md p-6 max-w-sm shadow-md flex flex-col items-center">
//         <div className="flex items-center flex-col">
//           <AiOutlineExclamationCircle className="text-[#FF9900] text-2xl" />
//           <h2 className="text-[#FF9900] text-xl font-medium mt-2">Pending</h2>
//         </div>
//         <p className="mt-4 [#1a1619] text-center text-[12px] font-medium">
//           Your registration is awaiting approval from our partnership team.
//         </p>
//         <div className="mt-6 w-full">
//           <button
//             className="w-full bg-[#039BF0] hover:bg-[#039Be5] text-white py-2 px-4 rounded"
//             onClick={handleCloseButton}
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Pending;
