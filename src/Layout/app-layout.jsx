import Header from "../components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function Applayout() {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm p-4">
        {" "}
        Website created by{""}
        <a href="https://github.com/RaghavCLI" target="_blank">
          @RaghavCLI
        </a>
      </div>
    </div>
  );
}

export default Applayout;
