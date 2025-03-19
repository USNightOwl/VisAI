import LeftEditor from "@/components/editor/left-editor";
import RightEditor from "@/components/editor/right-editor";

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-4">
        <LeftEditor />
        <RightEditor />
      </div>
    </div>
  );
};

export default HomePage;
