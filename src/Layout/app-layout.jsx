import React from "react";
import { Outlet } from "react-router-dom";

function Applayout() {
  return (
    <div>
      APP layout
      <Outlet />
    </div>
  );
}

export default Applayout;
