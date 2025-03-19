import { convertToBase64 } from "@/utils/convert";
import { CircleX, Upload } from "lucide-react";
import { useRef } from "react";

type Props = {
  title: string;
  context: string;
  photo: string | null;
  // eslint-disable-next-line no-unused-vars
  changePhoto: (url: string | null) => void;
};

const UploadFile = ({ title, context, photo, changePhoto }: Props) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        changePhoto(base64);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="mb-3 md:mb-0">
      <h3 className="font-medium mb-2 text-center">{title}</h3>
      <div
        className={`relative border-2 border-dashed border-gray-300 rounded-lg p-3 text-center cursor-pointer transition-colors hover:border-blue-400 h-[150px] flex items-center justify-center ${photo && "border-green-300"}`}
        onClick={handleClick}
      >
        {photo ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <img src={photo} alt="Reference Photo" className="max-h-full max-w-full object-contain" />
            <button
              className="absolute -top-1 -right-2 p-1 text-red-500 hover:text-red-700 bg-white rounded-full shadow-sm cursor-pointer"
              onClick={(e) => {
                changePhoto(null);
                e.stopPropagation();
              }}
            >
              <CircleX className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 text-gray-400 mb-1" />
            <p className="text-sm text-gray-500">{context}</p>
          </div>
        )}
        <input type="file" className="hidden" accept="image/*" ref={fileInputRef} onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default UploadFile;
