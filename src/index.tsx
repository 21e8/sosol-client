import "./index.css";
// import * as serviceWorker from "./serviceWorker";
import { App } from "./App";
import React from "react";
import { ThemeProvider } from "./contexts/theme";
import { render } from "react-dom";

import Amplify from "aws-amplify";
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const RootApp = () => (
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

render(<RootApp />, document.getElementById("root"));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
