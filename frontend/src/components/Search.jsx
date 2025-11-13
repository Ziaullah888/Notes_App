import React from "react";

const Search = ({ search, setSearch, setPage }) => {
  return (
    <>
      <input
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        placeholder="Search notes..."
        className="w-full md:w-80 p-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 transition duration-200 ease-in-out outline-none hover:shadow-md"
      />
    </>
  );
};

export default Search;
