import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DEFAULT_GENERATION = {
  generationId: "",
  expiration: "",
};

const MINIMUM_DELAY = 3000;

const Generation = () => {
  const [generation, setGeneration] = useState(DEFAULT_GENERATION);

  let timer = null;

  const fetchGeneration = () => {
    fetch("http://localhost:3001/generation")
      .then((response) => response.json())
      .then((json) => {
        setGeneration(json.generation);
      })
      .catch((error) => console.error("error", error));
  };

  const fetchNextGeneration = () => {
    fetchGeneration();
    console.log("generation: ", generation.generationId);

    let delay =
      new Date(generation.expiration).getTime() - new Date().getTime();

    if (delay < MINIMUM_DELAY) {
      delay = MINIMUM_DELAY;
    }

    timer = setTimeout(() => fetchNextGeneration(), delay);
  };

  useEffect(() => {
    fetchNextGeneration();

    // returned function will be called on component unmount
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <h3>Generation {generation.generationId}. Expires on:</h3>
      <h4>{new Date(generation.expiration).toString()}</h4>
      <p>
        Take me to <Link to="/another">another place</Link>.
      </p>
    </div>
  );
};

export default Generation;
