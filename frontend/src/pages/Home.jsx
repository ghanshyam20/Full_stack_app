import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import destinationsAPI from "../api/destinationsAPI";
import DestinationCard from "../components/DestinationCard";

export default function Home() {
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH STATES
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const loadPopular = async () => {
    try {
      const data = await destinationsAPI.getAll();
      setPopular(data.slice(0, 6));
    } catch (err) {
      console.error("Unable to load popular destinations", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔍 SEARCH API CALL
  const handleSearch = async (value) => {
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/destinations/search?q=${value}`
      );
      const data = await res.json();
      setResults(data);
      setShowResults(true);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  useEffect(() => {
    loadPopular();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-blue-400 text-white text-center shadow-lg">
        <h1 className="text-5xl font-extrabold drop-shadow-lg">
          Find Your Next Dream Destination
        </h1>

        <p className="mt-3 text-lg opacity-90">
          Explore beautiful places around the world with just one click.
        </p>

        {/* Search Box */}
        <div className="mt-8 flex justify-center relative">
          <input
            type="text"
            placeholder="Search destinations..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="p-4 w-96 rounded-xl shadow-lg text-black border border-gray-300 focus:ring-2 focus:ring-blue-300 focus:outline-none"
          />

          {/* 🔽 SEARCH DROPDOWN */}
          {showResults && (
            <div className="absolute top-16 w-96 bg-white text-black shadow-xl rounded-xl max-h-72 overflow-y-auto z-20 border border-gray-200 animate-fadeIn">
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.id}
                    to={`/destinations/${item.id}`}
                    className="block px-4 py-3 hover:bg-gray-100 transition border-b last:border-none"
                    onClick={() => setShowResults(false)}
                  >
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-600">{item.category}</p>
                  </Link>
                ))
              ) : (
                <p className="px-4 py-3 text-gray-600">No results found.</p>
              )}
            </div>
          )}
        </div>
      </section>


      {/* ---------------- CATEGORIES ---------------- */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-10">Explore by Category</h2>

        <div className="flex justify-center gap-8 flex-wrap">
          {[
            { name: "Europe", icon: "✈️" },
            { name: "Beaches", icon: "🏖️" },
            { name: "Adventure", icon: "⛰️" },
            { name: "Asia", icon: "🏯" },
          ].map((cat, idx) => (
            <div
              key={idx}
              className="cursor-pointer bg-white px-10 py-6 rounded-2xl shadow-md 
                         hover:shadow-xl hover:-translate-y-1 transition-all transform"
            >
              <span className="text-3xl">{cat.icon}</span>
              <p className="font-semibold mt-2 text-gray-800">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>


      {/* ---------------- POPULAR DESTINATIONS ---------------- */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : popular.length === 0 ? (
          <p className="text-gray-600">No destinations available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-6">
            {popular.map((d) => (
              <DestinationCard key={d.id} destination={d} />
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
