import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { Glasses, LoaderCircle } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import accessories_input from "@/assets/sample/accessories_input.webp";
import accessories from "@/assets/sample/accessories.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import SampleTwoInput from "@/components/sample/sample-two-input";
import ButtonConvertWithOption from "../button-convert-with-option";
import { AccessoriesOptions } from "@/constants/options";

const ButtonAddAccessories = () => {
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const input = useSelector((state: AppState) => state.input);
  const dispatch = useDispatch<AppDispatch>();
  const handleClick = async (prompt: string) => {
    if (!input.referencePhoto || !input.targetPhoto) return;
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);
    try {
      for (let i = 0; i < input.numberOfImages; i++) {
        const res = await runGeminiConvertImage(
          promptData["add-accessories"].replace("{prompt}", prompt),
          input.referencePhoto,
          input.targetPhoto,
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
      options={AccessoriesOptions}
      id={"button-add-accessories"}
      className="bg-teal-600 hover:bg-teal-700"
      isDisabled={input.isLoading || !input.referencePhoto || !input.targetPhoto}
      isLoading={input.isLoading}
      title="Thêm phụ kiện cho người trong ảnh"
      handleClick={handleClick}
      referencePhoto={default_img}
      targetPhoto={accessories_input}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Glasses className="w-4 h-4" />}
          Phụ kiện
        </>
      }
    >
      <SampleTwoInput input1={default_img} input2={accessories_input} result={accessories} />
    </ButtonConvertWithOption>
  );
};

export default ButtonAddAccessories;
