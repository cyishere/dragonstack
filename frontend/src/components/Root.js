import React from "react";
import Home from "./Home";
import AuthForm from "./AuthForm";

const Root = () => {
  return false ? <Home /> : <AuthForm />;
};

export default Root;
