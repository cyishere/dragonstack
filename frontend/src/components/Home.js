import React from "react";
import { Link } from "react-router-dom";
import Generation from "./Generation";
import Dragon from "./Dragon";
import AuthLogout from "./AuthLogout";

const Home = () => {
  return (
    <div>
      <h2>Dragon Stack</h2>
      <Generation />
      <Dragon />
      <hr />
      <Link to="/account-dragons">Account Dragons</Link>

      <AuthLogout />
    </div>
  );
};

export default Home;
