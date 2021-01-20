import React from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Generation from "./components/Generation";
import AnotherPlace from "./components/AnotherPlace";

render(
  <BrowserRouter>
    <div>
      <h2>Dragon Stack from React</h2>
      <Route exact path="/" component={Generation} />
      <Route exact path="/another" component={AnotherPlace} />
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
