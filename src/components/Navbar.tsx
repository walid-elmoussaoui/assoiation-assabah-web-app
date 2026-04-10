import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "../lib/utils";
import Logo from "./Logo/Logo";

export default function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Accueil", path: "/" },
    { name: "Responsable", path: "/founder" },
    { name: "Activités", path: "/activities" },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              <Logo className="h-8 w-8 object-contain" />
            </div>
            <span className="font-bold text-lg sm:text-xl text-primary-900 hidden sm:block">
              Association Assabah
            </span>
            <span className="font-bold text-lg text-primary-900 sm:hidden">
              Assabah
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary-600",
                  location.pathname === link.path
                    ? "text-primary-700 font-semibold"
                    : "text-slate-600"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center">
            <Link
              to="/booking"
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-full text-sm lg:text-base font-medium transition-colors shadow-sm"
            >
              Prendre RDV
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Link
              to="/booking"
              className="bg-primary-600 hover:bg-primary-700 text-white px-3 py-1.5 rounded-full text-xs font-medium transition-colors shadow-sm"
            >
              RDV
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white">
            <nav className="py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium transition-colors hover:bg-primary-50 hover:text-primary-600",
                    location.pathname === link.path
                      ? "text-primary-700 bg-primary-50 border-r-4 border-primary-600"
                      : "text-slate-600"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
