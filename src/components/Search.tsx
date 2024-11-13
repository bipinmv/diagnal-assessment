import React, { useState } from "react";
import { API_BASE_URL } from "../config/constants";

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  setSearching: (value: boolean) => void;
}

const SearchBar: React.FC<Props> = ({
  searchQuery,
  onSearchChange,
  setSearching,
}) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const onGoBack = () => {
    onSearchChange("");
    setSearching(false);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <img
          src={`${API_BASE_URL}/images/Back.png`}
          alt="search"
          width="18"
          onClick={onGoBack}
          className="cursor-pointer"
        />

        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
