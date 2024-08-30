import React, { useState } from "react";

const Search = ({ search, setSearch, handleSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        className="search-text"
        name="search"
        placeholder="Enter City Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search Weather
      </button>
    </div>
  );
};

export default Search;
