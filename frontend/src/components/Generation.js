import React, { useEffect, useState } from "react";

const DEFAULT_GENERATION = {
  generationId: "",
  expiration: "",
};

const Generation = () => {
  const [generation, setGeneration] = useState(DEFAULT_GENERATION);

  const fetchGeneration = () => {
    fetch("http://localhost:3001/generation")
      .then((response) => response.json())
      .then((json) => {
        setGeneration(json.generation);
      })
      .catch((error) => console.error("error", error));
  };

  useEffect(() => {
    fetchGeneration();
  }, []);

  return (
    <div>
      <h3>Generation {generation.generationId}. Expires on:</h3>
      <h4>{new Date(generation.expiration).toString()}</h4>
    </div>
  );
};

export default Generation;
