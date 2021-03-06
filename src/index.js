import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.js";
import Dashboard from "./dashboard/Dashboard.js";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Dashboard title="Default Scene" />, document.getElementById("dashboard"));
