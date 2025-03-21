import path from "@/routes/path";
import { IStorageUsage } from "@/types/history";
import { ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  storageUsage: IStorageUsage;
  resetStorage: () => void;
};

const HistoryHeader = ({ storageUsage, resetStorage }: Props) => {
  return (
    <div className="bg-white shadow-sm p-3 sticky top-0 z-10">
      <div className="mx-auto flex justify-between items-center flex-wrap">
        <Link to={path.HOME}>
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 cursor-pointer">
            <ArrowLeft className="w-5 h-5" />
            <span>
              Quay lại <span className="max-sm:hidden">trình biên tập</span>
            </span>
          </button>
        </Link>
        <div className="flex items-center gap-2">
          <div className="text-xs text-gray-600 hidden md:block">Dung lượng đã sử dụng: {storageUsage.percentage}%</div>
          <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full"
              style={{ width: `${storageUsage.percentage}%`, backgroundColor: storageUsage.color }}
            ></div>
          </div>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
          onClick={resetStorage}
        >
          <Trash2 className="w-4 h-4" />
          <span>Xóa tất cả</span>
        </button>
      </div>
    </div>
  );
};

export default HistoryHeader;
