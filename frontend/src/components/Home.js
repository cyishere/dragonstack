import React from "react";
import Generation from "./Generation";
import Dragon from "./Dragon";
import AccountDragons from "./AccountDragons";
import AuthLogout from "./AuthLogout";

const Home = () => {
  return (
    <div>
      <h2>Dragon Stack</h2>
      <Generation />
      <Dragon />
      <hr />
      <AccountDragons />
      <AuthLogout />
    </div>
  );
};

export default Home;
