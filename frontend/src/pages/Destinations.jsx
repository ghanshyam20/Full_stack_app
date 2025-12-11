import { useEffect, useState } from "react";
import destinationsAPI from "../api/destinationsAPI";

import DestinationCard from "../components/DestinationCard";

export default function Destinations() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await destinationsAPI.getAll();
        setList(data);
      } catch (err) {
        console.error("Error loading destinations:", err);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh] text-xl font-semibold">
        Loading destinations...
      </div>
    );
  }

  return (
    <div className="pt-10 pb-20 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center">
        All Destinations
      </h2>

      {list.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          No destinations available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {list.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      )}
    </div>
  );
}
