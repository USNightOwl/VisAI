import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { LoaderCircle, WandSparkles } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import custom from "@/assets/sample/custom.webp";
import SampleOneInput from "@/components/sample/sample-one-input";
import { runGeminiConvertImage } from "@/config/gemini";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import ButtonConvertWithPrompt from "../button-convert-with-prompt";
import { useTranslation } from "react-i18next";

const ButtonCustom = () => {
  const [t] = useTranslation("global");
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const input = useSelector((state: AppState) => state.input);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async (prompt: string) => {
    if (!input.referencePhoto) return;
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);
    try {
      for (let i = 0; i < input.numberOfImages; i++) {
        let res;
        if (input.targetPhoto) res = await runGeminiConvertImage(prompt, input.referencePhoto, input.targetPhoto);
        else res = await runGeminiConvertImage(prompt, input.referencePhoto);
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
    <ButtonConvertWithPrompt
      id={"button-custom"}
      className="bg-gray-600 hover:bg-gray-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title={t("edit.title.custom")}
      handleClick={handleClick}
      referencePhoto={default_img}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <WandSparkles className="w-4 h-4" />}
          {t("edit.custom")}
        </>
      }
    >
      <SampleOneInput input={default_img} result={custom} />
    </ButtonConvertWithPrompt>
  );
};

export default ButtonCustom;
