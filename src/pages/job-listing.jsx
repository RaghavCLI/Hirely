import { useSession } from "@clerk/clerk-react";
import { getJobs } from "../../src/api/apijobs";
import { useEffect } from "react";

function JobListing() {
  const { session } = useSession();

  const fetchJobs = async () => {
    const supabaseAccessToken = await session.getToken({
      template: "supabase",
    });
    const data = await getJobs(supabaseAccessToken);
    console.log(data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);
  return (
    <div>
      <h1>Job Listing Page</h1>
    </div>
  );
}

export default JobListing;
