import React, { useState, useEffect } from "react";
import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import ReactPaginate from "react-paginate";
import { fetchData } from "../api.js";

const Dashboard = () => {
  const itemsPerPageOptions = [10, 5, 15];
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);
  const [tableData, setTableData] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

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
    const fetchTableData = async () => {
      const response = await fetchData(currentPage, itemsPerPage);
      setTableData(response.data);
      setTotalItems(response.totalItems);

      mock.onGet("/data").reply(200, {
        data: response.data,
        totalItems: response.totalItems,
      });
    };

    fetchTableData();
  }, [currentPage, itemsPerPage]);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  return (
    <div className="p-6">
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
              <td className="p-4 text-[#1A1619] text-base">{item.firstName}</td>
              <td className="p-4 text-[#1A1619] text-base">{item.lastName}</td>
              <td className="p-4 text-[#1A1619] text-base">
                {item.phoneNumber}
              </td>
              <td className="p-4 text-[#1A1619] text-base">{item.partner}</td>
              <td className="p-4 text-[#1A1619] text-base">{item.location}</td>
              <td className="p-4 text-[#1A1619] text-base">
                <div
                  className={`status ${item.status.toLowerCase()} 
          ${
            item.status === "Active"
              ? "text-green-600 bg-green-100 rounded-lg p-1 w-[40%] text-center"
              : ""
          }
          ${
            item.status === "Awaiting Approval"
              ? "text-orange-600 bg-orange-100 rounded-lg p-1 w-[100%] text-center"
              : ""
          }
          ${
            item.status === "Deactivated"
              ? "text-red-500 bg-red-100 rounded-lg p-1 w-[70%] text-center"
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
          <label className="mr-2 text-[#808080]">Roles per page</label>
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
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 12l-8-8 1.5-1.5 6.5 6.5 6.5-6.5 1.5 1.5z" />
              </svg>
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
  );
};

export default Dashboard;
