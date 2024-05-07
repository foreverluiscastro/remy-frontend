import React from "react";

export const Page = ({ children }) => {
  return (
    <div className="Page">
      <div className="TopMargin"></div>
      <div className="SideMargin">
        <div className="Container">
          { children }
        </div>
      </div>
    </div>
  );
};
