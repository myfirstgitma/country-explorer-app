import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({ search, onSearch, dark }) => {
  return (
    <div className="relative w-full">
      <Search
        className={`absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none ${
          dark ? "text-indigo-400" : "text-gray-400"
        }`}
        size={18}
      />
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => onSearch(e.target.value)}
        className={`w-full pl-10 pr-4 py-2.5 rounded-full backdrop-blur-md border outline-none transition-all duration-300 hover:border-indigo-400 focus:border-indigo-500 focus:shadow-lg focus:shadow-indigo-500/30 ${
          dark
            ? "bg-gray-800/50 border-gray-600/50 text-white placeholder:text-gray-400"
            : "bg-white/50 border-indigo-200 text-gray-800 placeholder:text-gray-400"
        }`}
      />
    </div>
  );
};

export default SearchBar;
