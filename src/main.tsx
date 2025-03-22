import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";
import { GlobalProvider } from "./contexts/global-context";
import { store } from "./store";
import { Provider } from "react-redux";
import { I18nextProvider } from "react-i18next";
import i18next from "./translations/i18";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </I18nextProvider>
    </Provider>
  </React.StrictMode>,
);
