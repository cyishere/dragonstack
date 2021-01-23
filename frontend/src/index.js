import React from "react";
import { render } from "react-dom";
import Generation from "./components/Generation";
import Dragon from "./components/Dragon";

render(
  <div>
    <h2>Dragon Stack from React</h2>
    <Generation />
    <hr />
    <Dragon />
  </div>,
  document.getElementById("root")
);
