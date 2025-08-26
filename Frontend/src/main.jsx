import { StrictMode } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ThemePanel } from "@radix-ui/themes";


import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Themepanel from "./Components/Commoncompo/Themepanel";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <Theme >
      <App />
    
  {/* <ThemePanel/> */}
      </Theme>
    </BrowserRouter>
  </StrictMode>
);
