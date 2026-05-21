"use client";
import { useState } from "react";
import SearchBar from "./SearchBar";
import Link from "next/link";
import Magnet from "@/components/Magnet";
import ElectricBorder from "@/components/ElectricBorder";
import Aurora from "@/components/Aurora";
   import { Compass, Globe, MapPin, Search, Eye, Sparkles } from "lucide-react";


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

  const sorted = [...filtered].sort((a, b) =>
    sortOrder === "asc"
      ? a.name.common.localeCompare(b.name.common)
      : b.name.common.localeCompare(a.name.common),
  );

  const dark = darkMode;

  return (
    <div
      className={
        dark
          ? "bg-gray-900 text-white min-h-screen"
          : "bg-gray-100 text-black min-h-screen"
      }
    >
      <Aurora
        colors={["#6366f1", "#8b5cf6", "#06b6d4", "#10b981"]}
        speed={1}
        opacity={0.5}
      />
      {/* NAV */}
      {/* NAV */}
      <nav
        className={`sticky top-0 z-10 shadow-md px-4 py-3 ${dark ? "bg-gray-800" : "bg-white"}`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Title */}
          {/* ===== ATTRACTIVE TITLE SECTION ===== */}

          <div className="group relative flex items-center gap-2">
            <div className="relative">
              <Compass className="w-8 h-8 md:w-10 md:h-10 text-indigo-500 group-hover:rotate-12 transition-transform duration-500" />
              <span className="absolute inset-0 animate-ping bg-indigo-400 rounded-full opacity-20 group-hover:opacity-40"></span>
            </div>
            <h1 className="relative text-2xl md:text-3xl lg:text-4xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Country Explorer
              </span>
            </h1>
          </div>

          {/* SearchBar */}
          <div className="w-full md:w-auto md:flex-1 md:max-w-sm">
            <SearchBar search={search} onSearch={setSearch} />
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="bg-amber-200 border border-black text-black rounded px-3 py-1 text-sm"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? "A → Z" : "Z → A"}
            </button>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={`border p-1.5 rounded-lg text-sm ${
                dark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-amber-500 text-black"
              }`}
            >
              <option value="">All Continents</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`text-sm px-3 py-1 rounded border ${
                dark
                  ? "bg-gray-700 text-white border-gray-600"
                  : "bg-gray-100 text-black border-gray-300"
              }`}
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </nav>

      {/* GRID */}
      {/* GRID */}
      {/* GRID */}
      {/* GRID */}
      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 md:p-8">
        {sorted.map((country, index) => (
          <Magnet key={index} strength={30}>
            <ElectricBorder color="#6366f1">
              <Link
                href={`/country/${encodeURIComponent(country.name.common)}`}
              >
                <div
                  className={`rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer ${
                    dark ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <img
                    src={country.flags.png}
                    alt={country.flags.alt || country.name.common}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4">
                    <h2
                      className={`text-lg font-bold mb-2 ${
                        dark ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {country.name.common}
                    </h2>

                    <p
                      className={`text-sm ${
                        dark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <span className="font-semibold">Capital:</span>{" "}
                      {country.capital?.[0] || "N/A"}
                    </p>

                    <p
                      className={`text-sm ${
                        dark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <span className="font-semibold">Region:</span>{" "}
                      {country.region}
                    </p>

                    <p
                      className={`text-sm ${
                        dark ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      <span className="font-semibold">Population:</span>{" "}
                      {country.population.toLocaleString("nl-NL")}
                    </p>
                  </div>
                </div>
              </Link>
            </ElectricBorder>
          </Magnet>
        ))}
      </div>
    </div>
  );
};

export default CountryGrid;