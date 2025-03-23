import { GlobalContext } from "@/contexts/global-context";
import { AppDispatch } from "@/store";
import { setReferencePhoto, setTargetPhoto } from "@/store/input";
import { ELanguage } from "@/types/language";
import { IOption } from "@/types/option";
import { convertImageToBase64 } from "@/utils/convert";
import { X } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
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
  // eslint-disable-next-line no-unused-vars
  handleClick: (prompt: string) => void;
  options: IOption[];
};

const ButtonConvertWithOption = ({
  id,
  referencePhoto,
  targetPhoto,
  name,
  title,
  children,
  handleClick,
  options,
  className = "",
  isDisabled = true,
  isLoading = false,
}: Props) => {
  const [t] = useTranslation("global");
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useContext(GlobalContext)!;

  const handleChangeInputPhoto = () => {
    convertImageToBase64(referencePhoto)
      .then((base64) => {
        dispatch(setReferencePhoto(base64));
      })
      .catch((error) => {
        console.error(error);
        toast.error(t("toast.error.image-sample"));
      });
    if (targetPhoto) {
      convertImageToBase64(targetPhoto)
        .then((base64) => {
          dispatch(setTargetPhoto(base64));
          toast.success(t("toast.success.image-sample"));
        })
        .catch((error) => {
          console.error(error);
          toast.error(t("toast.error.image-sample"));
        });
    }
  };

  const handleSelect = (option: IOption) => {
    handleClick(option.prompt);
    setIsOpen(false);
  };

  return (
    <>
      <button
        className={`flex flex-col items-center justify-center gap-1 p-2 rounded-lg text-white font-medium h-10 ${isDisabled ? "bg-gray-400" : className} ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
        disabled={isDisabled}
        id={id}
        data-tooltip-delay-show={300}
        onClick={() => setIsOpen(true)}
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
                {t("use-same-image")}
              </button>
            </div>
          </div>
        </div>
      </Tooltip>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-1000" onClick={() => setIsOpen(false)}></div>
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-3xl shadow-xl z-1000">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">{t("select-edit")}</h2>
              <button className="text-gray-400 hover:text-gray-600 cursor-pointer" onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-3 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="py-4 px-6 text-base text-center rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer"
                    onClick={() => handleSelect(option)}
                  >
                    {language === ELanguage.VI ? option.name_vi : option.name_en}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ButtonConvertWithOption;
