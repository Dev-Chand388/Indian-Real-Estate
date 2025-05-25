import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?location=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-[#B22222] to-[#8B0000] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Home className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">GharDekho</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search by location..."
                className="px-4 py-2 rounded-full text-gray-800 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <Search className="h-5 w-5 text-gray-500" />
              </button>
            </form>
            
            <Link to="/properties" className="hover:text-gray-200">Properties</Link>
            
            {isAuthenticated ? (
              <>
                <div className="relative group">
                  <button className="flex items-center hover:text-gray-200">
                    <span className="mr-1">{user?.name}</span>
                    <User className="h-5 w-5" />
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    <Link 
                      to="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      to="/saved-properties" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Saved Properties
                    </Link>
                    <Link 
                      to="/add-property" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Add Property
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 rounded-md bg-[#DAA520] hover:bg-[#B8860B] text-white"
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="px-4 py-2 rounded-md border border-white hover:bg-white hover:text-[#B22222]"
                >
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:text-white hover:bg-[#8B0000] focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearch} className="mb-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by location..."
                  className="w-full px-4 py-2 rounded-full text-gray-800"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </form>
            
            <Link 
              to="/properties" 
              className="block px-3 py-2 rounded-md hover:bg-[#8B0000]"
              onClick={() => setIsMenuOpen(false)}
            >
              Properties
            </Link>
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 rounded-md hover:bg-[#8B0000]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/saved-properties" 
                  className="block px-3 py-2 rounded-md hover:bg-[#8B0000]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Saved Properties
                </Link>
                <Link 
                  to="/add-property" 
                  className="block px-3 py-2 rounded-md hover:bg-[#8B0000]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Property
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center w-full text-left px-3 py-2 rounded-md hover:bg-[#8B0000]"
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md bg-[#DAA520] hover:bg-[#B8860B] text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md border border-white hover:bg-white hover:text-[#B22222]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;