import React from "react";

const RegisterPage = ({
  email,
  setEmail,
  confirmPassword,
  setConfirmPassword,
  password,
  username,
  setUsername,
  setPassword,
  setLoginPage,
  setRegisterPage,
  XMarkIcon,
  handleRegister,
}) => {
  return (
    <div className=" grid place-content-center backdrop-blur-sm  absolute top-0 left-0 right-0 bottom-0 h-[100vh] text-white">
      <form
        className="relative flex flex-col gap-5 bg-slate-900 p-10 text-xs md:text-base rounded"
        onSubmit={handleRegister}
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="username"
            id="username"
            className="md:w-64 p-1 rounded text-black"
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
            className="md:w-64 p-1 rounded text-black"
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
            className="w-52 md:w-64 p-1 rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword">ConfirmPassword:</label>
          <input
            type="confirmPassword"
            placeholder="Confirm Password"
            id="confirmPassword"
            className="w-52 md:w-64 p-1 rounded text-black"
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
    </div>
  );
};

export default RegisterPage;
