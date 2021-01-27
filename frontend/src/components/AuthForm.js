import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../slices/accountSlice";
import fetchStates from "../slices/fetchStates";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { status, message } = useSelector((state) => state.account);

  const dispatch = useDispatch();

  const handleSignup = () => {
    dispatch(signup({ username, password }));
    setUsername("");
    setPassword("");
  };

  const handleLogin = () => {
    console.log({ username });
    console.log({ password });
  };

  return (
    <div>
      <h2>Dragon Stack</h2>
      <FormGroup>
        <FormControl
          type="text"
          value={username}
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <FormControl
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <div>
        <Button onClick={handleLogin}>Log In</Button>
        <span> or </span>
        <Button onClick={handleSignup}>Sign Up</Button>
      </div>
      {status === fetchStates.error && (
        <p style={{ color: "red" }}>{message}</p>
      )}
      {status === fetchStates.success && (
        <p style={{ color: "green" }}>{message}</p>
      )}
    </div>
  );
};

export default AuthForm;
