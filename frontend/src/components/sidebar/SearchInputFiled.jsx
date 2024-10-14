import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchInputFiled = () => {
  return (
    <form className="flex items-center ga-2">
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered rounded-full"
      />
      <button className="btn btn-circle bg-blue-500 text-white">
        <CiSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInputFiled;
