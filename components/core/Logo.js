import React from "react";

function Logo() {
  return (
    <div className="md:w-1/2 flex flex-col justify-center items-center text-center py-4">
      <img src="/remy-big.png" width={1000} height={1000} className="w-2/3" alt='remy-big'/>
      <h1 className="text-7xl font-bold mb-2">Remy</h1>
      <p className="font-semibold text-gray-500 mb-2">Anyone can be a chef!</p>
      <p className="font-semibold text-gray-500 mb-2">
        Generate recipes using ingredients you have available!
      </p>
    </div>
  );
}

export default Logo;
