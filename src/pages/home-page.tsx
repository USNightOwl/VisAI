import LeftEditor from "@/components/editor/left-editor";
import RightEditor from "@/components/editor/right-editor";
import { useState } from "react";

const HomePage = () => {
  const [referencePhoto, setReferencePhoto] = useState<string | null>(null);
  const [targetPhoto, setTargetPhoto] = useState<string | null>(null);
  const [numberOfImages, setNumberOfImages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const changeReferencePhoto = (url: string | null) => {
    setReferencePhoto(url);
  };

  const changeTargetPhoto = (url: string | null) => {
    setTargetPhoto(url);
  };

  const changeStateLoading = (state: boolean) => {
    setIsLoading(state);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <LeftEditor changeTargetPhoto={changeTargetPhoto} />
        <RightEditor
          referencePhoto={referencePhoto}
          targetPhoto={targetPhoto}
          numberOfImages={numberOfImages}
          isLoading={isLoading}
          changeStateLoading={changeStateLoading}
          setNumberOfImages={setNumberOfImages}
          changeTargetPhoto={changeTargetPhoto}
          changeReferencePhoto={changeReferencePhoto}
        />
      </div>
    </div>
  );
};

export default HomePage;
