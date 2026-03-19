import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 p-4 flex gap-6 text-white">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
    </nav>
  );
}