import { ChevronLeft, ZoomIn } from "lucide-react";
import { useState } from "react";
import ButtonConvert from "../button/button-convert";

const ConvertImageGroup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const buttonGroup = [
    {
      className: "bg-amber-600 hover:bg-amber-700",
      isDisabled: false,
      title: "Phóng to khuôn mặt trong ảnh",
      example: <div>hello</div>,
    },
  ];

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
            {buttonGroup.map((button, index) => (
              <ButtonConvert
                key={index}
                className={button.className}
                isDisabled={button.isDisabled}
                title={button.title}
                example={button.example}
              >
                <ZoomIn className="w-4 h-4" />
                Phóng to
              </ButtonConvert>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertImageGroup;
