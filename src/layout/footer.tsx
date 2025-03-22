import { useTranslation } from "react-i18next";

const Footer = () => {
  const [t] = useTranslation("global");
  return (
    <footer className="bg-white shadow-sm p-3">
      <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
        © VisAI <span className="text-sm text-gray-500">{t("footer")}</span>
      </div>
    </footer>
  );
};

export default Footer;
