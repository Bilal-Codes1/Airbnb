import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { ContextProvider } from "./Context/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Router>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Router>
  </ContextProvider>
);
