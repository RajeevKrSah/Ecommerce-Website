import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
} from "../features/auth/loginSlice";
import axios from "axios";
const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.login);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;

    if (!email || !password) {
      dispatch(loginFailure("All fields are required."));
      return;
    }
    if (!validateEmail(email)) {
      return dispatch(loginFailure("Invalid email format."));
    }

    if (!validatePassword(password)) {
      return dispatch(
        loginFailure("Password must be at least 6 characters long.")
      );
    }

    dispatch(loginRequest());

    try {
      const response = await axios.post("/api/auth/login", { email, password });
      const result = response.data;
      const { success, message, accessToken, id, name } = result;

      if (success) {
        // Save user data in localStorage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", id);
        localStorage.setItem("loggedInUser", name);

        dispatch(loginSuccess({ id, name }));
        alert("Login successful!");
        navigate("/");
      } else {
        dispatch(loginFailure(message || "Login failed. Please try again."));
      }
    } catch (error) {
      dispatch(loginFailure("An error occurred. Please try again."));
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-8">
      <div className="w-full max-w-sm space-y-6 bg-slate-200 p-6 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold leading-9 tracking-tight text-gray-900 ">
            Log in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
            >
              Email address
            </label>
            <div className="mt-0.5">
              <input
                id="email"
                type="email"
                name="email"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm"
                onChange={handleChange}
                value={loginInfo.email}
                autoComplete="email"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="mt-0.5">
              <input
                id="password"
                type="password"
                name="password"
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400 sm:text-sm"
                onChange={handleChange}
                value={loginInfo.password}
                autoComplete="new-password"
              />
            </div>
            <div className="mt-2 flex justify-end">
              <Link
                to=""
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </Link>
            </div>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full rounded-md bg-indigo-600 px-4 py-2 text-white shadow-lg hover:bg-indigo-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? "Logging in..." : "Log in"}
            </button>
          </div>
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Signup Now
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
