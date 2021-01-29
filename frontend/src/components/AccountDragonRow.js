import React, { useState } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";
import { BACKEND } from "../config";

const AccountDragonRow = ({ dragon }) => {
  const [nickname, setNickname] = useState(dragon.nickname);
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleUpdate = (e) => {
    setNickname(e.target.value);
  };

  const updateDragon = () => {
    fetch(`${BACKEND.ADDRESS}/dragon/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dragonId: dragon.dragonId,
        nickname,
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
        onChange={handleUpdate}
        disabled={!edit}
      />
      <br />
      <DragonAvatar dragon={dragon} />

      {edit ? (
        <Button bsStyle="primary" onClick={updateDragon}>
          Save
        </Button>
      ) : (
        <Button onClick={toggleEdit}>Edit</Button>
      )}
    </div>
  );
};

export default AccountDragonRow;
