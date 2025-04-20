import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'; // This line is crucial

// Render the app after handling redirect
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/AssessmentNinja">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
