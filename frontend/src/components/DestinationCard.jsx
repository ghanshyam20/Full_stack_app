import { Link } from "react-router-dom";

export default function DestinationCard({ destination }) {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-[1.03] hover:shadow-xl"
    >
      <Link to={`/destinations/${destination.id}`}>
        <div className="overflow-hidden">
          <img
            src={`http://localhost:5000${destination.imageUrl}`}
            alt={destination.name}
            className="w-full h-48 object-cover transition duration-500 ease-in-out hover:scale-110"
          />
        </div>
      </Link>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{destination.name}</h3>
        <p className="text-gray-600 text-sm">{destination.description}</p>

        <p className="mt-2 text-green-600 font-bold">€{destination.price}</p>

        <Link
          to={`/book/${destination.id}`}
          className="mt-3 block text-center bg-green-600 text-white rounded-lg py-2 hover:bg-green-700 transition"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}
