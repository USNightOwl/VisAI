import { Download, RefreshCw } from "lucide-react";

type Props = {
  urls: string[];
  // eslint-disable-next-line no-unused-vars
  changeTargetPhoto: (url: string) => void;
};

const LeftEditor = ({ urls, changeTargetPhoto }: Props) => {
  return (
    <div className="w-full lg:w-3/5 order-2 lg:order-1">
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:h-[calc(100vh-8rem)]">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xl font-semibold">Xem Trước</h2>
          <div className="flex gap-2">
            <a
              href={urls[0]}
              download="transformed-image.png"
              className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Tải Xuống</span>
            </a>
            <button
              className="flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 cursor-pointer"
              onClick={() => changeTargetPhoto(urls[0])}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Làm ảnh tham chiếu</span>
            </button>
          </div>
        </div>
        <div className="min-h-[300px] lg:min-h-0 lg:flex-1">
          <div className="h-full flex flex-col">
            <div className="flex-1 bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center">
              <img alt="Result" className="max-w-full max-h-full object-contain" src={urls[0]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftEditor;
