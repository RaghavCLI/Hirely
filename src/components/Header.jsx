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
import { useUser } from "@clerk/clerk-react";

function Header() {
  const [showSignIn, setShowSignIn] = useState(false);

  const [search, setSearch] = useSearchParams();

  const { user } = useUser();

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
    <div className="pt-4 px-4 sm:px-6 lg:px-8">
      <nav className="py-4 backdrop-blur-md bg-background/70 rounded-2xl border border-border/40 shadow-lg px-6">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link className="transition-transform hover:scale-105">
            <img src="/logo.png" className="h-12 w-auto object-contain"></img>
          </Link>

          <div className="flex items-center space-x-4">
            <SignedOut>
              <Button
                variant="outline"
                onClick={() => setShowSignIn(true)}
                className="mr-4 hover:bg-primary/10"
              >
                Login
              </Button>
            </SignedOut>
            <SignedIn>
              {user?.unsafeMetadata?.role == "recruiter" && (
                <Link to="/post-job">
                  <Button
                    variant="destructive"
                    className="rounded-full mr-6 shadow-lg hover:shadow-red-500/30"
                  >
                    <PenBox size={20} className="mr-2" />
                    Post a Job
                  </Button>
                </Link>
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-10 w-10 ring-2 ring-primary/20",
                  },
                }}
              >
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="My Jobs"
                    labelIcon={<BriefcaseBusiness size={15} />}
                    href="/my-jobs"
                  />
                  <UserButton.Link
                    label="Saved Jobs"
                    labelIcon={<Briefcase size={15} />}
                    href="/saved-job"
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </div>
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
