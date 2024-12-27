"use client";

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post("/api/signup", { name, email, password });
      router.push("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div
        className={`w-full max-w-md p-6 rounded-lg shadow-md ${
          isDarkMode
            ? "bg-gray-800 border border-gray-700"
            : "bg-white border border-gray-200"
        }`}
      >
        <h2
          className={`text-2xl font-bold text-center mb-6 ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Sign Up
        </h2>
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label
              className={`block mb-1 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label
              className={`block mb-1 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label
              className={`block mb-1 ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
              required
              placeholder="Create a password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className={`w-full py-2 rounded-lg transition-colors ${
              isDarkMode
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
          >
            Sign Up
          </button>
        </form>
        <p
          className={`mt-4 text-sm text-center ${
            isDarkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Already have an account?{" "}
          <a
            href="/login"
            className={`text-blue-500 hover:underline ${
              isDarkMode ? "text-blue-400" : "text-blue-500"
            }`}
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
