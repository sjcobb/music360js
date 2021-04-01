import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App.js";
import Dashboard from "./dashboard/Dashboard.js";
import Canvas from "./Canvas.js";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<Dashboard title="Default Scene" />, document.getElementById("dashboard"));

ReactDOM.render(
  <React.StrictMode>
    <Canvas />
  </React.StrictMode>,
  document.getElementById('canvas-root')
);
