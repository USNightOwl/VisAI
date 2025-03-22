import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { Building2, LoaderCircle } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import tv_presenter from "@/assets/sample/tv_presenter.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import ButtonConvertWithOption from "../button-convert-with-option";
import SampleOneInput from "@/components/sample/sample-one-input";
import { JobRoleOptions } from "@/constants/job_roles_prompt";
import { useTranslation } from "react-i18next";

const ButtonJob = () => {
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
        const res = await runGeminiConvertImage(prompt, input.referencePhoto);
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
      options={JobRoleOptions}
      id={"button-job"}
      className="bg-indigo-600 hover:bg-indigo-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title={t("edit.title.job")}
      handleClick={handleClick}
      referencePhoto={default_img}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Building2 className="w-4 h-4" />}
          {t("edit.job")}
        </>
      }
    >
      <SampleOneInput input={default_img} result={tv_presenter} />
    </ButtonConvertWithOption>
  );
};

export default ButtonJob;
