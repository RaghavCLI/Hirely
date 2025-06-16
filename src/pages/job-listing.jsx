import { getJobs } from "../../src/api/apijobs";
import useFetch from "../../src/hooks/use-fetch";
import { useEffect } from "react";

function JobListing() {
  const {
    fn: fnJobs,
    data: dataJobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {});

  useEffect(() => {
    fnJobs();
  }, []);

  console.log(dataJobs);

  return <div>Job Listing Page</div>;
}
export default JobListing;
