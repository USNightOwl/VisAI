import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { LoaderCircle, Image } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import change_background from "@/assets/sample/change_background.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import ButtonConvertWithOption from "../button-convert-with-option";
import { BackgroundOptions } from "@/constants/options";
import SampleOneInput from "@/components/sample/sample-one-input";

const ButtonChangeBackground = () => {
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
          promptData["change-background"].replace("{prompt}", prompt),
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
      options={BackgroundOptions}
      id={"button-change-background"}
      className="bg-orange-600 hover:bg-orange-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title="Thay đổi phông nền của ảnh"
      handleClick={handleClick}
      referencePhoto={default_img}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Image className="w-4 h-4" />}
          Thay đổi nền
        </>
      }
    >
      <SampleOneInput input={default_img} result={change_background} />
    </ButtonConvertWithOption>
  );
};

export default ButtonChangeBackground;
