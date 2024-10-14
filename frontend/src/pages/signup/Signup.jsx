import React from "react";
import GenCheckBox from "./GenCheckBox";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-w-96">
      <div className="w-full p-6 rounded-lg bg-gray-300   backdrop-blur-lg  bg-opacity-0">
        <h1 className="font-semibold text-center text-gray-300 text-3xl">
          Signup
          <span className="text-blue-500 ">Chat App</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">FullName</span>
            </label>
            <input type="text" className="w-full input input-bordered h-10" />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">UserName</span>
            </label>
            <input type="text" className="w-full input input-bordered h-10" />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
            />
          </div>
          <div className="flex">
            <GenCheckBox />
          </div>
          <a
            className="mt-2 text-blue-500"
            href="#"
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
