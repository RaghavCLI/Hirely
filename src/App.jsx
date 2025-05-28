import React from "react";
import Applayout from "./Layout/app-layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/Landing";
import Onboarding from "./pages/onboarding";
import JobListing from "./pages/job-listing";
import SavedJobs from "./pages/saved-job";
import MyJobs from "./pages/my-jobs";
import JobPage from "./pages/job";
import PostPage from "./pages/post-jobs";
import { ThemeProvider } from "./components/ui/theme-provider";
import "./App.css";

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
        path: "/Jobs",
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
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
