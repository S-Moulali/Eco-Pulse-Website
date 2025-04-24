import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Moon, Menu, X, Map, AlertTriangle, Home, Leaf, User } from 'lucide-react';

// Replace with toast lib you use or remove if not implemented
// import { useToast } from '../hooks/use-toast'; 

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Example: you can implement toast another way if needed
  const toast = ({ title, description }) => {
    alert(`${title}\n${description}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNotificationsClick = () => {
    toast({
      title: "No new notifications",
      description: "You're all caught up!",
    });
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Leaf className="h-8 w-8 text-green-700" />
            <span className="ml-2 font-semibold text-lg">EcoAlert</span>
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="flex items-center text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              <Home className="h-4 w-4 mr-1" /> Home
            </Link>
            <Link to="/report" className="flex items-center text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              <AlertTriangle className="h-4 w-4 mr-1" /> Report
            </Link>
            <Link to="/map" className="flex items-center text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              <Map className="h-4 w-4 mr-1" /> Map
            </Link>
            <Link to="/tips" className="flex items-center text-gray-800 hover:text-green-600 px-3 py-2 text-sm font-medium">
              <Leaf className="h-4 w-4 mr-1" /> Tips
            </Link>

            <button onClick={toggleDarkMode} className="ml-2 p-2 rounded hover:bg-gray-100">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button onClick={handleNotificationsClick} className="p-2 rounded hover:bg-gray-100">
              <User className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button onClick={toggleDarkMode} className="mr-2 p-2 rounded hover:bg-gray-100">
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={toggleMenu} className="p-2 rounded hover:bg-gray-100">
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {[
              { to: "/", icon: <Home className="h-5 w-5 mr-2" />, label: "Home" },
              { to: "/report", icon: <AlertTriangle className="h-5 w-5 mr-2" />, label: "Report" },
              { to: "/map", icon: <Map className="h-5 w-5 mr-2" />, label: "Map" },
              { to: "/tips", icon: <Leaf className="h-5 w-5 mr-2" />, label: "Tips" }
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.to}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 hover:text-green-600"
              >
                <div className="flex items-center">{item.icon}<span>{item.label}</span></div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
