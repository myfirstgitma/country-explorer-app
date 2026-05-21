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

      <nav
        className={`sticky top-0 z-10 shadow-md px-4 py-3 backdrop-blur-md border-b ${
          dark
            ? "bg-gray-900/70 border-gray-700/50"
            : "bg-white/60 border-indigo-100/50"
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Title */}
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
            {/* Sort button */}
            <button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                dark
                  ? "bg-indigo-600/30 border-indigo-500/50 text-indigo-300 hover:bg-indigo-600/50"
                  : "bg-indigo-50 border-indigo-300 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {sortOrder === "asc" ? "A → Z" : "Z → A"}
            </button>

            {/* Region select */}
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 cursor-pointer outline-none ${
                dark
                  ? "bg-purple-600/30 border-purple-500/50 text-purple-300 hover:bg-purple-600/50"
                  : "bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100"
              }`}
            >
              <option value="">All Continents</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
            </select>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 ${
                dark
                  ? "bg-amber-500/20 border-amber-400/50 text-amber-300 hover:bg-amber-500/30"
                  : "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
              }`}
            >
              {dark ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>
        </div>
      </nav>

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
