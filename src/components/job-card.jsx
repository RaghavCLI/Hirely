import { useUser } from "@clerk/clerk-react";
import { CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { MapPinIcon, Trash2Icon } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { saveJob } from "../api/apijobs";
import useFetch from "../hooks/use-fetch";
import { useState, useEffect } from "react";

function JobCard({
  job,
  isMyJob = false,
  savedInit = false,
  onJobSaved = () => {},
}) {
  const [saved, setSaved] = useState(savedInit);

  const {
    fn: fnSavedJob,
    data: savedJobs,
    loading: loadingSavedJobs,
  } = useFetch(saveJob, {
    alreadySaved: saved,
  });

  const { user } = useUser();

  const handlesaveJob = async () => {
    await fnSavedJob({
      user_id: user.id,
      job_id: job.id,
    });
    onJobSaved();
  };

  useEffect(() => {
    if (savedJobs !== undefined) setSaved(savedJobs?.length > 0);
  }, [savedJobs]);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {job.title}

          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-500 cursor-pointer"
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between">
          {job.company && <img src={job.company.logo_url} className="h-6" />}
          <div className="flex items-center gap-2">
            <MapPinIcon size={15} /> {job.location}
          </div>
        </div>
        <hr />
        {job.description}
      </CardContent>
      <CardFooter className="flex gap-2">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button variant="secondary" className="w-full">
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15"
            onClick={handlesaveJob}
            disabled={loadingSavedJobs}
          >
            {saved ? (
              <Heart size={20} stroke="red" fill="red" />
            ) : (
              <Heart size={20} />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default JobCard;
