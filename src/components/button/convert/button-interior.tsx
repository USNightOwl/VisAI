import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { House, LoaderCircle } from "lucide-react";
import interior from "@/assets/sample/interior.webp";
import interior_design from "@/assets/sample/interior_design.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import ButtonConvertWithOption from "../button-convert-with-option";
import { InteriorOptions } from "@/constants/options";
import SampleOneInput from "@/components/sample/sample-one-input";

const ButtonInterior = () => {
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
          promptData["interior-design"].replace("{prompt}", prompt),
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
      options={InteriorOptions}
      id={"button-interior"}
      className="bg-sky-600 hover:bg-sky-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title="Đổi phong cách nội thất"
      handleClick={handleClick}
      referencePhoto={interior}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <House className="w-4 h-4" />}
          Nội thất
        </>
      }
    >
      <SampleOneInput input={interior} result={interior_design} />
    </ButtonConvertWithOption>
  );
};

export default ButtonInterior;
