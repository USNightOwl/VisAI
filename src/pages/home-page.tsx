import LeftEditor from "@/components/editor/left-editor";
import RightEditor from "@/components/editor/right-editor";
import { SamplePhoto } from "@/constants/sample-photo";
import { useState } from "react";

const HomePage = () => {
  const [referencePhoto, setReferencePhoto] = useState<string | null>(null);
  const [targetPhoto, setTargetPhoto] = useState<string | null>(null);
  const [resultsPhoto, setResultsPhoto] = useState<string[]>([SamplePhoto[0].url]);
  const [numberOfImages, setNumberOfImages] = useState(1);

  const changeReferencePhoto = (url: string | null) => {
    setReferencePhoto(url);
  };

  const changeTargetPhoto = (url: string | null) => {
    setTargetPhoto(url);
  };

  const changeResultsPhoto = (urls: string[]) => {
    setResultsPhoto([...urls]);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <LeftEditor urls={resultsPhoto} changeTargetPhoto={changeTargetPhoto} />
        <RightEditor
          referencePhoto={referencePhoto}
          targetPhoto={targetPhoto}
          numberOfImages={numberOfImages}
          setNumberOfImages={setNumberOfImages}
          changeTargetPhoto={changeTargetPhoto}
          changeReferencePhoto={changeReferencePhoto}
          changeResultsPhoto={changeResultsPhoto}
        />
      </div>
    </div>
  );
};

export default HomePage;
