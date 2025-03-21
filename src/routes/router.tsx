import MainLayout from "@/layout/main-layout";
import { createBrowserRouter } from "react-router-dom";
import path from "./path";
import HomePage from "@/pages/home-page";
import HistoryPage from "@/pages/history-page";

const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        {
          path: path.HOME,
          element: <HomePage />,
        },
        {
          path: path.HISTORY,
          element: <HistoryPage />,
        },
      ],
    },
  ],
  {
    basename: "/VisAI",
  },
);

export default router;
