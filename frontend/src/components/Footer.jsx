export default function Footer() {
  return (
    <footer className="bg-[#0f1629] text-white py-10 mt-12">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">

        {/* LOGO + DESCRIPTION */}
        <div>
          <h2 className="text-2xl font-bold mb-2">TravelX</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            Discover beautiful destinations, plan your next dream trip, and explore the world with one click.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:text-white transition"><a href="/">Home</a></li>
            <li className="hover:text-white transition"><a href="/destinations">Destinations</a></li>
            <li className="hover:text-white transition"><a href="/my-bookings">My Bookings</a></li>
            <li className="hover:text-white transition"><a href="/login">Login</a></li>
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-5 text-2xl">
            <a href="#" className="hover:text-blue-400 transition"><i className="fab fa-facebook"></i></a>
            <a href="#" className="hover:text-blue-400 transition"><i className="fab fa-twitter"></i></a>
            <a href="#" className="hover:text-blue-400 transition"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

      </div>

      <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Ghan Shyam Bhattarai — All rights reserved.
      </div>
    </footer>
  );
}
