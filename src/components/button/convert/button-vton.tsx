import ButtonConvert from "../button-convert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { LoaderCircle, Shirt } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import try_on_input from "@/assets/sample/try_on_input.webp";
import try_on from "@/assets/sample/try_on.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import SampleTwoInput from "@/components/sample/sample-two-input";
import { useTranslation } from "react-i18next";

const ButtonVton = () => {
  const [t] = useTranslation("global");
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const input = useSelector((state: AppState) => state.input);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async () => {
    if (!input.referencePhoto || !input.targetPhoto) return;
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);
    try {
      for (let i = 0; i < input.numberOfImages; i++) {
        const res = await runGeminiConvertImage(promptData["vton"], input.referencePhoto, input.targetPhoto);
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
      id={"button-vton"}
      className="bg-green-600 hover:bg-green-700"
      isDisabled={input.isLoading || !input.referencePhoto || !input.targetPhoto}
      isLoading={input.isLoading}
      title={t("edit.title.try-on")}
      handleClick={handleClick}
      referencePhoto={default_img}
      targetPhoto={try_on_input}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Shirt className="w-4 h-4" />}
          {t("edit.try-on")}
        </>
      }
    >
      <SampleTwoInput input1={default_img} input2={try_on_input} result={try_on} />
    </ButtonConvert>
  );
};

export default ButtonVton;
