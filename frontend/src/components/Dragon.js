import React, { useEffect, useState } from "react";

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

  return (
    <div>
      {dragon.dragonId && (
        <div>
          <p>Generation: {dragon.generationId}</p>
          <p>Dragon ID: {dragon.dragonId}</p>
          <p>{dragon.traits.map((trait) => trait.traitValue).join(", ")}</p>
        </div>
      )}
    </div>
  );
};

export default Dragon;
