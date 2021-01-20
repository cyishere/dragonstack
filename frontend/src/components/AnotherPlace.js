import React from "react";
import { Link } from "react-router-dom";

const AnotherPlace = () => {
  return (
    <div>
      This is another place. Back to <Link to="/">home</Link>.
    </div>
  );
};

export default AnotherPlace;
