import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "./ui/button";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
  SignIn,
} from "@clerk/clerk-react";
import { Briefcase, BriefcaseBusiness, PenBox } from "lucide-react";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  useEffect(() => {
    if (search.get("sign-in")) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  return (
    <div className="pt-6 pl-6">
      <nav className="py-4 flex justify-between items-center">
        <Link>
          <img src="/logo.png" className="h-12 w-auto object-contain"></img>
        </Link>

        <div className="flex items-center space-x-4">
          <SignedOut>
            <Button variant="outline" onClick={() => setShowSignIn(true)}>
              Login
            </Button>
          </SignedOut>
          <SignedIn>
            <Link to="/post-job">
              <Button variant="destructive" className="rounded-full mr-4">
                <PenBox size={20} className="mr-2" />
                Post a Job
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-10 w-10",
                },
              }}
            >
              <UserButton.MenuItems>
                <UserButton.Link />
                label="My Jobs" labelIcon={<BriefcaseBusiness size={15} />}
                href="/my-jobs"
                <UserButton.Link
                  label="Saved Jobs"
                  labelIcon={<Briefcase size={15} />}
                  href="/saved-job"
                />
              </UserButton.MenuItems>
            </UserButton>
          </SignedIn>
        </div>
      </nav>

      {showSignIn && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleOverlayClick}
        >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </div>
  );
}

export default Header;
