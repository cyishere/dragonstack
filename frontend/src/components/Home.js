import React from "react";
import { Link } from "react-router-dom";
import Generation from "./Generation";
import Dragon from "./Dragon";
import AccountInfo from "./AccountInfo";
import AuthLogout from "./AuthLogout";

const Home = () => {
  return (
    <div>
      <h2>Dragon Stack</h2>
      <Generation />
      <Dragon />
      <hr />
      <AccountInfo />
      <hr />
      <Link to="/account-dragons">Account Dragons</Link>

      <AuthLogout />
    </div>
  );
};

export default Home;
