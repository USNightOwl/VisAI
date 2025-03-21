import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import ButtonZoom from "../button/convert/button-zoom";
import ButtonExpand from "../button/convert/button-expand";
import ButtonSwapFace from "../button/convert/button-swap-face";
import ButtonVton from "../button/convert/button-vton";
import ButtonProductAdvertising from "../button/convert/button-product-advertising";
import ButtonAddAccessories from "../button/convert/button-add-accessories";
import ButtonProductDecorate from "../button/convert/button-product-decorate";
import ButtonInterior from "../button/convert/button-interior";
import ButtonPose from "../button/convert/button-pose";
import ButtonFaceExpression from "../button/convert/button-face-expression";
import ButtonAge from "../button/convert/button-age";
import ButtonChangeBackground from "../button/convert/button-change-background";
import ButtonJob from "../button/convert/button-job";
import ButtonCustom from "../button/convert/button-custom";
import { useTranslation } from "react-i18next";

const ConvertImageGroup = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [t] = useTranslation("global");

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-xl font-semibold">{t("edit.transformation")}</h2>
        <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <ChevronLeft className={`w-5 h-5 transform ${isOpen ? "rotate-90" : "-rotate-90"}`} />
        </button>
      </div>
      {isOpen && (
        <div className="mt-3">
          <div className="grid grid-cols-2 gap-3">
            {/* Zoom */}
            <ButtonZoom />
            <ButtonExpand />
            <ButtonSwapFace />
            <ButtonVton />
            <ButtonProductAdvertising />
            <ButtonAddAccessories />
            <ButtonProductDecorate />
            <ButtonInterior />
            <ButtonPose />
            <ButtonFaceExpression />
            <ButtonAge />
            <ButtonChangeBackground />
            <ButtonJob />
            <ButtonCustom />
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvertImageGroup;
