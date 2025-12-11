import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import destinationsAPI from "../api/destinationsAPI";


export default function DestinationDetails() {
  const { id } = useParams();
  const [dest, setDest] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        const data = await destinationsAPI.getById(id);
        if (!data) {
          setError(true);
        } else {
          setDest(data);
        }
      } catch (err) {
        console.error("Error loading destination:", err);
        setError(true);
      }
    };

    fetchDestination();
  }, [id]);

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-xl">
        Destination not found.
      </div>
    );
  }

  if (!dest) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/destinations" className="underline text-blue-500">
        ← Back
      </Link>

      {/* IMPORTANT FIX → USE imageUrl NOT image */}
      <img
        src={`http://localhost:5000${dest.imageUrl}`}
        className="w-full h-[380px] object-cover rounded-xl mt-4 shadow-md"
        alt={dest.name}
      />

      <h1 className="text-4xl font-bold mt-6">{dest.name}</h1>
      <p className="mt-3 text-gray-700">{dest.description}</p>

      <p className="mt-6 text-2xl font-semibold text-green-600">€{dest.price}</p>

      <Link
        to={`/book/${dest.id}`}
        className="mt-8 inline-block bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-lg"
      >
        Book Now
      </Link>
    </div>
  );
}
