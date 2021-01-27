import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDragon } from "../slices/dragonSlice";
import DragonAvatar from "./DragonAvatar";

const Dragon = () => {
  const dragon = useSelector((state) => state.dragon);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDragon());
  }, []);

  const handleClickNew = () => {
    dispatch(fetchDragon());
  };

  return (
    <div>
      <Button bsStyle="primary" onClick={handleClickNew}>
        New Dragon
      </Button>
      <DragonAvatar dragon={dragon} />
    </div>
  );
};

export default Dragon;
