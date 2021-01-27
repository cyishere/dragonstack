import React from "react";
import Generation from "./Generation";
import Dragon from "./Dragon";

const Home = () => {
  return (
    <div>
      <h2>Dragon Stack</h2>
      <Generation />
      <hr />
      <Dragon />
    </div>
  );
};

export default Home;
