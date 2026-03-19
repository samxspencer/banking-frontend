import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 w-full z-50 transition-all duration-500
        ${scrolled 
          ? "bg-cream/95 shadow-md border-b border-brown/10" 
          : "bg-cream/80 backdrop-blur-md"}
      `}
    >
      <div className="max-w-7xl mx-auto px-12 py-6 flex justify-between items-center">

        {/* Brand */}
        <h1 className="text-lg tracking-widest font-semibold text-brown">
          Full-Stack{" "}
          <span className="text-burgundy">
            BankingCore
          </span>
        </h1>

        {/* Navigation */}
        <nav className="flex gap-12 text-sm tracking-widest text-brown">
          {["Home", "About", "Contact"].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="relative group"
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-burgundy transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}