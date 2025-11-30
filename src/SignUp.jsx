import React from "react";
import logo from "./logo.jpg"; // اللوغو ديالك

export default function SignUp() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} className="h-16 w-16 rounded-full mb-2" alt="Logo" />
          <h2 className="text-2xl font-bold text-gray-800">Create your account</h2>
        </div>

        <form className="space-y-5">
          
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Full name */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Full name
            </label>
            <input
              type="text"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              autoComplete="new-password"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Country
            </label>
            <select className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500">
              <option>Morocco</option>
              <option>USA</option>
              <option>Canada</option>
              <option>France</option>
            </select>
          </div>

          {/* Checkbox */}
          <div className="flex items-center gap-2">
            <input type="checkbox" />
            <span className="text-sm text-gray-700">
              Get emails about product updates.
            </span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create account
          </button>

          {/* Already have account */}
          <p className="text-center text-gray-600 mt-4 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
            </a>
          </p>

        </form>

      </div>
    </div>
  );
}
