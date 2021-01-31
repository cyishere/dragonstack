import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { BACKEND } from "../config";

const PublicDragonRow = ({ dragon }) => {
  const history = useHistory();

  const handleBuy = () => {
    const { dragonId, saleValue } = dragon;

    fetch(`${BACKEND.ADDRESS}/dragon/buy`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dragonId, saleValue }),
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json.message);

        if (json.type !== "error") {
          history.push("/account-dragons");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <div>{dragon.nickname}</div>
      <DragonAvatar dragon={dragon} />
      <div>Sale Value: {dragon.saleValue}</div>
      <br />
      <Button onClick={handleBuy}>Buy</Button>
    </div>
  );
};

export default PublicDragonRow;
