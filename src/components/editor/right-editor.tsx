import React from "react";
import UploadFile from "../upload/upload-file";
import { ChevronLeft, ChevronRight } from "lucide-react";

/* eslint-disable no-unused-vars */
type Props = {
  referencePhoto: string | null;
  targetPhoto: string | null;
  numberOfImages: number;
  setNumberOfImages: React.Dispatch<React.SetStateAction<number>>;
  changeReferencePhoto: (url: string | null) => void;
  changeTargetPhoto: (url: string | null) => void;
  changeResultsPhoto: (url: string[]) => void;
};

const RightEditor = ({
  referencePhoto,
  targetPhoto,
  numberOfImages,
  setNumberOfImages,
  changeTargetPhoto,
  changeReferencePhoto,
}: Props) => {
  return (
    <div className="w-full lg:w-2/5 order-1 lg:order-2">
      <div className="h-full overflow-y-auto">
        <div className="space-y-4 lg:h-[calc(100vh-8rem)] lg:overflow-auto">
          {/* upload image */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-3">Tải Lên Hình Ảnh</h2>
            <div className="flex flex-col md:flex-row md:gap-0 gap-2 justify-between">
              <div className="w-full md:w-[49%]">
                <UploadFile
                  photo={referencePhoto}
                  changePhoto={changeReferencePhoto}
                  title="Ảnh Tham Chiếu"
                  context="Tải lên ảnh tham chiếu"
                />
              </div>
              <div className="w-full md:w-[49%]">
                <UploadFile
                  photo={targetPhoto}
                  changePhoto={changeTargetPhoto}
                  title="Ảnh Mục Tiêu"
                  context="Tải lên ảnh mục tiêu"
                />
              </div>
            </div>
          </div>
          {/* number of image */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4 flex flex-row items-center justify-between">
            <span className="text-xl font-semibold">Số Lượng Ảnh</span>
            <div className="flex items-center">
              <button
                className={`px-3 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300 disabled:opacity-50 ${numberOfImages > 1 && "cursor-pointer"}`}
                disabled={numberOfImages === 1}
                onClick={() => setNumberOfImages(numberOfImages - 1)}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 bg-gray-100 font-medium min-w-[40px] text-center">{numberOfImages}</span>
              <button
                className={`px-3 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300 disabled:opacity-50 ${numberOfImages < 4 && "cursor-pointer"}`}
                disabled={numberOfImages === 4}
                onClick={() => setNumberOfImages(numberOfImages + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="ml-3 text-sm text-gray-500">Tối đa: 4</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightEditor;
