import { SamplePhoto } from "@/constants/sample-photo";
import { AppState } from "@/store";
import { Download, RefreshCw } from "lucide-react";
import { useSelector } from "react-redux";

type Props = {
  // eslint-disable-next-line no-unused-vars
  changeTargetPhoto: (url: string) => void;
};

const LeftEditor = ({ changeTargetPhoto }: Props) => {
  const results = useSelector((state: AppState) => state.results);

  return (
    <div className="w-full lg:w-3/5 order-2 lg:order-1">
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Xem Trước</h2>
          <div className="flex gap-2">
            <a
              href={results.results.length > 0 ? results.results[0].url : SamplePhoto[0].url}
              download="transformed-image.png"
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải Xuống</span>
            </a>
            <button
              className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 cursor-pointer"
              onClick={() => changeTargetPhoto("")}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Làm ảnh tham chiếu</span>
            </button>
          </div>
        </div>
        <div className="min-h-[300px] lg:min-h-0 lg:flex-1">
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                alt="Result"
                className="max-w-full max-h-full object-contain"
                src={results.results.length > 0 ? results.results[0].url : SamplePhoto[0].url}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftEditor;
