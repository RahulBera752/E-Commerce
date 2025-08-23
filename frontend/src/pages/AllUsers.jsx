import React, { useEffect, useState } from "react";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";
import moment from "moment";
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from "../components/ChangeUserRole";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [updateUserDetails, setUpdateUserDetails] = useState({
    email: "",
    name: "",
    role: "",
    _id: "",
  });

  // ✅ Fetch all users
  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const fetchData = await fetch(SummaryApi.all_users.url, {
        method: SummaryApi.all_users.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const dataResponse = await fetchData.json();

      if (dataResponse.success) {
        setAllUsers(dataResponse.data);
      } else {
        toast.error(dataResponse.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error("Something went wrong while fetching users.");
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">All Users</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-black to-gray-800 text-white">
              <th className="px-4 py-3 text-left">Sr.</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Created Date</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {allUser.length > 0 ? (
              allUser.map((el, index) => (
                <tr
                  key={el._id}
                  className={`hover:bg-gray-100 transition ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{el?.name}</td>
                  <td className="px-4 py-3 text-gray-600">{el?.email}</td>
                  <td
                    className={`px-4 py-3 font-semibold ${
                      el?.role === "ADMIN"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {el?.role}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {moment(el?.createdAt).format("LL")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      className="p-2 rounded-full bg-blue-100 hover:bg-blue-500 hover:text-white transition"
                      onClick={() => {
                        setUpdateUserDetails(el);
                        setOpenUpdateRole(true);
                      }}
                    >
                      <MdModeEdit size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Update Role Modal */}
      {openUpdateRole && (
        <ChangeUserRole
          onClose={() => setOpenUpdateRole(false)}
          name={updateUserDetails.name}
          email={updateUserDetails.email}
          role={updateUserDetails.role}
          userId={updateUserDetails._id}
          callFunc={fetchAllUsers}
        />
      )}
    </div>
  );
};

export default AllUsers;
