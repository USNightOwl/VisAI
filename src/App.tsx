import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import { Toaster } from "react-hot-toast";
import "react-tooltip/dist/react-tooltip.css";
import { useEffect } from "react";
import { initDB, Stores } from "./config/db";

function App() {
  useEffect(() => {
    async function initIndexedDB() {
      // indexedDB.deleteDatabase("imageEditorDB");
      await initDB(Stores.HistoryItems);
    }
    initIndexedDB();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default App;
