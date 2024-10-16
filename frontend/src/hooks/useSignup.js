import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loader, setLoader] = useState(false);

  const signup = async ({
    fullName,
    userName,
    password,
    confirmPassword,
    gender,
  }) => {
    // Validate input fields
    const success = handleCheckValidation({
      fullName,
      userName,
      password,
      confirmPassword,
      gender,
    });
    if (!success) {
      return;
    }

    setLoader(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmPassword,
          gender,
        }),
      });

      // Check response
      if (!res.ok) {
        const errorText = await res.text(); // Parse as text since it's not valid JSON
        throw new Error(`Server Error: ${res.status} ${errorText}`);
      }
      const result = await res.json();
      console.log("response", result);
      toast.success("Registered Successfully!!!");
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
