import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { BACKEND } from "../config";

const MatingOptions = ({ patronDragonId }) => {
  const { dragons } = useSelector((state) => state.accountDragons);

  const history = useHistory();

  const mate = ({ matronDragonId, patronDragonId }) => () => {
    fetch(`${BACKEND.ADDRESS}/dragon/mate`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ matronDragonId, patronDragonId }),
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
      <h4>Pick one of your dragons to mate with:</h4>
      {dragons.map((dragon) => {
        const { generationId, dragonId, nickname } = dragon;

        return (
          <span key={dragonId}>
            <Button
              onClick={mate({ patronDragonId, matronDragonId: dragonId })}
            >
              G{generationId}.I{dragonId}.{nickname}
            </Button>{" "}
          </span>
        );
      })}
    </div>
  );
};

export default MatingOptions;
