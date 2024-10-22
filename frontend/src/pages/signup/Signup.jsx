import React, { useState } from "react";
import GenCheckBox from "./GenCheckBox";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputValues, setInputValues] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  const handleGenderCheckBox = (arg) => {
    setInputValues((prev) => ({
      ...prev,
      gender: arg,
    }));
  };

  const { loader, signup } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputValues);
  };

  return (
    <div className="flex flex-col items-center justify-center  min-w-96">
      <div className="w-full p-6 rounded-lg bg-gray-300   backdrop-blur-lg  bg-opacity-0">
        <h1 className="font-semibold text-center text-gray-300 text-3xl">
          Signup
          <span className="text-blue-500 ">Chat App</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">FullName</span>
            </label>
            <input
              type="text"
              name="fullName"
              onChange={(e) =>
                setInputValues({ ...inputValues, fullName: e.target.value })
              }
              value={inputValues.fullName}
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">UserName</span>
            </label>
            <input
              type="text"
              name="userName"
              className="w-full input input-bordered h-10"
              onChange={(e) =>
                setInputValues({ ...inputValues, userName: e.target.value })
              }
              value={inputValues.userName}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              className="w-full input input-bordered h-10"
              onChange={(e) =>
                setInputValues({ ...inputValues, password: e.target.value })
              }
              value={inputValues.password}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className="w-full input input-bordered h-10"
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  confirmPassword: e.target.value,
                })
              }
              value={inputValues.confirmPassword}
            />
          </div>
          <div className="flex">
            <GenCheckBox
              name="gender"
              handleGenderCheckBox={handleGenderCheckBox}
              value={inputValues.gender}
            />
          </div>
          <a
            className="mt-2 text-blue-500"
            href="/signin"
          >{`Already have an account`}</a>
          <div className="w-full">
            <button className="btn btn-black w-full btn-sm mt-2">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
