import React, { useEffect, useState } from "react";

const Generation = () => {
  const [generation, setGeneration] = useState({
    generationId: 999,
    expiration: "2021-05-01",
  });

  const fetchGeneration = () => {
    fetch("http://localhost:3001/generation")
      .then((response) => console.log("response", response))
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
