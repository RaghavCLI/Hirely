import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";

function Header() {
  return (
    <div className="pt-6 pl-6">
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-12 w-auto object-contain"></img>
        </Link>

        {/* <Button variant="outline"> Login </Button> */}

        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </nav>
    </div>
  );
}

export default Header;
