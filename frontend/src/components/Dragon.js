import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDragon } from "../slices/dragonSlice";
import DragonAvatar from "./DragonAvatar";
import fetchStates from "../slices/fetchStates";

const Dragon = () => {
  const dragon = useSelector((state) => state.dragon);

  const dispatch = useDispatch();

  const handleClickNew = () => {
    dispatch(fetchDragon());
  };

  return (
    <div>
      <Button bsStyle="primary" onClick={handleClickNew}>
        New Dragon
      </Button>

      {dragon.status === fetchStates.error ? (
        <p style={{ color: "red" }}>{dragon.message}</p>
      ) : (
        <DragonAvatar dragon={dragon} />
      )}
    </div>
  );
};

export default Dragon;
