import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicDragons } from "../slices/publicDragons";
import PublicDragonRow from "./PublicDragonRow";

const PublicDragons = () => {
  const { dragons } = useSelector((state) => state.publicDragons);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPublicDragons());
  }, []);

  return (
    <div>
      <h3>Public Dragons</h3>

      {dragons.map((dragon) => (
        <div key={dragon.dragonId}>
          <PublicDragonRow dragon={dragon} />
          <hr />
        </div>
      ))}

      <Link to="/">Home</Link>
    </div>
  );
};

export default PublicDragons;
