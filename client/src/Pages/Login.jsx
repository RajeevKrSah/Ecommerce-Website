import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const APIUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginInfo;
    try {
      const response = await fetch(`${APIUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      const { success, message, accessToken, id, name } = result;
      if (success) {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId", id);
        localStorage.setItem("loggedInUser", name);

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
      alert(message);

      if (success) {
        setLoginInfo({
          email: "",
          password: "",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Log in to your account
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
               className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-1">
            <input
              id="email"
              type="email"
              name="email"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={loginInfo.email}
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
            <div className="mt-1">
            <input
              id="password"
              type="password"
              name="password"
              className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              onChange={handleChange}
              value={loginInfo.password}
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
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Log in
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
