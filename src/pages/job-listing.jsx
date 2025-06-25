import { useUser } from "@clerk/clerk-react";
import { getJobs } from "../../src/api/apijobs";
import useFetch from "../../src/hooks/use-fetch";
import { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import JobCard from "../../src/components/job-card";
import { getCompanies } from "../api/apiCompanies";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Form } from "react-router-dom";
import { State } from "country-state-city";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "../components/ui/select";

function JobListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [company_id, setCompany_id] = useState("");
  const { isLoaded } = useUser();
  const {
    fn: fnJobs,
    data: Jobs,
    loading: loadingJobs,
  } = useFetch(getJobs, {
    location,
    company_id,
    searchQuery,
  });

  const { fn: fnCompanies, data: companies } = useFetch(getCompanies);

  useEffect(() => {
    if (isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if (isLoaded) fnJobs();
  }, [isLoaded, location, company_id, searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    const query = formData.get("search-query");
    if (query) setSearchQuery(query);
  };

  const clearFilters = () => {
    setLocation("");
    setCompany_id("");
    setSearchQuery("");
  };

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="animate-in slide-in-from-bottom duration-700">
      <h1 className="gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-12">
        Latest Jobs
      </h1>

      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Search section */}
        <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 space-y-4">
          <form
            onSubmit={handleSearch}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Input
              type="text"
              placeholder="Search by job title"
              name="search-query"
              className="h-12 flex-1 px-4 text-md shadow-sm"
            />
            <Button
              type="submit"
              className="h-12 sm:w-28 shadow-lg"
              variant="blue"
            >
              Search
            </Button>
          </form>

          <div className="flex flex-col sm:flex-row gap-4">
            <Select
              value={location}
              onValueChange={(value) => setLocation(value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Filter by Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {State.getStatesOfCountry("IN").map(({ name }) => (
                    <SelectItem key={name} value={name}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={company_id}
              onValueChange={(value) => setCompany_id(value)}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Filter by Company" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {companies?.map(({ name, id }) => (
                    <SelectItem key={name} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              onClick={clearFilters}
              className="h-12 sm:w-auto"
              variant="destructive"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {loadingJobs && (
          <div className="flex justify-center py-8">
            <BarLoader width={"200px"} color="#36d7b7" />
          </div>
        )}

        {loadingJobs === false && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Jobs?.length ? (
              Jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  savedInit={job?.saved?.length > 0}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12 text-muted-foreground">
                No Jobs Found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default JobListing;
