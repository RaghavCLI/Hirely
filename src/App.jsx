import React, { Children } from "react";
import Applayout from "./Layout/app-layout";
import { createBrowserRouter, Router } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/job-listing";
import SavedJobs from "./pages/saved-job";
import MyJobs from "./pages/my-jobs";

const router = createBrowserRouter([
  {
    element: <Applayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: <Onboarding />,
      },
      {
        path: "/JobS",
        element: <JobListing />,
      },
      {
        path: "/Job/:id",
        element: <JobPage />,
      },
      {
        path: "/post-job",
        element: <PostPage />,
      },
      {
        path: "/saved-job",
        element: <SavedJobs />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
