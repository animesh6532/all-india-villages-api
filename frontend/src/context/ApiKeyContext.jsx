import { createContext, useContext, useMemo, useState } from "react";

const ApiKeyContext = createContext(null);

export function ApiKeyProvider({ children }) {
  const [credentials, setCredentials] = useState({
    apiKey: localStorage.getItem("aiv_api_key") || "demo_key_123456",
    apiSecret: localStorage.getItem("aiv_api_secret") || "demo_secret_123456"
  });

  const value = useMemo(
    () => ({
      credentials,
      saveCredentials(nextCredentials) {
        localStorage.setItem("aiv_api_key", nextCredentials.apiKey);
        localStorage.setItem("aiv_api_secret", nextCredentials.apiSecret);
        setCredentials(nextCredentials);
      }
    }),
    [credentials]
  );

  return <ApiKeyContext.Provider value={value}>{children}</ApiKeyContext.Provider>;
}

export function useApiKey() {
  const context = useContext(ApiKeyContext);
  if (!context) {
    throw new Error("useApiKey must be used inside ApiKeyProvider");
  }
  return context;
}
