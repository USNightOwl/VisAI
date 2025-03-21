import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { LoaderCircle, Smile } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import fashion_pose from "@/assets/sample/fashion_pose.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import ButtonConvertWithOption from "../button-convert-with-option";
import { FaceExpressionOptions } from "@/constants/options";
import SampleOneInput from "@/components/sample/sample-one-input";

const ButtonFaceExpression = () => {
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const input = useSelector((state: AppState) => state.input);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async (prompt: string) => {
    if (!input.referencePhoto) return;
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);
    try {
      for (let i = 0; i < input.numberOfImages; i++) {
        const res = await runGeminiConvertImage(
          promptData["face-expression"].replace("{prompt}", prompt),
          input.referencePhoto,
        );
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
    <ButtonConvertWithOption
      options={FaceExpressionOptions}
      id={"button-interior"}
      className="bg-yellow-600 hover:bg-yellow-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title="Thay đổi biểu cảm khuôn mặt"
      handleClick={handleClick}
      referencePhoto={default_img}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Smile className="w-4 h-4" />}
          Biểu cảm
        </>
      }
    >
      <SampleOneInput input={default_img} result={fashion_pose} />
    </ButtonConvertWithOption>
  );
};

export default ButtonFaceExpression;
