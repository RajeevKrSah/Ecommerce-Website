import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  signupRequest,
  signupSuccess,
  signupFailure,
} from "../features/auth/signupSlice";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    fullName:"",
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, error } = useSelector((state) => state.signup);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({ ...signupInfo, [name]: value });
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, username, email, password } = signupInfo;

    if (!fullName || !username || !email || !password) {
      return dispatch(signupFailure("All fields are required."));
    }

    if (!validateEmail(email)) {
      return dispatch(signupFailure("Invalid email format."));
    }

    if (!validatePassword(password)) {
      return dispatch(
        signupFailure("Password must be at least 6 characters long.")
      );
    }

    dispatch(signupRequest());

    try {
      const response = await axios.post("/api/auth/signup", {
        fullName,
        username,
        email,
        password,
      });

      const { success, message, id } = response.data;

      if (success) {
        dispatch(signupSuccess({ id, username, email }));
        alert("Account created successfully! Redirecting to login page...");
        setSignupInfo({ fullName: "", username: "", email: "", password: "" });
        setTimeout(() => navigate("/login"), 1000);
      } else {
        dispatch(signupFailure(message || "Signup failed. Please try again."));
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "An error occurred. Please try again.";
      dispatch(signupFailure(errorMsg));
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-md space-y-6 bg-slate-200 p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full Name
            </label>
            <div className="mt-1">
              <input
                id="fullName"
                name="fullName"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={signupInfo.fullName}
                aria-required="true"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              User Name
            </label>
            <div className="mt-1">
              <input
                id="username"
                name="username"
                type="text"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={signupInfo.username}
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={signupInfo.email}
                aria-required="true"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                onChange={handleChange}
                value={signupInfo.password}
                aria-required="true"
              />
            </div>
          </div>

          {/* Display error message from Redux */}
          {error && (
            <div className="flex items-center">
              <div className="text-sm text-red-600">{error}</div>
            </div>
          )}

          {/* Display loading state */}
          {isLoading && (
            <div className="flex items-center justify-center text-sm text-gray-600">
              Signing up...
            </div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={isLoading}
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center">
          <p className="mt-5 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
