import React from 'react'
import { useState } from "react";
import LoginForm from '../forms/LoginForm';
import SignUpForm from '../forms/SignUpForm';

function Login(){
  const [showLogin, setShowLogin] = useState(true);

  const handleClick = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="md:w-1/2 flex flex-col justify-center items-center py-4">

    <div className="flex flex-col bg-sky-900 shadow-md rounded-xl items-center w-full py-8">

      <div className="justify-center w-full items-center text-center flex px-8">
        <div className="rounded bg-gray-500 w-3/4 sm:w-1/2 shadow-md mb-8">
          <button
            className={`${
              showLogin ? "bg-sky-400" : ""
            } w-1/2 p-2 rounded duration-300`}
            onClick={handleClick}
          >
            Login
          </button>
          <button
            className={`${
              showLogin ? "" : "bg-sky-400"
            } w-1/2 p-2 rounded duration-300`}
            onClick={handleClick}
          >
            Sign Up
          </button>
        </div>
      </div>
      <div className="items-center justify-center px-8 flex flex-grow w-full">
      {showLogin ? (
        <LoginForm/>
      ) : (
        <SignUpForm/>
      )}
      </div>
    </div>
  </div>
  )
}

export default Login