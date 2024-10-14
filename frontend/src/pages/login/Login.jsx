import React from "react";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center  min-w-96">
      <div className="w-full p-6 rounded-lg bg-gray-300   backdrop-blur-lg  bg-opacity-0">
        <h1 className="font-semibold text-center text-gray-300 text-3xl">
          Login
          <span className="text-blue-500 ">Chat App</span>
        </h1>
        <form>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
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
          <a
            className="mt-2 text-blue-500"
            href="#"
          >{`Don't have an account`}</a>
          <div className="w-full">
            <button className="btn btn-black w-full btn-sm mt-2">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
