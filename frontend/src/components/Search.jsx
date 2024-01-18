"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [keyword, setKeyword] = useState("")

  const navigate = useNavigate()

  const fetchSearchResults = async (searchKeyword) => {
    try {
      await axios.get(`http://localhost:5000/car/all-cars?keyword=${searchKeyword}`);
    } catch (error) {
      console.error("Error fetching search results: ", error);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      fetchSearchResults(keyword);
      navigate({
        pathname: "/",
        search: `?keyword=${keyword}`
      });
    } else {
      navigate("/");
    }
  };

  const handleSearch = (e) => {
    const searchKeyword = e.target.value;
    setKeyword(searchKeyword);
    fetchSearchResults(searchKeyword);
  };

  const user = JSON.parse(localStorage.getItem("user"))?.data

  return (
    <>
      <form className="relative flex md:justify-start justify-center flex-nowrap items-center w-full order-last md:order-none md:mt-0 md:w-2/4 lg:w-2/4" onSubmit={submitHandler}>
        <div className="border border-1 border-gray-200 md:w-auto w-full flex items-center py-2 px-3 rounded-lg md:mx-0 mx-3 md:mb-0 mb-[16px]">
          <input
            className="flex-grow text-gray-300 outline-none border-none bg-transparent appearance-none hover:border-gray-400 focus:outline-none focus:border-gray-400"
            type="text"
            value={keyword}
            onChange={handleSearch}
            placeholder="Search for Cars"
            required
          />
          <button onClick={submitHandler} className={`absolute right-[1.4rem] ${user ? "md:right-[-6.3rem]" : "md:right-[-3.4rem]"} text-gray-100 fa-solid fa-magnifying-glass bg-gray-500 py-2 px-4 rounded-lg`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

          </button>
        </div>
      </form>
    </>
  );
};

export default Search;
