import { SamplePhoto } from "@/constants/sample-photo";
import { AppDispatch, AppState } from "@/store";
import { setReferencePhoto } from "@/store/input";
import { ChevronLeft, ChevronRight, Copy, Download, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const LeftEditor = () => {
  const [currentImage, setCurrentImage] = useState(SamplePhoto[0].url);
  const [curentIndex, setCurrentIndex] = useState(0);

  const results = useSelector((state: AppState) => state.results);
  const dispatch = useDispatch<AppDispatch>();

  const changeShowImage = (index: number) => {
    if (index < 0 || index >= results.results.length) return;
    setCurrentImage(results.results[index].url);
    setCurrentIndex(index);
  };

  const handleCopy = async () => {
    try {
      const textToCopy = currentImage;
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Đã sao chép ảnh vào clipboard!");
    } catch (error) {
      console.error("Lỗi khi sao chép:", error);
    }
  };

  useEffect(() => {
    if (results.results.length > 0) {
      changeShowImage(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [results]);

  return (
    <div className="w-full lg:w-3/5 order-2 lg:order-1">
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:h-[calc(100vh-8rem)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Xem Trước</h2>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <a
              href={currentImage}
              download="transformed-image.png"
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải Xuống</span>
            </a>
            <button
              className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 cursor-pointer"
              onClick={() => {
                dispatch(setReferencePhoto(currentImage));
                toast.success("Đã đặt hình ảnh làm tham chiếu");
              }}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Làm ảnh tham chiếu</span>
            </button>
          </div>
        </div>
        <div className="min-h-[300px] lg:min-h-0 lg:flex-1">
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
              <img alt="Result" className="max-w-full max-h-full object-contain" src={currentImage} />
            </div>
            {results.results.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-3">
                <button
                  className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 cursor-pointer disabled:cursor-default"
                  disabled={curentIndex === 0}
                  onClick={() => changeShowImage(curentIndex - 1)}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-sm font-medium">
                  {curentIndex + 1} / {results.results.length}
                </span>
                <button
                  className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50 cursor-pointer disabled:cursor-default"
                  disabled={curentIndex === results.results.length - 1}
                  onClick={() => changeShowImage(curentIndex + 1)}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  className="p-1 bg-gray-200 rounded-full hover:bg-gray-300 ml-2 cursor-pointer"
                  title="Sao chép ảnh vào clipboard"
                  onClick={handleCopy}
                >
                  <Copy className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftEditor;
