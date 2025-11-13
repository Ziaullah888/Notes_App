import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-amber-400 flex justify-between items-center p-4 shadow-md">
      <Link
        to="/"
        className="text-2xl font-bold text-black/90 hover:text-black"
      >
        Notes App
      </Link>
      <div className="space-x-6 flex items-center">
        <Link
          to="/"
          className="font-semibold text-black/80 hover:text-black hover:scale-105 transition-transform duration-200"
        >
          Home
        </Link>
        <Link
          to="/add"
          className="font-semibold text-black/80 hover:text-black hover:scale-105 transition-transform duration-200"
        >
          Add Note
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
