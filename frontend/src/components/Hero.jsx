export default function Hero() {
  return (
    <div className="relative h-[60vh] bg-cover bg-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?travel')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white">
        <h1 className="text-5xl font-bold mb-4">Explore The World</h1>
        <p className="text-xl max-w-xl text-center">
          Discover amazing places, book your trips, and enjoy unforgettable experiences.
        </p>
      </div>
    </div>
  );
}
