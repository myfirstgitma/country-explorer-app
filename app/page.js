import CountryGrid from "./components/CountryGrid";
const getCountries = async () => {
  const res = await fetch(
    "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital",
  );
  return res.json();
};

const Home = async () => {
  const countries = await getCountries();

  return (
    <main className="min-h-screen bg-gray-100">
      <CountryGrid countries={countries} />
    </main>
  );
};

export default Home;
