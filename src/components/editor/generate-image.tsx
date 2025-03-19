import { runGeminiGenerateImage, runGeminiGeneratePrompt } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { AppDispatch } from "@/store";
import { setResult } from "@/store/result";
import { ChevronLeft, Sparkles, WandSparkles } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";

/* eslint-disable no-unused-vars */
type Props = {
  isLoading: boolean;
  changeStateLoading: (state: boolean) => void;
};

const GenerateImage = ({ isLoading, changeStateLoading }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [prompt, setPrompt] = useState("Ảnh chân dung cô gái đứng ở bãi biển");
  const dispatch = useDispatch<AppDispatch>();

  const handleGeneratePrompt = async () => {
    changeStateLoading(true);

    try {
      const res = await runGeminiGeneratePrompt(JSON.stringify(promptData["generate-content"]));
      setPrompt(res);
    } catch (error) {
      console.log(error);
    } finally {
      changeStateLoading(false);
    }
  };

  const handleGenerateImages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    changeStateLoading(true);
    try {
      // Call the API to generate images
      const res = await runGeminiGenerateImage(
        JSON.stringify(promptData["generate-image"]).replace("{prompt}", prompt),
      );
      dispatch(setResult("data:image/png;base64," + res.data));
    } catch (error) {
      console.log(error);
    } finally {
      changeStateLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h2 className="text-xl font-semibold">Biến Đổi</h2>
        <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
          <ChevronLeft className={`w-5 h-5 transform ${isOpen ? "rotate-90" : "-rotate-90"}`} />
        </button>
      </div>
      {isOpen && (
        <div className="mt-3">
          <form className="space-y-3" onSubmit={handleGenerateImages}>
            <div>
              <textarea
                placeholder="Mô tả hình ảnh bạn muốn tạo..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              />
            </div>
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-2">
              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-sm font-medium w-full md:w-1/2 text-white ${isLoading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-purple-600 hover:bg-purple-700"}`}
                onClick={handleGeneratePrompt}
                disabled={isLoading}
              >
                <span className="flex flex-row items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Gợi Ý Ngẫu Nhiên
                </span>
              </button>
              <button
                type="submit"
                className={`px-3 py-1.5 rounded-lg text-white text-sm font-medium w-full md:w-1/2 ${isLoading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-600 hover:bg-blue-700"}`}
                disabled={isLoading}
              >
                <span className="flex flex-row items-center justify-center">
                  <WandSparkles className="w-4 h-4 mr-2" />
                  Tạo Ảnh
                </span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default GenerateImage;
