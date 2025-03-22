import { useLocalStorageState } from "@/hooks/use-localstorage-state";
import { ELanguage } from "@/types/language";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

interface GlobalContextType {
  apiKey: string;
  language: ELanguage;
  setApiKey: Dispatch<SetStateAction<string>>;
  setLanguage: Dispatch<SetStateAction<ELanguage>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react/prop-types
const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [apiKey, setApiKey] = useLocalStorageState({
    key: "apiKey",
    initialState: "",
  });
  const [language, setLanguage] = useLocalStorageState({
    key: "language",
    initialState: ELanguage.VI,
  });

  return (
    <GlobalContext.Provider
      value={{
        apiKey,
        setApiKey,
        language,
        setLanguage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
