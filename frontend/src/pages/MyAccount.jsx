import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

const MyAccount = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: "", email: "", phone: "" });
  const [addresses, setAddresses] = useState([]);
  const location = useLocation();

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const ures = await fetch(SummaryApi.current_user.url, {
        method: SummaryApi.current_user.method,
        credentials: "include",
        headers: authHeaders,
      });
      const ujson = await ures.json();
      if (ujson.success) {
        const d = ujson.data || ujson.user || {};
        setProfile({ name: d.name, email: d.email, phone: d.phone || "" });
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to load account data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Utility to highlight active link
  const navLinkClasses = (path) =>
    `px-5 py-3 border-b border-[#eee] transition-all duration-200 ${
      location.pathname === path
        ? "bg-[#FF0000]/10 text-[#FF0000] border-l-4 border-[#FF0000] font-semibold"
        : "hover:bg-[#FF0000]/10 hover:text-[#FF0000]"
    }`;

  return (
    <div className="flex max-w-6xl mx-auto mt-8 min-h-[80vh] bg-[#F5F5F5] rounded-xl overflow-hidden shadow-lg">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#ddd]">
        <div className="p-5 border-b border-[#ddd]">
          <h2 className="font-semibold text-black">Hello,</h2>
          <p className="font-bold text-[#FF0000]">{profile.name || "User"}</p>
        </div>

        <nav className="flex flex-col text-sm">
          <Link to="/my-orders" className={navLinkClasses("/my-orders")}>
            My Orders
          </Link>
          <div className="px-5 py-2 font-semibold text-[#777] uppercase text-xs bg-[#FAFAFA]">
            Account Settings
          </div>
          <Link to="/account" className={navLinkClasses("/account")}>
            Profile Information
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 bg-white p-8">
        {loading ? (
          <p className="text-[#555]">Loading…</p>
        ) : (
          <>
            {/* Profile Info */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-black border-b border-[#eee] pb-3 mb-5">
                Personal Information
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-[#555]">
                <div className="space-y-1 relative">
                  <span className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l"></span>
                  <div className="pl-3">
                    <p className="text-xs font-medium uppercase text-[#999]">
                      Name
                    </p>
                    <p className="p-3 border border-[#ddd] rounded-lg bg-[#FAFAFA] shadow-sm">
                      {profile.name || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 relative">
                  <span className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l"></span>
                  <div className="pl-3">
                    <p className="text-xs font-medium uppercase text-[#999]">
                      Email
                    </p>
                    <p className="p-3 border border-[#ddd] rounded-lg bg-[#FAFAFA] shadow-sm">
                      {profile.email || "-"}
                    </p>
                  </div>
                </div>
                <div className="space-y-1 relative">
                  <span className="absolute left-0 top-0 h-full w-1 bg-green-500 rounded-l"></span>
                  <div className="pl-3">
                    <p className="text-xs font-medium uppercase text-[#999]">
                      Mobile
                    </p>
                    <p className="p-3 border border-[#ddd] rounded-lg bg-[#FAFAFA] shadow-sm">
                      {profile.phone || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Addresses Section */}
            <section>
              <h2 className="text-xl font-semibold text-black border-b border-[#eee] pb-3 mb-5">
                Saved Addresses
              </h2>
              {addresses.length === 0 ? (
                <p className="text-[#555]">No addresses saved yet.</p>
              ) : (
                <div className="grid gap-4">
                  {addresses.map((a) => (
                    <div
                      key={a._id}
                      className="border border-[#ddd] rounded-lg p-4 bg-[#FAFAFA] shadow-sm hover:shadow-md transition-all duration-200"
                    >
                      <p className="font-medium text-black">
                        {a.label}{" "}
                        {a.isDefault && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-[#FF0000]/10 text-[#FF0000] rounded-full">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="text-[#555] mt-1">
                        {a.line1}, {a.city}, {a.state} - {a.pin}
                      </p>
                      {a.phone && (
                        <p className="text-[#555] mt-1">Phone: {a.phone}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default MyAccount;
