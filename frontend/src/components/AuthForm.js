import React, { useState } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log({ username });
    console.log({ password });
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
    </div>
  );
};

export default AuthForm;
