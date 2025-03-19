import React from "react";
import { Tooltip } from "react-tooltip";

type Props = {
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  title: string;
  example: React.ReactNode;
};

const ButtonConvert = ({ example, title, children, className = "", isDisabled = true }: Props) => {
  return (
    <>
      <button
        className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-white font-medium h-10 ${isDisabled ? "bg-gray-400" : className} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        disabled={isDisabled}
        id="clickable"
      >
        <span className="text-sm flex items-center gap-2">{children}</span>
      </button>
      <Tooltip anchorSelect="#clickable" clickable opacity={1} style={{ padding: 0, borderRadius: "0.375rem" }}>
        <div className="bg-gray-900 opacity-100 flex flex-col items-center p-3 shadow-lg rounded-md">
          <div className="flex flex-col items-center" style={{ minWidth: "360px" }}>
            <p className="mb-4 text-lg font-semibold w-full text-center">{title}</p>
            <div className="flex flex-col">
              <div className="flex items-center justify-center gap-2 bg-gray-900 p-5 rounded-lg">{example}</div>
              <button className="mt-2 py-2 px-4 text-white rounded-md transition-colors text-sm bg-blue-600 hover:bg-blue-700 cursor-pointer">
                Sử dụng ảnh mẫu
              </button>
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default ButtonConvert;
