import React from "react";
import Link from "next/link";
import AiChat from "@/components/AiChat";
import SplitText from "@/components/SplitText";
import Aurora from "@/components/Aurora";

const Page = async ({ params }) => {
  const { name } = await params;

  const res = await fetch(`https://restcountries.com/v3.1/name/${name}`);
  const data = await res.json();
  const country = data[0];

  // get languages and currencies safely
  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(", ")
    : "N/A";

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Aurora
        colors={["#10b981", "#06b6d4", "#6366f1", "#8b5cf6"]}
        speed={1}
        opacity={0.5}
      />
      {/* Back button */}
      <Link href="/">
        <button className="mb-8 px-5 py-2 bg-white shadow-md rounded-lg hover:bg-gray-200 transition font-semibold text-gray-700">
          ← Back
        </button>
      </Link>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Flag */}
        <img
          src={country.flags.png}
          alt={country.name.common}
          className="w-full h-72 object-cover"
        />

        <div className="p-8">
          {/* Country name */}
          {/* Country name */}
          <SplitText
            text={country.name.common}
            className="text-4xl font-bold text-gray-800 mb-6"
          />

          {/* Info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
            <p>
              <span className="font-semibold text-gray-800">Capital:</span>{" "}
              {country.capital?.[0] || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Region:</span>{" "}
              {country.region}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Subregion:</span>{" "}
              {country.subregion || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Population:</span>{" "}
              {country.population.toLocaleString("nl-NL")}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Languages:</span>{" "}
              {languages}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Currencies:</span>{" "}
              {currencies}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Timezone:</span>{" "}
              {country.timezones?.[0] || "N/A"}
            </p>
            <p>
              <span className="font-semibold text-gray-800">Country Code:</span>{" "}
              {country.cca2}
            </p>
          </div>
          <AiChat />
        </div>
      </div>
    </div>
  );
};

export default Page;
