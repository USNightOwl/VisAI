import MainLayout from "@/layout/main-layout";
import { createBrowserRouter } from "react-router-dom";
import path from "./path";
import HomePage from "@/pages/home-page";

const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        {
          path: path.HOME,
          element: <HomePage />,
        },
      ],
    },
  ],
  {
    basename: "/VisAI",
  },
);

export default router;
