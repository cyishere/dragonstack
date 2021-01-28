import React from "react";
import DragonAvatar from "./DragonAvatar";

const AccountDragonRow = ({ dragon }) => {
  return (
    <div>
      <div>{dragon.nickname}</div>
      <br />
      <DragonAvatar dragon={dragon} />
    </div>
  );
};

export default AccountDragonRow;
