import React from "react";
import DragonAvatar from "./DragonAvatar";

const PublicDragonRow = ({ dragon }) => {
  return (
    <div>
      <div>{dragon.nickname}</div>
      <DragonAvatar dragon={dragon} />
      <div>Sale Value: {dragon.saleValue}</div>
    </div>
  );
};

export default PublicDragonRow;
