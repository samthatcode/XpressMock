import React, { useState, useEffect } from "react";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ReactPaginate from "react-paginate";
import { fetchData, fetchDataByStatus } from "../api.js";
import {
  FiPlus, 
  FiUsers,  
} from "react-icons/fi";
import { FaBell, FaChevronDown, FaSearch } from "react-icons/fa";
import { BiMoney, BiRadioCircle } from 'react-icons/bi';
import { Link } from "react-router-dom";
import { AiOutlineTags } from "react-icons/ai";


const Dashboard = () => {
  const itemsPerPageOptions = [10, 5, 15];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [showLinks, setShowLinks] = useState(false);
  const [selectedOption, setSelectedOption] = useState("All");
  const [showSidebar, setShowSidebar] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Verifiers");

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

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
      "Active Verifiers": "Active",
      "Pending Verifiers": "Awaiting Approval",
      "Deactivated Verifiers": "Deactivated",
    };

    const fetchTableData = async () => {
      let response;
      if (selectedOption === "All") {
        response = await fetchData(currentPage, itemsPerPage);
      } else {
        const status = statusMapping[selectedOption];
        response = await fetchDataByStatus(currentPage, itemsPerPage, status);
      }
      setTableData(response.data);
      setTotalItems(response.totalItems);

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

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };



  return (
    <>
      <div className="flex">
        {/* Sidebar .*/}
        <aside className="bg-white text-white top-0 left-0 transition-all duration-300 p-3 shadow-md">
          <div className="p-3 flex flex-col items-center justify-between">
            <Link to="/"
              onClick={toggleSidebar}
              className="text-3xl text-[#039BF0] cursor-pointer uppercase font-bold"
              style={{ fontFamily: 'Chiq Pro, sans-serif' }}
            >
              Xpress
            </Link>
          </div>
          <div className="mt-3">
            <div
              className="flex items-center p-3 cursor-pointer bg-[#F2FAFF] text-[14px] rounded border-l border-[#039BF0] "
              style={{ borderLeft: "3px solid #039BF0" }}
            >
              <FiUsers className="text-xl mr-2 text-[#039BF0]" />
              <div
                className={`${
                  activeMenu === "Verifiers"
                    ? "text-[#039BF0]"
                    : "text-[#039BF0]"
                }`}
              >
                Verifiers
              </div>
            </div>
            <div className="flex items-center p-3 cursor-pointer text-[#1A1619] text-[14px]">
              <AiOutlineTags className="text-xl mr-2" />
              <div>Deals</div>
            </div>
            <div className="flex items-center p-3 cursor-pointer text-[#1A1619] text-[14px]">
              <BiMoney className="text-xl mr-2" />
              <div>Transactions</div>
            </div>
          </div>
        </aside>
        <div className={`flex flex-col w-full ml-${showSidebar ? "64" : "16"}`}>
          <header className="bg-white p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="font-bold">Verifiers</div>
              <div className="text-[#039BF0] font-medium text-[12px] ml-2 rounded-full bg-[#eaf3f9] p-1">
                {tableData.length}
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
                <img
                  src={`/images/${JSON.parse(localStorage.getItem('user')).photo}`}
                  alt="Logo"
                  className="w-8 h-8 ml-4 rounded-full"
                />
                <FaChevronDown
                  className="text-sm text-[#787678] ml-4 cursor-pointer"
                  onClick={() => setShowLinks(!showLinks)}
                />
              </div>
              {showLinks && (
                <div className="absolute right-0 mt-2 py-2 bg-white rounded shadow-lg">
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
                className="border p-2 bg-[#ffffff] cursor-pointer"
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
                    className="border pl-8 pr-2 py-2 text-[#c4c4c4] text-[12px]"
                    placeholder="Name/Phone no / Location"
                  />
                </div>
                <button className="bg-[#039BF0] rounded text-white p-2 ml-2 text-[14px] flex items-center">
                  <FiPlus className="mr-2 " /> Add new Verifier
                </button>
              </div>
            </div>

            <table className="w-full overflow-hidden shadow-lg bg-[#ffffff]">
              <thead className="">
                <tr className="border-b">
                  <th className="p-4">
                    <input type="checkbox" />
                  </th>
                  <th className="p-4 text-[#1A1619] font-bold text-[14px] text-left">
                    First Name
                  </th>
                  <th className="p-4 text-[#1A1619] font-bold text-[14px] text-left">
                    Last Name
                  </th>
                  <th className="p-4 text-[#1A1619] font-bold text-[14px] text-left">
                    Phone Number
                  </th>
                  <th className="p-4 text-[#1A1619] font-bold text-[14px] text-left">
                    Partner
                  </th>
                  <th className="p-4 text-[#1A1619] font-bold text-[14px] text-left">
                    Location
                  </th>
                  <th className="p-4 text-[#1A1619] font-bold text-[14px] text-left">
                    Status
                  </th>
                  <th className="p-4 text-[#1A1619] font-bold text-[14px] text-left">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-4 text-[#1A1619] text-[14px]">
                      <input type="checkbox" />
                    </td>
                    <td className="p-4 text-[#1A1619] text-[14px]">
                      {item.firstName}
                    </td>
                    <td className="p-4 text-[#1A1619] text-[14px]">
                      {item.lastName}
                    </td>
                    <td className="p-4 text-[#1A1619] text-[14px]">
                      {item.phoneNumber}
                    </td>
                    <td className="p-4 text-[#1A1619] text-[14px]">
                      {item.partner}
                    </td>
                    <td className="p-4 text-[#1A1619] text-[14px]">
                      {item.location}
                    </td>
                    <td className="p-4 text-[#1A1619] text-[14px]">
                      <div
                        className={`status ${item.status.toLowerCase()} 
          ${
            item.status === "Active"
              ? "text-green-600 bg-green-100 rounded-lg p-1 text-xs font-semibold inline-block py-1 px-2 last:mr-0 mr-1 text-[14px]"
              : ""
          }
          ${
            item.status === "Awaiting Approval"
              ? "text-orange-600 bg-orange-100 rounded-lg p-1 text-xs font-semibold inline-block py-1 px-2 last:mr-0 mr-1 text-[14px]"
              : ""
          }
          ${
            item.status === "Deactivated"
              ? "text-red-500 bg-red-100 rounded-lg p-1 text-xs font-semibold inline-block py-1 px-2 last:mr-0 mr-1 text-[14px]"
              : ""
          }
        `}
                      >
                        {item.status}
                      </div>
                    </td>
                    <td className="p-4">                 
                        <span className="flex"><BiRadioCircle size={6} /><BiRadioCircle size={6} /><BiRadioCircle size={6} /></span>                      
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
                    className="block appearance-none bg-white border border-gray-400 text-[#1A1619] py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    {itemsPerPageOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
                    <FaChevronDown className="text-[#1A1619] h-4 w-4" />
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
        </div>
      </div>
    </>
  );
};

export default Dashboard;
