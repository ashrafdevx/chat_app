import React from "react";
import { IoIosLogOut } from "react-icons/io";
import { UseLogout } from "../../hooks/useLogout";

const Logout = () => {
  const { loading, logout } = UseLogout();
  return (
    <div className="mt-auto">
      <IoIosLogOut
        className="w-6 h-6 text-white cursor-pointer"
        onClick={logout}
      />
    </div>
  );
};

export default Logout;
