import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/index.css";
import App from "@/App.tsx";
import {MatrixProvider} from "@/core/provider/MatrixProvider.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <MatrixProvider>
          <App />
      </MatrixProvider>
  </StrictMode>,
)