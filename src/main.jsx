import React from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./components/router"; // Import your AppRouter
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppRouter /> {/* Use AppRouter instead of BrowserRouter here */}
  </React.StrictMode>
);


