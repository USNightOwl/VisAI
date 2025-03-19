import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "react-tooltip/dist/react-tooltip.css";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
