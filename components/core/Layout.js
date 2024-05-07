import React, { useEffect } from "react";
import { useAppContext } from "../providers/AppProvider";
import NavBar from "./NavBar";
import LandingPage from "./LandingPage";

export const Layout = ({ children }) => {
  const { user, setUser } = useAppContext();

  // console.log("This is the value of user from context: ", user);

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <LandingPage />;

  return (
    <div className="Layout">
      <NavBar />
      <div className="Main">
        <div className="py-4">
        {children}
        </div>
      </div>
      <footer className="px-4 pb-4">
        <h1 className="mx-auto  items-center justify-center text-center flex text-lg">Crafted by Luis Castro. Powered by OpenAI
          <img src="/openai.png" width={30} height={30} className="p-1"/>
        </h1>
      </footer>
    </div>
  );
};
