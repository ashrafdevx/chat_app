import React, { useState } from "react";
import { UseLogin } from "../../hooks/useLogin";

const Login = () => {
  const [userName, setuserName] = useState("");
  const [password, setuserPassword] = useState("");
  const { loading, login } = UseLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ userName, password });
  };

  return (
    <div className="flex flex-col items-center justify-center  min-w-96">
      <div className="w-full p-6 rounded-lg bg-gray-300   backdrop-blur-lg  bg-opacity-0">
        <h1 className="font-semibold text-center text-gray-300 text-3xl">
          Login
          <span className="text-blue-500 ">Chat App</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              className="w-full input input-bordered h-10"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              className="w-full input input-bordered h-10"
              value={password}
              onChange={(e) => setuserPassword(e.target.value)}
            />
          </div>
          <a
            className="mt-2 text-blue-500"
            href="/signup"
          >{`Don't have an account`}</a>
          <div className="w-full">
            <button className="btn btn-black w-full btn-sm mt-2" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
