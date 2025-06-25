import { Boxes, BriefcaseBusiness, Download, School } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { updateApplicationsStatus } from "../api/apiApplications";
import useFetch from "../hooks/use-fetch";
import { BarLoader } from "react-spinners";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function ApplicationCard({ application, isCandidate = false }) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = application?.resume;
    link.target = "_blank";
    link.click();
  };

  const { loading: loadingHiringStatus, fn: fnHiringStatus } = useFetch(
    updateApplicationsStatus,
    {
      job_id: application.job_id,
    }
  );

  const handleStatusChange = async (status) => {
    fnHiringStatus(status);
  };

  return (
    <Card>
      {loadingHiringStatus && <BarLoader width={"100%"} color="#36d7b7" />}
      <CardHeader>
        <CardTitle className="flex font-bold justify-between">
          {isCandidate
            ? `${application?.job?.title} at ${application?.job?.company?.name}`
            : application?.name}
          <Download
            size={18}
            className="bg-white text-black rounded-full h-8 w-8 p-1.5 cursor-pointer"
            onClick={handleDownload}
          />
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 flex-1">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={15} />
            <div>{application?.experience} years of experience</div>
          </div>
          <div className="flex items-center gap-2">
            <School size={15} />
            <div>{application?.education}</div>
          </div>
          <div className="flex items-center gap-2">
            <Boxes size={15} />
            <div>Skills: {application?.skills}</div>
          </div>
        </div>
        <hr />
      </CardContent>
      <CardFooter className="flex justify-between">
        <span className="capitalize font-bold">
          {new Date(application?.created_at).toLocaleString()}
        </span>
        {isCandidate ? (
          <span>status: {application?.status}</span>
        ) : (
          <Select
            onValueChange={handleStatusChange}
            defaultValue={application?.status}
          >
            <SelectTrigger className="w-52">
              <SelectValue placeholder="Application Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="applied">Applied</SelectItem>
              <SelectItem value="interviewing">Interviewing</SelectItem>
              <SelectItem value="hired">Hiring</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardFooter>
    </Card>
  );
}

export default ApplicationCard;
