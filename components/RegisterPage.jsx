import React, { useState } from "react";
import { auth } from "../config/firbaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthPage } from "../context/authContext";
import { XMarkIcon } from "@heroicons/react/24/solid";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { setLoginPage, setRegisterPage } = useAuthPage();

  const validateUsername = (input) => {
    const usernameRegex = /^[a-zA-Z0-9_]{4,}$/;

    return usernameRegex.test(input);
  };

  const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

  const validatePassword = (input) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(input);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateUsername(username)) {
      setErrors((prevState) => ({
        ...prevState,
        username: "Username should at least contain 4 characters",
      }));
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prevState) => ({
        ...prevState,
        email: "Invalid email format",
      }));
      return;
    }

    if (!validatePassword(password)) {
      setErrors((prevState) => ({
        ...prevState,
        password:
          "Password must be at least 8 characters and include a letter and a number",
      }));
      return;
    }

    if (password !== confirmPassword) {
      setErrors((prevState) => ({
        ...prevState,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, { displayName: username });
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setErrors((prevState) => ({
          ...prevState,
          email:
            "This email is already registered. Please use a different email.",
        }));
      } else {
        console.error("Error registering user:", error);
      }
    }
  };

  return (
    <div className="grid place-content-center backdrop-blur-sm absolute top-0 left-0 right-0 bottom-0 h-[100vh] text-white">
      {success ? (
        <div className="grid place-content-center space-y-3 w-72 h-[332px] bg-prussianBlueAccent p-10 text-base md:text-lg text-center rounded md:w-[336px] md:h-[392px] ">
          <h3>Your registration was successful!</h3>
          <p className="text-xs md:text-sm">
            You can now{" "}
            <span
              className="text-amber-400 underline cursor-pointer"
              onClick={() => {
                setLoginPage(true);
                setSuccess(false);
                setRegisterPage(false);
              }}
            >
              log in
            </span>{" "}
            to your account.
          </p>
        </div>
      ) : (
        <form
          className="relative flex flex-col gap-5 bg-prussianBlueAccent p-10 text-xs md:text-base rounded"
          onSubmit={handleRegister}
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              placeholder="username"
              id="username"
              className={`w-52 md:w-72 lg:w-80 p-1 rounded text-black ${
                errors.username ? "border-red-500" : ""
              }`}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              placeholder="email"
              id="email"
              className={`w-52 md:w-72 lg:w-80 p-1 rounded text-black ${
                errors.email ? "border-red-500 " : ""
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-500 text-xs  w-52 md:w-64 lg:w-80">
                {errors.email}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              placeholder="password"
              id="password"
              className={`w-52 md:w-72 lg:w-80 p-1 rounded text-black ${
                errors.password ? "border-red-500" : ""
              }`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-500 text-xs  w-52 md:w-64 lg:w-80">
                {errors.password}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              placeholder="Confirm Password"
              id="confirmPassword"
              className={`w-52 md:w-72 lg:w-80 p-1 rounded text-black ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
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
          {loading && (
            <div className="flex justify-center items-center">
              <div className="w-6 h-6 border-t-4  border-blue-500 border-solid rounded-full animate-spin"></div>
            </div>
          )}
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
``;
