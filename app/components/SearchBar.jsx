import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ search, onSearch }) => {
  return (
    <div className="relative w-full">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"
        size={18}
      />
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-gray-400 text-black placeholder:text-gray-500 outline-none transition-all duration-300 hover:border-cyan-400 focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/30"
      />
    </div>
  );
};

export default SearchBar;
