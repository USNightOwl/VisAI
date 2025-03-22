import ButtonConvert from "../button-convert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { Camera, LoaderCircle } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import fashion_pose from "@/assets/sample/fashion_pose.webp";
import SampleOneInput from "@/components/sample/sample-one-input";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ButtonPose = () => {
  const [t] = useTranslation("global");
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const input = useSelector((state: AppState) => state.input);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async () => {
    if (!input.referencePhoto) return;
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);
    try {
      for (let i = 0; i < input.numberOfImages; i++) {
        const res = await runGeminiConvertImage(promptData["fasion-pose"], input.referencePhoto);
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
      id={"button-pose"}
      className="bg-pink-600 hover:bg-pink-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title={t("edit.title.fashion-pose")}
      handleClick={handleClick}
      referencePhoto={default_img}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
          {t("edit.fashion-pose")}
        </>
      }
    >
      <SampleOneInput input={default_img} result={fashion_pose} />
    </ButtonConvert>
  );
};

export default ButtonPose;
