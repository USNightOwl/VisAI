import { useLocalStorageState } from "@/hooks/use-localstorage-state";
import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

interface GlobalContextType {
  apiKey: string;
  setApiKey: Dispatch<SetStateAction<string>>;
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

  return (
    <GlobalContext.Provider
      value={{
        apiKey,
        setApiKey,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
