import { useUser } from "@clerk/clerk-react";
import { getMyJobs } from "../api/apijobs";
import useFetch from "../hooks/use-fetch";
import { useEffect } from "react";
import JobCard from "../components/job-card";
import { BarLoader } from "react-spinners";

function Createdjobs() {
  const { user } = useUser();

  const {
    loading: loadingCreatedJobs,
    data: createdJobs,
    fn: fnCreatedJobs,
  } = useFetch(getMyJobs, {
    recruiter_id: user.id,
  });

  useEffect(() => {
    fnCreatedJobs();
  }, []);

  if (loadingCreatedJobs) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {createdJobs?.length ? (
          createdJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              onJobSaved={fnCreatedJobs}
              isMyJob
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12 text-muted-foreground">
            No Jobs Found
          </div>
        )}
      </div>
    </div>
  );
}

export default Createdjobs;
