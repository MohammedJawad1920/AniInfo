import React, { useState } from "react";
import { auth } from "../config/firbaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthPage } from "../context/authContext";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [succes, setSucces] = useState(false);

  const { setLoginPage, setRegisterPage } = useAuthPage();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setError(null);

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: username });

      setSucces(true);
    } catch (error) {
      setError(error.message);
      console.error("Error registering user:", error);
    }
  };
  return (
    <div className=" grid place-content-center backdrop-blur-sm  absolute top-0 left-0 right-0 bottom-0 h-[100vh] text-white">
      {succes ? (
        <div className=" grid place-content-center space-y-3 w-72 h-[332px] bg-prussianBlueAccent p-10 text-base md:text-lg text-center rounded md:w-[336px] md:h-[392px] ">
          <h3>You succesfully registered with your email</h3>
          <p className="text-xs md:text-sm">
            please{" "}
            <span
              className="text-amber-400  underline cursor-pointer"
              onClick={() => {
                setLoginPage(true);
                setSucces(false);
                setRegisterPage(false);
              }}
            >
              log in
            </span>
          </p>
        </div>
      ) : (
        <form
          className="relative flex flex-col gap-5 bg-prussianBlueAccent p-10 text-xs md:text-base rounded"
          onSubmit={handleRegister}
        >
          {error && <p>{error}</p>}
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="username"
              id="username"
              className="w-52 md:w-72 lg:w-80 p-1 rounded text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">ConfirmPassword:</label>
            <input
              type="Password"
              placeholder="Confirm Password"
              id="confirmPassword"
              className="w-52 md:w-72 lg:w-80 p-1 rounded text-black"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="text-xs md:text-sm text-center">
            <span>Already have an account? </span>
            <span
              className="text-amber-400 underline cursor-pointer"
              onClick={() => {
                setLoginPage(true);
                setRegisterPage(false);
              }}
            >
              Login
            </span>
          </div>
          <div className="flex justify-end">
            <button className="bg-amber-400 py-1 px-2 text-black font-bold rounded">
              Submit
            </button>
          </div>
          <div
            className="absolute -top-2 -right-2 bg-amber-400 text-black md:p-0.5 rounded-full cursor-pointer"
            onClick={() => setRegisterPage(false)}
          >
            <XMarkIcon className="w-5 h-5" />
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterPage;
