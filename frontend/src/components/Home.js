import React from "react";
import Generation from "./Generation";
import Dragon from "./Dragon";
import AuthLogout from "./AuthLogout";

const Home = () => {
  return (
    <div>
      <h2>Dragon Stack</h2>
      <Generation />
      <Dragon />
      <AuthLogout />
    </div>
  );
};

export default Home;
