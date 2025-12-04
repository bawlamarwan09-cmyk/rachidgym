import React, { useState } from "react";
import api from "./api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append("email", email);
      form.append("password", password);

      const res = await api.post("/login.php", form); // ✔ FormData

      if (!res.data.success) {
        alert(res.data.message);
        setLoading(false);
        return;
      }

      localStorage.setItem("role", res.data.role);
      localStorage.setItem("fullname", res.data.fullname);

      if (res.data.role === "caisier") {
        localStorage.setItem("caisierCin", res.data.cin);
        window.location.href = "/caisier";
        return;
      }

      if (res.data.role === "coach") {
        localStorage.setItem("coachCin", res.data.coach_cin);
        window.location.href = "/coach-absence";
        return;
      }

      if (res.data.role === "admin") {
        window.location.href = "/";
        return;
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* ----------------------- RIGHT SIDE (LOGO SIDE) ----------------------- */}
      <div
        className="
          hidden md:flex w-1/2 items-center justify-center 
          bg-gradient-to-br from-yellow-300 to-yellow-500
          relative overflow-hidden
        "
      >

        {/* Floating Glow Circle */}
        <div className="absolute w-80 h-80 bg-yellow-200 rounded-full blur-3xl opacity-40 animate-pulse"></div>

        {/* Floating Logo */}
        <img
          src="https://ik.imagekit.io/latsqiyxk/logo.jpg"
          alt="logo"
          className="
            h-72 w-72 rounded-full shadow-2xl border-8 border-white
            animate-[float_4s_ease-in-out_infinite]
          "
        />

        <h1 className="absolute bottom-16 text-4xl font-extrabold text-black drop-shadow-lg">
          Rachid Gym
        </h1>

        {/* FLOAT ANIMATION */}
        <style>
          {`
            @keyframes float {
              0% { transform: translateY(0px); }
              50% { transform: translateY(-20px); }
              100% { transform: translateY(0px); }
            }
          `}
        </style>
      </div>

      {/* -------------------- LEFT SIDE — LOGIN FORM ---------------------- */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">

        <div
          className="
            w-full max-w-md bg-white shadow-2xl rounded-xl 
            border border-yellow-400 p-10
            transform animate-[slideUp_0.8s_ease-out]
          "
        >
          {/* Mobile logo */}
          <div className="md:hidden flex justify-center mb-6">
            <img
              src="https://ik.imagekit.io/latsqiyxk/logo.jpg"
              className="h-24 w-24 rounded-full border-4 border-yellow-500 animate-pulse"
              alt="logo"
            />
          </div>

          <h2 className="text-3xl font-bold text-center mb-6 text-black">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="font-semibold text-black">CIN / Email</label>
              <input
                type="text"
                className="
                  w-full p-3 border rounded-lg bg-white shadow-sm 
                  border-yellow-500 focus:ring-2 focus:ring-yellow-600
                "
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="font-semibold text-black">Password</label>
              <input
                type="password"
                className="
                  w-full p-3 border rounded-lg bg-white shadow-sm 
                  border-yellow-500 focus:ring-2 focus:ring-yellow-600
                "
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="
                w-full py-3 bg-yellow-500 text-black font-bold rounded-lg 
                shadow-md hover:bg-yellow-600 hover:shadow-xl hover:scale-[1.03]
                transition-all duration-200
              "
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>

        {/* SLIDE UP ANIMATION */}
        <style>
          {`
            @keyframes slideUp {
              0% { opacity: 0; transform: translateY(40px); }
              100% { opacity: 1; transform: translateY(0px); }
            }
          `}
        </style>
      </div>

    </div>
  );
}
