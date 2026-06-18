import React, { useState } from "react";
// import GenCheckBox from "./GenCheckBox";
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
    setInputValues((prev) => ({ ...prev, gender: arg }));
  };

  const { loader, signup } = useSignup(inputValues);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputValues);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96">
      <div className="w-full overflow-hidden border shadow-2xl rounded-2xl bg-white/5 backdrop-blur-xl border-white/10">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center border-b border-white/10">
          <div className="flex items-center justify-center mx-auto mb-4 border w-14 h-14 rounded-2xl bg-blue-500/20 border-blue-400/30">
            <svg
              className="text-blue-400 w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create account
          </h1>
          <p className="mt-1 text-sm text-white/40">Join the chat today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8 py-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-wider uppercase text-white/60">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all"
                onChange={(e) =>
                  setInputValues({ ...inputValues, fullName: e.target.value })
                }
                value={inputValues.fullName}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-semibold tracking-wider uppercase text-white/60">
                Username
              </label>
              <input
                type="text"
                name="userName"
                placeholder="johndoe"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all"
                onChange={(e) =>
                  setInputValues({ ...inputValues, userName: e.target.value })
                }
                value={inputValues.userName}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold tracking-wider uppercase text-white/60">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all"
              onChange={(e) =>
                setInputValues({ ...inputValues, password: e.target.value })
              }
              value={inputValues.password}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-semibold tracking-wider uppercase text-white/60">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Repeat your password"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-blue-400/60 focus:bg-white/10 transition-all"
              onChange={(e) =>
                setInputValues({
                  ...inputValues,
                  confirmPassword: e.target.value,
                })
              }
              value={inputValues.confirmPassword}
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold tracking-wider uppercase text-white/60">
              Gender
            </label>
            <div className="flex gap-3">
              {["male", "female"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => handleGenderCheckBox(g)}
                  className={`flex-1 py-2 rounded-xl text-sm font-medium border transition-all capitalize ${
                    inputValues.gender === g
                      ? "bg-blue-500/20 border-blue-400/60 text-blue-300"
                      : "bg-white/5 border-white/10 text-white/40 hover:border-white/20"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loader}
            className="w-full mt-1 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 active:bg-blue-600 text-white font-semibold text-sm tracking-wide transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
          >
            {loader ? "Creating account..." : "Create Account"}
          </button>

          <p className="text-sm text-center text-white/40">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-medium text-blue-400 transition-colors hover:text-blue-300"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
