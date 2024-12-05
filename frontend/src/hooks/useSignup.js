import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loader, setLoader] = useState(false);
  const { setAuthUser } = useAuthContext();
  console.log("AuthContext Values:", setAuthUser);
  const signup = async (arg) => {
    // Validate input fields
    const success = handleCheckValidation(arg);
    if (!success) {
      return;
    }

    setLoader(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
      });
      // Check response
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server Response:", errorText);
        throw new Error(`Server Error: ${res.status} ${errorText}`);
      }

      const result = await res.json();
      console.log("response", result);
      setAuthUser(result);
      localStorage.setItem("jwt", JSON.stringify(result));
      toast.success("Registered Successfully!!!");
      return result;
    } catch (error) {
      toast.error(error.message);

      console.log("SignUp Error", error.message);
    } finally {
      setLoader(false);
    }
  };

  return { loader, signup };
};

export default useSignup;

const handleCheckValidation = ({
  fullName,
  userName,
  password,
  confirmPassword,
}) => {
  if (!fullName || !userName || !password || !confirmPassword) {
    toast.error("All field are required");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Both password should be samed!");
  }

  if (password?.length < 6) {
    toast.error("Password should Greater then 6 character");
  }
  return true;
};
