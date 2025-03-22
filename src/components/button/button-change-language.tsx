import { GlobalContext } from "@/contexts/global-context";
import { ELanguage } from "@/types/language";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

const ButtonChangeLanguage = ({ isFull = false }: { isFull?: boolean }) => {
  const { language, setLanguage } = useContext(GlobalContext)!;
  const [, i18n] = useTranslation("global");
  const handleClick = () => {
    const name = language === ELanguage.VI ? ELanguage.EN : ELanguage.VI;
    setLanguage(name);
    i18n.changeLanguage(name);
  };

  return (
    <button
      className={`py-1 px-3 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer uppercase ${isFull && "w-full"}`}
      onClick={handleClick}
    >
      {language === ELanguage.VI ? ELanguage.VI : ELanguage.EN}
    </button>
  );
};

export default ButtonChangeLanguage;
