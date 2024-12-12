import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const UseLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ userName, password }) => {
    setLoading(true);

    // Check validation
    const isValid = handleValidation(userName, password);
    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
        credentials: "include",
      });

      const result = await res.json();

      if (result.error) {
        throw new Error(result.message);
      }
      console.log("result", result);
      // Save user and show success message
      localStorage.setItem("jwt", JSON.stringify(result));
      setAuthUser(result);
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.message);
      console.log("useLogin Hook Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

// Validation function
const handleValidation = (user, password) => {
  if (!user || !password) {
    toast.error("All fields are required!");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password must be greater than 6 characters.");
    return false;
  }
  return true;
};
