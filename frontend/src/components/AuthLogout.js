import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logout } from "../slices/accountSlice";

const AuthLogout = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return <Button onClick={handleLogout}>Log Out</Button>;
};

export default AuthLogout;
