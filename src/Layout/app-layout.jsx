import Header from "../components/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function Applayout() {
  return (
    <div className="min-h-screen w-full relative bg-black">
      {/* Northern Aurora Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255, 20, 147, 0.15), transparent 50%),
              radial-gradient(ellipse 160% 130% at 10% 10%, rgba(0, 255, 255, 0.12), transparent 60%),
              radial-gradient(ellipse 160% 130% at 90% 90%, rgba(138, 43, 226, 0.18), transparent 65%),
              radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
              #000000
            `,
        }}
      />
      <main className="relative z-10">
        <Header />
        <Outlet />
      </main>
      <div className="relative z-10 text-center text-gray-300 dark:text-gray-400 text-sm p-4">
        {" "}
        Website created by{" "}
        <a
          href="https://github.com/RaghavCLI"
          target="_blank"
          className="text-purple-300 hover:text-cyan-300 transition-colors"
        >
          @RaghavCLI
        </a>
      </div>
    </div>
  );
}

export default Applayout;
