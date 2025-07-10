import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useUser } from "@clerk/clerk-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user?.unsafeMetadata?.role) {
      navigate(
        user.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs",
        { replace: true }
      );
    }
  }, [isLoaded, user, navigate]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#4f46e5" />;
  }

  // If user has a role, don't render onboarding UI
  if (user?.unsafeMetadata?.role) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I Am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
}

export default Onboarding;
