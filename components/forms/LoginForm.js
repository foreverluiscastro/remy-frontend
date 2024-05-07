import React, { useState } from "react";
import { useAppContext } from "../providers/AppProvider";
import Error from "../core/Error";

function LoginForm() {
  const { setUser } = useAppContext();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => {
          setUser(user);
        });
      } else {
        r.json().then((err) => setError(err.message));
      }
    });
  }

  // console.log("This is the errors array: ", error);

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
        className="Input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="off"
      />
      {error && <Error err={error} />}
      <button
        type="submit"
        className="rounded bg-sky-400 hover:bg-sky-500 hover:bg-opacity-85 duration-200 transition p-3 shadow-md mb-7"
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
