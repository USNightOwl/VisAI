import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { History } from "lucide-react";
import ModalApiKey from "@/components/modal/modal-api-key";

const Header = () => {
  return (
    <header className="bg-white shadow-sm p-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Link to={"/"} className="text-blue-500 hover:text-blue-600">
            <img src={logo} alt="VisAI" className="w-10 h-10" />
          </Link>
          <span className="flex flex-col-2 gap-2 items-baseline">
            <h1 className="text-xl md:text-3xl font-bold">
              <Link to="/" className="text-blue-500 hover:text-blue-600">
                VisAI
              </Link>{" "}
              Chỉnh Sửa Ảnh
            </h1>
          </span>
        </div>
        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Desktop menu */}
          <div className="hidden sm:flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer">
              <History className="w-5 h-5" />
              <span className="hidden sm:inline">Lịch sử</span>
            </button>
            <ModalApiKey />
          </div>
          {/* Mobile menu */}
          <div className="relative sm:hidden"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
