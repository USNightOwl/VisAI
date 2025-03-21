import path from "@/routes/path";
import { AppDispatch } from "@/store";
import { setReferencePhoto } from "@/store/input";
import { IHistory } from "@/types/history";
import { formatDate } from "@/utils/convert";
import { Download, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface Props extends IHistory {
  // eslint-disable-next-line no-unused-vars
  handleDelete: (id: string) => void;
}

const HistoryCard = ({ id, imageDataUrl, timestamp, handleDelete }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSetReferencePhoto = () => {
    dispatch(setReferencePhoto(imageDataUrl));
    navigate(path.HOME);
  };

  return (
    <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden flex flex-col">
      <div
        className="relative group cursor-pointer h-48 flex items-center justify-center bg-gray-100"
        onClick={handleSetReferencePhoto}
      >
        <img
          src={imageDataUrl}
          alt={`Image from ${formatDate(timestamp)}`}
          className="max-w-full max-h-48 object-contain"
        />
        <div className="absolute inset-0 bg-black/40 bg-opacity-0 group-hover:bg-opacity-40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
          <span className="bg-white px-3 py-1 rounded-full text-sm font-medium">Nhấp để sử dụng</span>
        </div>
      </div>
      <div className="p-3">
        <div className="text-xs text-gray-500 mb-2">{formatDate(timestamp)}</div>
        <div className="flex justify-between">
          <a
            href={imageDataUrl}
            download={`img-${id}.png`}
            className="text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            <Download className="w-5 h-5" />
          </a>
          <button className="text-red-600 hover:text-red-800 cursor-pointer" onClick={() => handleDelete(id)}>
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
