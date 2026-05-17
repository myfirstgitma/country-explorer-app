"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";

const CountryGrid = ({ countries }) => {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [darkMode, setDarkMode] = useState(false);

  const filtered = countries.filter((c) => {
    const matchesSearch = c.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region === "" || c.region === region;
    return matchesSearch && matchesRegion;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.common.localeCompare(b.name.common); // A -> Z
    } else {
      return b.name.common.localeCompare(a.name.common); // Z -> A
    }
  });

  return (
    <div
      className={
        darkMode
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-gray-100 text-black min-h-screen"
      }
    >
      <nav className="bg-white  dark:bg-gray-800 sticky shadow-md px-8 py-4 flex flex-col md:flex-row md: justify-between md: items-center gap-4">
        <h1 className="text-2xl font-bold text-white">Country Explorer</h1>

        <SearchBar search={search} onSearch={setSearch} />

        <div
          className={
            darkMode
              ? "bg-gray-700 text-white px-3 py-1 rounded"
              : "bg-gray-100 text-black px-3 py-1 rounded"
          }
        >
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="text-black mr-5 bg-amber-200 border border-black rounded px-2 py-1"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? "A -> Z" : "Z -> A"}
          </button>

          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="border p-2 rounded-lg mb-3 mt-2 bg-amber-500 text-black"
          >
            <option value="">All Continents</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>
      </nav>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
        {sorted.map((country, index) => (
          // Link wraps the entire card
          <Link
            href={`/country/${encodeURIComponent(country.name.common)}`}
            key={index}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer">
              <img
                src={country.flags.png}
                alt={country.flags.alt || country.name.common}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {country.name.common}
                </h2>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Capital:</span>{" "}
                  {country.capital?.[0] || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Region:</span>{" "}
                  {country.region}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Population:</span>{" "}
                  {country.population.toLocaleString("nl-NL")}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountryGrid;
