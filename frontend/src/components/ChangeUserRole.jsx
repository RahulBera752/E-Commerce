import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import { SummaryApi } from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
  };

  const updateUserRole = async () => {
    try {
      const token = localStorage.getItem("token");

      const fetchResponse = await fetch(SummaryApi.change_user_role.url, {
        method: SummaryApi.change_user_role.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          role: userRole,
        }),
      });

      const responseData = await fetchResponse.json();

      if (responseData.success) {
        toast.success(responseData.message);
        onClose();
        callFunc();
      } else {
        toast.error(responseData.message || "Failed to update user role");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
      toast.error("Something went wrong while updating role");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm rounded-md">
        <button className="block ml-auto" onClick={onClose}>
          <IoMdClose size={22} />
        </button>

        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>

        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>

        <div className="flex items-center justify-between my-4">
          <p>Role:</p>
          <select
            className="border px-4 py-1 rounded"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-fit mx-auto block py-1 px-4 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
