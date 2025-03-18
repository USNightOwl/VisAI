import { guideData } from "@/constants/guide";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const SlideModel = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <>
      <div className="mb-6">
        <div className="relative rounded-lg overflow-hidden bg-gray-50">
          <img
            src={guideData[slideIndex].image}
            alt={guideData[slideIndex].alt}
            className="w-auto h-auto object-contain rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-between px-4">
            <button
              className={`p-2 rounded-full bg-white shadow hover:bg-gray-100 cursor-pointer ${slideIndex <= 0 && "invisible"}`}
              onClick={() => setSlideIndex((prev) => prev - 1)}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className={`p-2 rounded-full bg-white shadow hover:bg-gray-100 cursor-pointer ${slideIndex >= guideData.length - 1 && "invisible"}`}
              onClick={() => setSlideIndex((prev) => prev + 1)}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div
          className="text-sm text-gray-600 mt-6 text-center"
          dangerouslySetInnerHTML={{ __html: guideData[slideIndex].description }}
        ></div>
      </div>
      <div className="flex justify-center gap-2 mb-6">
        {guideData.map((_, index) => (
          <button
            className={`h-2 rounded-full transition-all  ${slideIndex === index ? "w-4 bg-blue-600" : "w-2 bg-gray-300 hover:bg-gray-400 cursor-pointer"}`}
            aria-label={`Go to step ${index + 1}`}
            key={index}
            onClick={() => setSlideIndex(index)}
          ></button>
        ))}
      </div>
    </>
  );
};

export default SlideModel;
