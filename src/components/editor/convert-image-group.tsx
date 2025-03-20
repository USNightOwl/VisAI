import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import ButtonZoom from "../button/convert/button-zoom";
import ButtonExpand from "../button/convert/button-expand";
import ButtonSwapFace from "../button/convert/button-swap-face";
import ButtonVton from "../button/convert/button-vton";

const ConvertImageGroup = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-xl font-semibold">Biến Đổi</h2>
        <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <ChevronLeft className={`w-5 h-5 transform ${isOpen ? "rotate-90" : "-rotate-90"}`} />
        </button>
      </div>
      {isOpen && (
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Zoom */}
            <ButtonZoom />
            <ButtonExpand />
            <ButtonSwapFace />
            <ButtonVton />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertImageGroup;
