import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignInButton,
} from "@clerk/clerk-react";
import {
  Briefcase,
  BriefcaseBusiness,
  PenBox,
  Github,
  ArrowRight,
} from "lucide-react";
import { useUser } from "@clerk/clerk-react";

function Header() {
  const { user } = useUser();

  const handleStarProject = () => {
    window.open("https://github.com/RaghavCLI/Hirely", "_blank");
  };

  return (
    <div className="sticky top-0 z-50 bg-transparent backdrop-blur-md">
      {/* Northern Aurora navbar background - subtle overlay */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 50% 50%, rgba(255, 20, 147, 0.06), transparent 50%),
              radial-gradient(ellipse 160% 130% at 10% 10%, rgba(0, 255, 255, 0.04), transparent 60%),
              radial-gradient(ellipse 160% 130% at 90% 90%, rgba(138, 43, 226, 0.08), transparent 65%),
              radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.03), transparent 40%)
            `,
        }}
      />
      <div className="relative z-10 flex h-16 items-center px-4 container mx-auto">
        <div className="font-bold text-2xl flex-1">
          <Link className="flex items-center">
            <span className="font-inter-display text-white drop-shadow-lg">
              Hirely
            </span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            onClick={handleStarProject}
            className="hidden sm:flex border-purple-400/20 text-purple-200 hover:bg-purple-500/5 hover:border-purple-400/30 backdrop-blur-sm bg-black/10"
          >
            <Github className="h-4 w-4 mr-1" /> Star Project
          </Button>
          <SignedOut>
            <SignInButton
              mode="modal"
              signUpForceRedirectUrl="/onboarding"
              fallbackRedirectUrl="/onboarding"
            >
              <button className="group relative w-auto cursor-pointer overflow-hidden rounded-full border border-cyan-400/20 bg-black/10 backdrop-blur-sm p-2 px-6 text-center font-semibold mr-4 text-cyan-200 hover:bg-cyan-500/5 hover:border-cyan-400/30 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-cyan-400 transition-all duration-300 group-hover:scale-[100.8]"></div>
                  <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
                    Login
                  </span>
                </div>
                <div className="absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 text-white opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100">
                  <span>Login</span>
                  <ArrowRight />
                </div>
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            {user?.unsafeMetadata?.role == "recruiter" && (
              <Link to="/post-job">
                <Button
                  variant="destructive"
                  className="rounded-full mr-6 shadow-lg hover:shadow-red-500/30 bg-red-600/80 backdrop-blur-sm"
                >
                  <PenBox size={20} className="mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    "h-10 w-10 ring-2 ring-purple-400/20 bg-black/20 backdrop-blur-sm",
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
    </div>
  );
}

export default Header;
