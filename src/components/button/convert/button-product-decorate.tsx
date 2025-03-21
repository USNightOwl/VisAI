import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { Aperture, LoaderCircle } from "lucide-react";
import product_ad_input from "@/assets/sample/product_ad_input.webp";
import product_shot from "@/assets/sample/product_shot.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import ButtonConvertWithOption from "../button-convert-with-option";
import { ProductDecorateOptions } from "@/constants/options";
import SampleOneInput from "@/components/sample/sample-one-input";

const ButtonProductDecorate = () => {
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
          promptData["product-decorate"].replace("{prompt}", prompt),
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
      options={ProductDecorateOptions}
      id={"button-product-decorate"}
      className="bg-rose-600 hover:bg-rose-700"
      isDisabled={input.isLoading || !input.referencePhoto}
      isLoading={input.isLoading}
      title="Đặt sản phẩm vào một vị trí cụ thể"
      handleClick={handleClick}
      referencePhoto={product_ad_input}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Aperture className="w-4 h-4" />}
          Ảnh sản phẩm
        </>
      }
    >
      <SampleOneInput input={product_ad_input} result={product_shot} />
    </ButtonConvertWithOption>
  );
};

export default ButtonProductDecorate;
