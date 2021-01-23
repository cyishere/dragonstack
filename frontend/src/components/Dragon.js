import React, { useEffect, useState } from "react";
import DragonAvatar from "./DragonAvatar";

const DEFAULT_DRAGON = {
  dragonId: "",
  generationId: "",
  nickname: "",
  birthdate: "",
  traits: [],
};

const Dragon = () => {
  const [dragon, setDragon] = useState(DEFAULT_DRAGON);

  const fetchDragon = () => {
    fetch("http://localhost:3001/dragon/new")
      .then((response) => response.json())
      .then((json) => setDragon(json.dragon))
      .catch((error) => console.error("error:", error));
  };

  useEffect(() => {
    fetchDragon();
  }, []);

  return <DragonAvatar dragon={dragon} />;
};

export default Dragon;
