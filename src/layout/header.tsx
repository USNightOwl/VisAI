import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { History, Menu } from "lucide-react";
import ModalApiKey from "@/components/modal/modal-api-key";
import { useEffect, useRef, useState } from "react";
import path from "@/routes/path";

const Header = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-sm p-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-2">
          <Link to={path.HOME} className="text-blue-500 hover:text-blue-600">
            <img src={logo} alt="VisAI" className="w-10 h-10" />
          </Link>
          <span className="flex flex-col-2 gap-2 items-baseline">
            <h1 className="text-xl md:text-3xl font-bold">
              <Link to={path.HOME} className="text-blue-500 hover:text-blue-600">
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
            <Link to={path.HISTORY}>
              <button className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer">
                <History className="w-5 h-5" />
                <span className="hidden sm:inline">Lịch sử</span>
              </button>
            </Link>
            <ModalApiKey />
          </div>
          {/* Mobile menu */}
          <div className="relative sm:hidden" ref={menuRef}>
            <button
              className="flex items-center justify-center w-10 h-10 cursor-pointer"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <Menu className="w-6 h-6" />
            </button>
            {isOpenMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                <div className="py-1 border-b border-gray-100">
                  <Link to={path.HISTORY}>
                    <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                      Lịch sử
                    </button>
                  </Link>
                  <ModalApiKey isMobile />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
