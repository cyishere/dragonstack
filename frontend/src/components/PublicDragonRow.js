import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { BACKEND } from "../config";
import MatingOptions from "./MatingOptions";

const PublicDragonRow = ({ dragon }) => {
  const [displayMatingOptions, setDisplayMatingOptions] = useState(false);

  const toggleDisplayMatingOptions = () => {
    setDisplayMatingOptions(!displayMatingOptions);
  };

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
      <div>
        <span>Sale Value: {dragon.saleValue}</span>
        {" | "}
        <span>Sire Value: {dragon.sireValue}</span>
      </div>
      <br />
      <Button bsStyle="primary" onClick={handleBuy}>
        Buy
      </Button>{" "}
      <Button onClick={toggleDisplayMatingOptions}>Sire</Button>
      <br />
      {displayMatingOptions && <MatingOptions />}
    </div>
  );
};

export default PublicDragonRow;
