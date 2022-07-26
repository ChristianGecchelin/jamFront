import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import { AuthProviderWrapper } from "./context/auth.context"; // <== IMPORT
import { JamProviderWrapper } from "./context/jams.context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <JamProviderWrapper>
        <App />
        </JamProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();