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
import ProtectedRoutes from "./components/protected-routes";

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
        element: (
          <ProtectedRoutes>
            <Onboarding />,
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Jobs",
        element: (
          <ProtectedRoutes>
            <JobListing />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/Job/:id",
        element: (
          <ProtectedRoutes>
            <JobPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoutes>
            <PostPage />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/saved-job",
        element: (
          <ProtectedRoutes>
            <SavedJobs />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoutes>
            <MyJobs />
          </ProtectedRoutes>
        ),
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
