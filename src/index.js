import react from "react";
import reactDom from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

const root = reactDom.createRoot(document.getElementById("root"));
root.render(
  <react.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </react.StrictMode>
);
