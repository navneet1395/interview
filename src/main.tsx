import { createRoot } from "react-dom/client";
import React from "react";
import App from "./App";
import "./App.scss";
import "./style.scss";

try {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element is missing.");
  }

  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} catch (error) {
  console.error("Error rendering the app:", error);
}
