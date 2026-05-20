import React from 'react'

const SearchBar = ({search, onSearch}) => {
  return (
    <>
      <input
        type="text"
        placeholder="search countires"
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className=" border rounded px-3 py-1 text-sm bg-white text-black"
      />
    </>
  );
}

export default SearchBar

 