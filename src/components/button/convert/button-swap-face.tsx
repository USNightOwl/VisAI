import ButtonConvert from "../button-convert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { LoaderCircle, RefreshCw } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import swap_faces_input from "@/assets/sample/swap_faces_input.webp";
import swap_faces from "@/assets/sample/swap_faces.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import SampleTwoInput from "@/components/sample/sample-two-input";

const ButtonSwapFace = () => {
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const input = useSelector((state: AppState) => state.input);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async () => {
    if (!input.referencePhoto || !input.targetPhoto) return;
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);
    try {
      for (let i = 0; i < input.numberOfImages; i++) {
        const res = await runGeminiConvertImage(promptData["swap-faces"], input.referencePhoto, input.targetPhoto);
        if (i === 0) dispatch(setResult("data:image/png;base64," + res.data));
        else dispatch(pushResult("data:image/png;base64," + res.data));
      }
    } catch (error) {
      parseStatusCode(error as Error);
    } finally {
      dispatch(setIsLoading(false));
      setIsCurrentLoading(false);
    }
  };

  return (
    <ButtonConvert
      id={"button-swap-face"}
      className="bg-blue-600 hover:bg-blue-700"
      isDisabled={input.isLoading || !input.referencePhoto || !input.targetPhoto}
      isLoading={input.isLoading}
      title="Hoán đổi khuôn mặt giữa 2 ảnh"
      handleClick={handleClick}
      referencePhoto={default_img}
      targetPhoto={swap_faces_input}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          Đổi mặt
        </>
      }
    >
      <SampleTwoInput input1={default_img} input2={swap_faces_input} result={swap_faces} />
    </ButtonConvert>
  );
};

export default ButtonSwapFace;
