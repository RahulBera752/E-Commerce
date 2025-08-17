import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { SummaryApi } from '../common';

const Header = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const user = useSelector((state) => state.user.user);
  const cartCount = useSelector((state) => state.cart.cartCount);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!search.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `${SummaryApi.searchProduct.url}?query=${encodeURIComponent(search)}`,
          { credentials: 'include' }
        );
        const data = await res.json();
        if (data.success) {
          setSuggestions(data.data.slice(0, 5)); // Limit to 5 suggestions
        }
      } catch (error) {
        console.error("Suggestion fetch failed", error);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [search]);

  const handleSearchSubmit = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSuggestions([]); // clear suggestions after search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/api/user/userLogout', {
        method: 'GET',
        credentials: 'include',
      });
      dispatch(setUserDetails(null));
      navigate('/login');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const handleSuggestionClick = (text) => {
    navigate(`/search?query=${encodeURIComponent(text)}`);
    setSearch(text);
    setSuggestions([]);
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between relative">
        {/* Logo */}
        <div>
          <Link to="/">
            <Logo w={90} h={50} />
          </Link>
        </div>

        {/* Search Bar */}
        <div className="relative hidden lg:flex items-center w-full max-w-sm">
          <div className="flex items-center w-full border rounded-full focus-within:shadow pl-2 relative bg-white z-50">
            <input
              type="text"
              placeholder="Search product here..."
              className="w-full outline-none"
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              value={search}
            />
            <div
              className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white cursor-pointer"
              onClick={handleSearchSubmit}
            >
              <GrSearch />
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-40">
              {suggestions.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleSuggestionClick(
                      item.productName || item.category || item.brandName
                    )
                  }
                >
                  {item.productName || item.category || item.brandName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icons and Buttons */}
        <div className="flex items-center gap-5">
          {/* User Avatar / About Me */}
          <div className="relative flex justify-center text-2xl">
            {user?.profilePic ? (
              <Link to="/account" title="My Account">
                <img
                  src={user.profilePic}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                />
              </Link>
            ) : (
              <Link to="/account" title="My Account">
                <FaRegCircleUser className="cursor-pointer" />
              </Link>
            )}
          </div>

          {/* Admin Panel Icon */}
          {user?.role === "ADMIN" && (
            <Link
              to="/admin-panel"
              className="text-2xl hover:text-red-600 transition"
              title="Admin Panel"
            >
              <MdAdminPanelSettings />
            </Link>
          )}

          {/* Cart Icon */}
          {user && (
            <Link to="/cart" className="text-2xl relative" title="Go to Cart">
              <FaShoppingCart />
              {cartCount > 0 && (
                <div className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-2 text-xs">
                  {cartCount}
                </div>
              )}
            </Link>
          )}

          {/* Login / Logout */}
          <div>
            {user ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
