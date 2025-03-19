import UploadFile from "../upload/upload-file";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ConvertImageGroup from "./convert-image-group";
import GenerateImage from "./generate-image";
import { AppDispatch, AppState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { changeNumberOfImages, setReferencePhoto, setTargetPhoto } from "@/store/input";

const RightEditor = () => {
  const input = useSelector((state: AppState) => state.input);
  const dispatch = useDispatch<AppDispatch>();

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
                  photo={input.referencePhoto}
                  changePhoto={(url) => dispatch(setReferencePhoto(url))}
                  title="Ảnh Tham Chiếu"
                  context="Tải lên ảnh tham chiếu"
                />
              </div>
              <div className="w-full md:w-[49%]">
                <UploadFile
                  photo={input.targetPhoto}
                  changePhoto={(url) => dispatch(setTargetPhoto(url))}
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
                className={`px-3 py-2 bg-gray-200 rounded-l-md hover:bg-gray-300 disabled:opacity-50 ${input.numberOfImages > 1 && !input.isLoading && "cursor-pointer"}`}
                disabled={input.numberOfImages === 1 || input.isLoading}
                onClick={() => dispatch(changeNumberOfImages(-1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 bg-gray-100 font-medium min-w-[40px] text-center">{input.numberOfImages}</span>
              <button
                className={`px-3 py-2 bg-gray-200 rounded-r-md hover:bg-gray-300 disabled:opacity-50 ${input.numberOfImages < 4 && !input.isLoading && "cursor-pointer"}`}
                disabled={input.numberOfImages === 4 || input.isLoading}
                onClick={() => dispatch(changeNumberOfImages(1))}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <span className="ml-3 text-sm text-gray-500">Tối đa: 4</span>
            </div>
          </div>
          {/* Generate Image */}
          {!input.referencePhoto && <GenerateImage />}
          {/* Convert Image */}
          <ConvertImageGroup />
        </div>
      </div>
    </div>
  );
};

export default RightEditor;
