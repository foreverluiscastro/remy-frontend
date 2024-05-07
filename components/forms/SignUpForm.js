import React, { useState } from "react";
import { useAppContext } from "../providers/AppProvider";
import Error from "../core/Error";

function SignUpForm() {
  const { setUser } = useAppContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => setUser(user));
      } else {
        r.json().then((err) => setError(err.message));
      }
    });
  }

  console.log("This is the error state: ", error)

  return (
    <form className="Form" onSubmit={handleSubmit}>
      <label className="Label" htmlFor="username">
        Username:
      </label>
      <input
        id="username"
        className="Input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <label className="Label" htmlFor="password">
        Password:
      </label>
      <input
        id="password"
        autoComplete="off"
        className="Input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="Label" htmlFor="password-confirm">
        Confirm Password:
      </label>
      <input
        id="password-confirm"
        autoComplete="off"
        className="Input flex-grow"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      { error && <Error err={error}/>}

      <button
        type="submit"
        className="rounded bg-sky-400 hover:bg-sky-500 hover:bg-opacity-85 duration-200 transition p-3 shadow-md mb-7"
      >
        Sign Up
      </button>
    </form>
  );
}

export default SignUpForm;
