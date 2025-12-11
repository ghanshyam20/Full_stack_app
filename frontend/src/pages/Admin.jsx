import { Link } from "react-router-dom";

export default function Admin() {
  return (
    <div className="p-10 max-w-5xl mx-auto">

      {/* PAGE TITLE */}
      <h1 className="text-4xl font-bold text-center mb-10">
        Admin Control Panel
      </h1>

      {/* GRID CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">

        {/* MANAGE DESTINATIONS */}
        <Link
          to="/admin/destinations"
          className="p-8 bg-blue-600 text-white rounded-2xl shadow-lg hover:bg-blue-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center"
        >
          <h2 className="text-2xl font-bold">Destinations</h2>
          <p className="opacity-80 mt-2">Add / Edit / Delete Trips</p>
        </Link>

        {/* MANAGE USERS */}
        <Link
          to="/admin/users"
          className="p-8 bg-green-600 text-white rounded-2xl shadow-lg hover:bg-green-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center"
        >
          <h2 className="text-2xl font-bold">Users</h2>
          <p className="opacity-80 mt-2">View & Manage All Users</p>
        </Link>

        {/* MANAGE BOOKINGS */}
        <Link
          to="/admin/bookings"
          className="p-8 bg-purple-600 text-white rounded-2xl shadow-lg hover:bg-purple-700 hover:shadow-xl transition transform hover:-translate-y-1 text-center"
        >
          <h2 className="text-2xl font-bold">Bookings</h2>
          <p className="opacity-80 mt-2">View / Delete Bookings</p>
        </Link>
      </div>
    </div>
  );
}
