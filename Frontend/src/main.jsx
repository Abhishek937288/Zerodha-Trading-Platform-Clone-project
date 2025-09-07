import { StrictMode } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ThemePanel } from "@radix-ui/themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Themepanel from "./Components/Commoncompo/Themepanel";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Theme>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
        {/* <ThemePanel/> */}
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
