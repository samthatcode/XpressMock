import React, { useState, useEffect } from "react";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ReactPaginate from "react-paginate";
import { fetchData, fetchDataByStatus  } from "../api.js";
import { FiPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FaBell, FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const itemsPerPageOptions = [10, 5, 15];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showLinks, setShowLinks] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [verifiersCount, setVerifiersCount] = useState(10);

  useEffect(() => {
    // Create a new instance of AxiosMockAdapter
    const mock = new AxiosMockAdapter(axios);
    // Mock any GET request to /data
    // arguments for reply are (status, data, headers)
    // mock.onGet("/data").reply(200, {
    //   data: fetchData.data, // replace this with your mock data
    //   totalItems: fetchData.totalItems, // replace this with your mock totalItems
    // });

    // Simulate fetching data from API
    const statusMapping = {
      'Active Verifiers': 'Active',
      'Pending Verifiers': 'Awaiting Approval',
      'Deactivated Verifiers': 'Deactivated',
    };
    
    const fetchTableData = async () => {
      let response;
      if (selectedOption === 'All') {
        response = await fetchData(currentPage, itemsPerPage);
      } else {
        const status = statusMapping[selectedOption];
        response = await fetchDataByStatus(currentPage, itemsPerPage, status);
      }
      setTableData(response.data);
      setTotalItems(response.totalItems);

      // Set the count of verifiers based on the selected option
      setVerifiersCount(response.totalItems);
    
      mock.onGet("/data").reply(200, {
        data: response.data,
        totalItems: response.totalItems,
      });
    };
    

    fetchTableData();
  }, [currentPage, itemsPerPage, selectedOption]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    // Reset to the first page when the option is changed
    setCurrentPage(1);
  };


  const handlePageChange = () => {
    setCurrentPage(prevState => prevState.selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <>
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="text-[#1A1619] font-bold">Verifiers</div>
          <div className="text-[#039BF0] font-medium text-[12px] ml-2 rounded-full bg-[#eaf3f9] p-1">
          {verifiersCount}
          </div>
        </div>
        <div className="relative">
          <div className="flex items-center">
            <div className="relative">
              <FaBell className="text-2xl ml-4 text-slate-300" />
              <div className="bg-red-500 text-white rounded-full w-2 h-2 flex items-center justify-center absolute top-1 right-0 -mt-1 -ml-5">
                {""}
              </div>
            </div>
            <img src={""} alt="Logo" className="w-8 h-8 ml-4 rounded-full" />
            <FaChevronDown
              className="text-sm text-[#787678] ml-4 cursor-pointer"
              onClick={() => setShowLinks(!showLinks)}
            />
          </div>
          {showLinks && (
            <div className="absolute right-0 mt-2 py-2 bg-white rounded shadow-lg">
              {/* Replace the links below with your actual navigation links */}
              <Link
                to={""}
                className="block px-4 py-2 hover:bg-gray-200 text-[12px]"
              >
                Edit Profile
              </Link>
              <Link
                to={""}
                className="block px-4 py-2 hover:bg-gray-200 text-[12px]"
              >
                Check Status
              </Link>
              <Link
                to={""}
                className="block px-4 py-2 hover:bg-gray-200 text-[12px]"
              >
                Log Out
              </Link>
            </div>
          )}
        </div>
      </header>

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className="border p-2 bg-[#ffffff]"
          >
            <option className="">All</option>
            <option>Active Verifiers</option>
            <option>Pending Verifiers</option>
            <option>Deactivated Verifiers</option>
          </select>
          <div className="flex">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </span>
              <input
                className="border pl-8 pr-2 py-2 text-[#c4c4c4]"
                placeholder="Name/Phone no / Location"
              />
            </div>
            <button className="bg-[#039BF0] rounded text-white p-2 ml-2 flex items-center">
              <FiPlus className="mr-2 text-[14px]" /> Add new Verifier
            </button>
          </div>
        </div>

        <table className="w-full overflow-hidden shadow-lg bg-[#ffffff]">
          <thead className="">
            <tr className="border-b">
              <th className="p-4">
                <input type="checkbox" />
              </th>
              <th className="p-4 text-[#1A1619] font-bold">First Name</th>
              <th className="p-4 text-[#1A1619] font-bold">Last Name</th>
              <th className="p-4 text-[#1A1619] font-bold">Phone Number</th>
              <th className="p-4 text-[#1A1619] font-bold">Partner</th>
              <th className="p-4 text-[#1A1619] font-bold">Location</th>
              <th className="p-4 text-[#1A1619] font-bold">Status</th>
              <th className="p-4 text-[#1A1619] font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((item, index) => (
              <tr key={item.id} className="border-b">
                <td className="p-4 text-[#1A1619] text-base">
                  <input type="checkbox" />
                </td>
                <td className="p-4 text-[#1A1619] text-base">
                  {item.firstName}
                </td>
                <td className="p-4 text-[#1A1619] text-base">
                  {item.lastName}
                </td>
                <td className="p-4 text-[#1A1619] text-base">
                  {item.phoneNumber}
                </td>
                <td className="p-4 text-[#1A1619] text-base">{item.partner}</td>
                <td className="p-4 text-[#1A1619] text-base">
                  {item.location}
                </td>
                <td className="p-4 text-[#1A1619] text-base">
                  <div
                    className={`status ${item.status.toLowerCase()} 
          ${
            item.status === "Active"
              ? "text-green-600 bg-green-100 rounded-lg p-1 w-[90%] text-center"
              : ""
          }
          ${
            item.status === "Awaiting Approval"
              ? "text-orange-600 bg-orange-100 rounded-lg p-1 w-[100%] text-center"
              : ""
          }
          ${
            item.status === "Deactivated"
              ? "text-red-500 bg-red-100 rounded-lg p-1 w-[100%] text-center"
              : ""
          }
        `}
                  >
                    {item.status}
                  </div>
                </td>
                <td className="p-4">
                  <div className="actions">
                    <span className="dots">...</span>
                    <div className="sub-menu">{/* Menu items */}</div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between w-full overflow-hidden p-6 shadow-lg bg-[#ffffff]">
          <div className="flex items-center">
            <label className="mr-2 text-[#808080] text-[12px]">
              Roles per page
            </label>
            <div className="relative">
              <select
                onChange={handleItemsPerPageChange}
                className="block appearance-none bg-white border border-gray-400 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                {itemsPerPageOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <FaChevronDown className=" h-4 w-4" />
              </div>
            </div>
          </div>

          <div className="pagination-container">
            <ReactPaginate
              pageCount={Math.ceil(totalItems / itemsPerPage)}
              onPageChange={handlePageChange}
              containerClassName="pagination"
              pageClassName="pagination-item"
              previousLabel={"Previous"}
              nextLabel={"Next"}
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
