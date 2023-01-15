import { Main } from "@/pages/main";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <Main />
  </StrictMode>
);
