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
import { BarLoader } from "react-spinners";
import { deleteJob } from "../api/apijobs";

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

  const { loading: loadingDletedJob, fn: fnDeleteJob } = useFetch(deleteJob, {
    job_id: job.id,
  });

  const handleDeleteJob = async () => {
    await fnDeleteJob();
    onJobSaved();
  };

  useEffect(() => {
    if (savedJobs !== undefined) setSaved(savedJobs?.length > 0);
  }, [savedJobs]);
  return (
    <Card className="flex flex-col h-full transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 group">
      {loadingDletedJob && (
        <BarLoader className="mT-4" width={"100%"} color="#36d7b7" />
      )}
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          <span className="text-xl group-hover:text-primary transition-colors">
            {job.title}
          </span>

          {isMyJob && (
            <Trash2Icon
              fill="red"
              size={18}
              className="text-red-500 cursor-pointer hover:scale-110 transition-transform"
              onClick={handleDeleteJob}
            />
          )}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-center">
          {job.company && (
            <div className="flex items-center gap-3">
              <img
                src={job.company.logo_url}
                className="h-8 w-8 object-contain"
              />
              <span className="text-muted-foreground font-medium">
                {job.company.name}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 bg-primary/5 px-3 py-1 rounded-full">
            <MapPinIcon size={15} className="text-primary" />
            <span className="text-sm font-medium">{job.location}</span>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent my-2" />
        <p className="text-muted-foreground line-clamp-3">{job.description}</p>
      </CardContent>

      <CardFooter className="flex gap-2 pt-4">
        <Link to={`/job/${job.id}`} className="flex-1">
          <Button
            variant="secondary"
            className="w-full font-medium hover:bg-primary/10"
          >
            More Details
          </Button>
        </Link>

        {!isMyJob && (
          <Button
            variant="outline"
            className="w-15 hover:bg-red-500/10"
            onClick={handlesaveJob}
            disabled={loadingSavedJobs}
          >
            {saved ? (
              <Heart
                size={20}
                stroke="red"
                fill="red"
                className="animate-in zoom-in duration-300"
              />
            ) : (
              <Heart
                size={20}
                className="hover:text-red-500 transition-colors"
              />
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default JobCard;
