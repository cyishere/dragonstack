import React from "react";
import Home from "./Home";
import AuthForm from "./AuthForm";
import { useSelector } from "react-redux";

const Root = () => {
  const { loggedIn } = useSelector((state) => state.account);

  return loggedIn ? <Home /> : <AuthForm />;
};

export default Root;
