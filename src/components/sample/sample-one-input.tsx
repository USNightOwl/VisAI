import { ArrowRight } from "lucide-react";

type Props = {
  input: string;
  result: string;
};

const SampleOneInput = ({ input, result }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden rounded-md ">
          <img src={input} alt="Input 1" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="text-sm mt-2 text-center font-medium">
          <span className="text-gray-400">Input 1</span>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <ArrowRight className="w-8 h-8 text-gray-300" />
      </div>
      <div className="flex flex-col items-center">
        <div className="w-[100px] h-[100px] flex items-center justify-center overflow-hidden rounded-md border-2 border-green-500">
          <img src={result} alt="Result" className="max-w-full max-h-full object-contain" />
        </div>
        <div className="text-sm mt-2 text-center font-medium">
          <span className="text-green-500">Result</span>
        </div>
      </div>
    </>
  );
};

export default SampleOneInput;
