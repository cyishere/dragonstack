import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { BACKEND } from "../config";

const AccountDragonRow = ({ dragon }) => {
  const [nickname, setNickname] = useState(dragon.nickname);
  const [isPublic, setIsPublic] = useState(dragon.isPublic);
  const [saleValue, setSaleValue] = useState(dragon.saleValue);
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleUpdateNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleUpdateSaleValue = (e) => {
    setSaleValue(e.target.value);
  };

  const handleUpdateIsPublic = (e) => {
    setIsPublic(e.target.checked);
  };

  const updateDragon = () => {
    fetch(`${BACKEND.ADDRESS}/dragon/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dragonId: dragon.dragonId,
        nickname,
        isPublic,
        saleValue,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.type === "error") {
          alert(json.message);
        } else {
          toggleEdit();
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div>
      <input
        type="text"
        value={nickname}
        onChange={handleUpdateNickname}
        disabled={!edit}
      />
      <br />
      <DragonAvatar dragon={dragon} />

      <div>
        <span>
          Sale Value:{" "}
          <input
            type="number"
            value={saleValue}
            disabled={!edit}
            onChange={handleUpdateSaleValue}
          />
        </span>{" "}
        <span>
          Public:{" "}
          <input
            type="checkbox"
            disabled={!edit}
            checked={isPublic}
            onChange={handleUpdateIsPublic}
          />
        </span>
        {edit ? (
          <Button bsStyle="primary" onClick={updateDragon}>
            Save
          </Button>
        ) : (
          <Button onClick={toggleEdit}>Edit</Button>
        )}
      </div>
    </div>
  );
};

export default AccountDragonRow;
