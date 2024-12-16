import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const UseLogout = () => {
  const { setAuthUser } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const result = await res.json();
      console.log(result);

      if (!res.ok || result.error) {
        throw new Error(result.error || "Failed to logout");
      }

      // Clear the local storage stored user data
      localStorage.removeItem("jwt");
      setAuthUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log("Logout error:", error);
      toast.error(error.message || "An error occurred during logout");
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
