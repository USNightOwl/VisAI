import ButtonConvert from "../button-convert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "@/store";
import { LoaderCircle, ShoppingBag } from "lucide-react";
import default_img from "@/assets/sample/default.webp";
import product_ad_input from "@/assets/sample/product_ad_input.webp";
import product_ad from "@/assets/sample/product_ad.webp";
import { runGeminiConvertImage } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { setIsLoading } from "@/store/input";
import { parseStatusCode } from "@/utils/convert";
import { pushResult, setResult } from "@/store/result";
import { useState } from "react";
import SampleTwoInput from "@/components/sample/sample-two-input";
import { useTranslation } from "react-i18next";

const ButtonProductAdvertising = () => {
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
        const res = await runGeminiConvertImage(
          promptData["product-advertising"],
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
    <ButtonConvert
      id={"button-product-advertising"}
      className="bg-purple-600 hover:bg-purple-700"
      isDisabled={input.isLoading || !input.referencePhoto || !input.targetPhoto}
      isLoading={input.isLoading}
      title={t("edit.title.product-ad")}
      handleClick={handleClick}
      referencePhoto={default_img}
      targetPhoto={product_ad_input}
      name={
        <>
          {isCurrentLoading ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
          {t("edit.product-ad")}
        </>
      }
    >
      <SampleTwoInput input1={default_img} input2={product_ad_input} result={product_ad} />
    </ButtonConvert>
  );
};

export default ButtonProductAdvertising;
