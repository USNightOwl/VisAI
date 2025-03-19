import { runGeminiGenerateImage, runGeminiGeneratePrompt } from "@/config/gemini";
import { promptData } from "@/constants/prompt";
import { AppDispatch, AppState } from "@/store";
import { setIsLoading } from "@/store/input";
import { pushResult, setResult } from "@/store/result";
import { ChevronLeft, LoaderCircle, Sparkles, WandSparkles } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const GeneratePrompt = ({ setPrompt }: { setPrompt: React.Dispatch<React.SetStateAction<string>> }) => {
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const input = useSelector((state: AppState) => state.input);

  const handleGeneratePrompt = async () => {
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);

    try {
      const res = await runGeminiGeneratePrompt(JSON.stringify(promptData["generate-content"]));
      setPrompt(res);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
      setIsCurrentLoading(false);
    }
  };
  return (
    <button
      type="button"
      className={`px-3 py-1.5 rounded-lg text-sm font-medium w-full md:w-1/2 text-white ${input.isLoading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-purple-600 hover:bg-purple-700"}`}
      onClick={handleGeneratePrompt}
      disabled={input.isLoading}
    >
      <span className="flex flex-row items-center justify-center">
        {isCurrentLoading ? (
          <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Sparkles className="w-4 h-4 mr-2" />
        )}
        Gợi Ý Ngẫu Nhiên
      </span>
    </button>
  );
};
const GenerateImage = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCurrentLoading, setIsCurrentLoading] = useState(false);
  const [prompt, setPrompt] = useState("Ảnh chân dung cô gái đứng ở bãi biển");
  const dispatch = useDispatch<AppDispatch>();
  const input = useSelector((state: AppState) => state.input);

  const handleGenerateImages = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setIsLoading(true));
    setIsCurrentLoading(true);

    try {
      // Call the API to generate images
      for (let i = 0; i < input.numberOfImages; i++) {
        const res = await runGeminiGenerateImage(
          JSON.stringify(promptData["generate-image"]).replace("{prompt}", prompt),
        );
        if (i === 0) dispatch(setResult("data:image/png;base64," + res.data));
        else dispatch(pushResult("data:image/png;base64," + res.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setIsLoading(false));
      setIsCurrentLoading(false);
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
              <GeneratePrompt setPrompt={setPrompt} />
              <button
                type="submit"
                className={`px-3 py-1.5 rounded-lg text-white text-sm font-medium w-full md:w-1/2 ${input.isLoading ? "cursor-not-allowed bg-gray-400" : "cursor-pointer bg-blue-600 hover:bg-blue-700"}`}
                disabled={input.isLoading}
              >
                <span className="flex flex-row items-center justify-center">
                  {isCurrentLoading ? (
                    <LoaderCircle className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <WandSparkles className="w-4 h-4 mr-2" />
                  )}
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
