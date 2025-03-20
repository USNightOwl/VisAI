import ButtonConvert from "../button-convert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { LoaderCircle, ZoomIn } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import zoom_in_image from "@/assets/sample/zoom_in.webp";
import SampleOneInput from "@/components/sample/sample-one-input";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { setResult } from "@/store/result";
import { useState } from "react";

const ButtonZoom = () => {
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const input = useSelector((state: AppState) => state.input);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async () => {
    if (!input.referencePhoto) return;
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);
    try {
      const res = await runGeminiConvertImage(promptData["zoom-in"], input.referencePhoto);
      dispatch(setResult("data:image/png;base64," + res.data));
    } catch (error) {
      parseStatusCode(error as Error);
    } finally {
      dispatch(setIsLoading(false));
      setIsCurrentLoading(false);
    }
  };

  return (
    <ButtonConvert
      className="bg-amber-600 hover:bg-amber-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title="Phóng to khuôn mặt trong ảnh"
      handleClick={handleClick}
      referencePhoto={default_img}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <ZoomIn className="w-4 h-4" />}
          Phóng to
        </>
      }
    >
      <SampleOneInput input={default_img} result={zoom_in_image} />
    </ButtonConvert>
  );
};

export default ButtonZoom;
