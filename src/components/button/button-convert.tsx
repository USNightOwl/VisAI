import { AppDispatch } from "@/store";
import { setReferencePhoto, setTargetPhoto } from "@/store/input";
import { convertImageToBase64 } from "@/utils/convert";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";

type Props = {
  id: string;
  children: React.ReactNode;
  className?: string;
  isDisabled?: boolean;
  title: string;
  name: React.ReactNode;
  isLoading?: boolean;
  referencePhoto: string;
  targetPhoto?: string;
  handleClick: () => void;
};

const ButtonConvert = ({
  id,
  referencePhoto,
  targetPhoto,
  name,
  title,
  children,
  handleClick,
  className = "",
  isDisabled = true,
  isLoading = false,
}: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeInputPhoto = () => {
    convertImageToBase64(referencePhoto)
      .then((base64) => {
        dispatch(setReferencePhoto(base64));
      })
      .catch((error) => {
        console.error(error);
        toast.error("Có lỗi xảy ra khi tải ảnh mẫu");
      });
    if (targetPhoto) {
      convertImageToBase64(targetPhoto)
        .then((base64) => {
          dispatch(setTargetPhoto(base64));
          toast.success("Đã tải ảnh mẫu thành công");
        })
        .catch((error) => {
          console.error(error);
          toast.error("Có lỗi xảy ra khi tải ảnh mẫu");
        });
    }
  };

  return (
    <>
      <button
        className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-white font-medium h-10 ${isDisabled ? "bg-gray-400" : className} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        disabled={isDisabled}
        id={id}
        onClick={handleClick}
      >
        <span className="text-sm flex items-center gap-2">{name}</span>
      </button>
      <Tooltip
        anchorSelect={`#${id}`}
        clickable
        opacity={1}
        style={{ padding: 0, borderRadius: "0.375rem", backgroundColor: "#111827" }}
      >
        <div className="bg-gray-900 opacity-100 flex flex-col items-center p-3 shadow-lg rounded-md">
          <div className="flex flex-col items-center" style={{ minWidth: "360px" }}>
            <p className="mb-4 text-lg font-semibold w-full text-center">{title}</p>
            <div className="flex flex-col">
              <div className="flex items-center justify-center gap-2 bg-gray-900 p-5 rounded-lg">{children}</div>
              <button
                className={`mt-2 py-2 px-4 text-white rounded-md transition-colors text-sm ${isLoading ? "bg-gray-400 cursor-not-allowed" : "cursor-pointer bg-blue-600 hover:bg-blue-700"}`}
                disabled={isLoading}
                onClick={handleChangeInputPhoto}
              >
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
