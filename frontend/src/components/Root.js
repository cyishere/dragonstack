import React from "react";
import Home from "./Home";
import AuthForm from "./AuthForm";

const Root = () => {
  return true ? <Home /> : <AuthForm />;
};

export default Root;
