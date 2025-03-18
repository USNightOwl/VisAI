import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
