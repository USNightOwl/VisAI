import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { LoaderCircle, User } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import age_variation from "@/assets/sample/age_variation.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import ButtonConvertWithOption from "../button-convert-with-option";
import { AgeVariationOptions } from "@/constants/options";
import SampleOneInput from "@/components/sample/sample-one-input";
import { useTranslation } from "react-i18next";

const ButtonAge = () => {
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
        const res = await runGeminiConvertImage(
          promptData["age-variance"].replace("{prompt}", prompt),
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
      options={AgeVariationOptions}
      id={"button-age"}
      className="bg-purple-600 hover:bg-purple-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title={t("edit.title.age-variation")}
      handleClick={handleClick}
      referencePhoto={default_img}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <User className="w-4 h-4" />}
          {t("edit.age-variation")}
        </>
      }
    >
      <SampleOneInput input={default_img} result={age_variation} />
    </ButtonConvertWithOption>
  );
};

export default ButtonAge;
