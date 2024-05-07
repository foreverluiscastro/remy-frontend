import Image from "next/image";
import { useState } from "react";

export const LandingPage = ({ setUser }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="LandingPage">
      <div className="flex w-1/2 p-4 justify-center items-center text-center">
      <div className="flex flex-col justify-center items-center text-center">
        <Image
          src="/remy-big.png"
          width={1000}
          height={1000}
          className="w-1/2 h-auto object-cover"
          alt="Remy Image"
          />
        <h1 className="font-bold text-8xl rounded-lg">Remy</h1>
        <p className="p-4 text-xl font-semibold">
          Generate recipes using ingredients you can find around your house!
        </p>
      </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="flex flex-col justify-center items-center text-center w-full h-full rounded-lg bg-blue-100">
          <div>
            <butto className="">Login</butto>
            <butto className="">Sign Up</butto>
          </div>
        </div>
      </div>
    </div>
  );
};
