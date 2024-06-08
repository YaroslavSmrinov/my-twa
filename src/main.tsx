import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
// this manifest is used temporarily for development purposes
const manifestUrl =
  "https://yaroslavsmrinov.github.io/my-twa/tonconnect-manifest.json";
  // Ссылка на джсон с информацией о приложении. 
  // Там хранится юрл и иконка приложения 

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
  </TonConnectUIProvider>
);
