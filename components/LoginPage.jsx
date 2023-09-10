"use client";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firbaseConfig";
import { useAuthPage } from "../context/authContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { setLoginPage, setRegisterPage } = useAuthPage();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      setLoading(false);
      setLoginPage(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Error logging user:", error);
    }
  };
  return (
    <div className=" grid place-content-center backdrop-blur-sm  absolute top-0 left-0 right-0 bottom-0 h-[100vh] text-white">
      <form
        className="relative flex flex-col gap-5 bg-prussianBlueAccent p-10 text-xs md:text-base rounded"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="email"
            id="email"
            className="w-52 md:w-72 lg:w-80 p-1 rounded text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="password"
            id="password"
            className="w-52 md:w-72 lg:w-80 p-1 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="text-xs md:text-sm text-center">
          <span>Don't have an account? </span>
          <span
            className="text-amber-400 underline cursor-pointer"
            onClick={() => {
              setRegisterPage(true);
              setLoginPage(false);
            }}
          >
            Register
          </span>
        </div>
        <div className="flex justify-end">
          <button className="bg-amber-400 py-1 px-2 text-black font-bold rounded">
            Submit
          </button>
        </div>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="w-6 h-6 border-t-4  border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        )}
        <div
          className="absolute -top-2 -right-2 bg-amber-400 text-black md:p-0.5 rounded-full cursor-pointer"
          onClick={() => setLoginPage(false)}
        >
          <XMarkIcon className="w-5 h-5" />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
