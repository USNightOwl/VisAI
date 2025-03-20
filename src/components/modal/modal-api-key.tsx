import { Key, Settings } from "lucide-react";
import { useContext, useState } from "react";
import SlideModel from "../slide/slide-model";
import { GlobalContext } from "@/contexts/global-context";
import toast from "react-hot-toast";

type Props = {
  isMobile?: boolean;
};

const ModalApiKey = ({ isMobile = false }: Props) => {
  const { apiKey, setApiKey } = useContext(GlobalContext)!;
  const [isOpen, setIsOpen] = useState(false);
  const [apiKeyText, setApiKeyText] = useState(apiKey);

  const handleChangeApiKey = () => {
    setApiKey(apiKeyText);
    toast.success("Đã lưu API Key thành công");
    setIsOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <button
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          API Key
        </button>
      ) : (
        <button
          className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <Settings className="w-5 h-5" />
          <span className="hidden sm:inline">API Key</span>
        </button>
      )}
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1000" onClick={() => setIsOpen(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-3xl shadow-xl z-1000">
            <div className="flex items-center gap-2 mb-4">
              <Key className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold">Nhập API Key của Google AI Studio</h2>
            </div>
            <SlideModel />
            <form onSubmit={handleChangeApiKey}>
              <input
                type="password"
                className="w-full p-3 border border-gray-300 rounded mb-4 text-lg"
                placeholder="Nhập API Key của bạn"
                required
                value={apiKeyText}
                onChange={(e) => setApiKeyText(e.target.value)}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ModalApiKey;
