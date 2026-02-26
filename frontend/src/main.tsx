import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// ===== HIDE CONSOLE IN PRODUCTION =====
if (import.meta.env.PROD) {
  console.clear();

  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
}

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);