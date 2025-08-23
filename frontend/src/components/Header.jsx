import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import { GrSearch } from 'react-icons/gr';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaShoppingCart } from 'react-icons/fa';
import { MdAdminPanelSettings } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import { setCartCount } from '../store/cartSlice';
import { SummaryApi } from '../common';

const Header = () => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const user = useSelector((state) => state.user.user);
  const cartCount = useSelector((state) => state.cart.cartCount);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      if (!token) return;
      try {
        const res = await fetch(SummaryApi.current_user.url, {
          method: SummaryApi.current_user.method,
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data.success) dispatch(setUserDetails(data.data));
        else {
          dispatch(setUserDetails(null));
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        dispatch(setUserDetails(null));
        localStorage.removeItem('token');
      }
    };
    fetchUser();
  }, [dispatch, token]);

  // Fetch cart count on mount or when user changes
  useEffect(() => {
    const fetchCart = async () => {
      if (!token || !user) return;
      try {
        const res = await fetch(SummaryApi.addToCartProductCount.url, {
          method: SummaryApi.addToCartProductCount.method,
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        });
        const data = await res.json();
        if (data.success) dispatch(setCartCount(data.data?.count || 0));
        else dispatch(setCartCount(0));
      } catch (err) {
        console.error('Error fetching cart count:', err);
        dispatch(setCartCount(0));
      }
    };
    fetchCart();
  }, [dispatch, token, user]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUserDetails(null));
    dispatch(setCartCount(0));
    navigate('/login');
  };

  // Search suggestions
  useEffect(() => {
    if (!search.trim()) return setSuggestions([]);

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(
          `${SummaryApi.searchProduct.url}?query=${encodeURIComponent(search)}`
        );
        const data = await res.json();
        if (data.success) setSuggestions(data.data.slice(0, 5));
      } catch (err) {
        console.error('Suggestion fetch failed', err);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const handleSearchSubmit = () => {
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`);
      setSuggestions([]);
      setSearch(''); // ✅ clear input after search
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearchSubmit();
  };

  const handleSuggestionClick = (text) => {
    navigate(`/search?query=${encodeURIComponent(text)}`);
    setSearch(''); // ✅ clear input after selecting suggestion
    setSuggestions([]);
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between relative">
        {/* Logo */}
        <div className="-ml-10 flex-shrink-0">
          <Link to="/">
            <Logo w={150} h={90} />
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

          {suggestions.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-white border rounded shadow z-40">
              {suggestions.map((item, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    handleSuggestionClick(item.productName || item.category || item.brandName)
                  }
                >
                  {item.productName || item.category || item.brandName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Icons / User / Cart */}
        <div className="flex items-center gap-5">
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
              <FaRegCircleUser className="cursor-pointer text-2xl" />
            </Link>
          )}

          {user?.role === 'ADMIN' && (
            <Link
              to="/admin-panel"
              title="Admin Panel"
              className="text-2xl hover:text-red-600 transition"
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
    </header>
  );
};

export default Header;
