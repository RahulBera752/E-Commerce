import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden">
      {/* Sidebar */}
      <aside className="bg-white min-h-full w-full max-w-60 customShadow">
        <div className="h-32 flex justify-center items-center flex-col">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full object-cover"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser />
            )}
          </div>
          <p className="capitalize text-lg font-semibold">{user?.name}</p>
          <p className="text-sm">{user?.role}</p>
        </div>

        {/* Navigation */}
        <div>
          <nav className="grid p-4 gap-2">
            <Link to="all-users" className="px-3 py-2 hover:bg-slate-100 rounded">
              All Users
            </Link>
            <Link to="all-products" className="px-3 py-2 hover:bg-slate-100 rounded">
              All Products
            </Link>
            <Link to="all-orders" className="px-3 py-2 hover:bg-slate-100 rounded">
              All Orders
            </Link>
            <Link to="order-analytics" className="px-3 py-2 hover:bg-slate-100 rounded">
              Order Analytics
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Panel Content */}
      <main className="w-full h-full p-2">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
