import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

const MatingOptions = () => {
  const { dragons } = useSelector((state) => state.accountDragons);

  return (
    <div>
      <h4>Pick one of your dragons to mate with:</h4>
      {dragons.map((dragon) => {
        const { generationId, dragonId, nickname } = dragon;

        return (
          <span key={dragonId}>
            <Button>
              G{generationId}.I{dragonId}.{nickname}
            </Button>{" "}
          </span>
        );
      })}
    </div>
  );
};

export default MatingOptions;
