import React, { useEffect, useRef, useState } from "react";

const DEFAULT_GENERATION = {
  generationId: "",
  expiration: "",
};

const MINIMUM_DELAY = 3000;

const Generation = () => {
  const [generation, setGeneration] = useState(DEFAULT_GENERATION);

  const mouted = useRef(false);

  const fetchGeneration = () => {
    fetch("http://localhost:3001/generation")
      .then((response) => response.json())
      .then((json) => {
        setGeneration(json.generation);
      })
      .catch((error) => console.error("error", error));
  };

  useEffect(() => {
    mouted.current = true;

    let timer = null;

    const fetchNextGeneration = () => {
      fetchGeneration();

      let delay =
        new Date(generation.expiration).getTime() - new Date().getTime();

      if (delay < MINIMUM_DELAY) {
        delay = MINIMUM_DELAY;
      }

      if (mouted.current) {
        timer = setTimeout(() => fetchNextGeneration(), delay);
      }
    };
    fetchNextGeneration();

    // returned function will be called on component unmount
    return () => {
      clearTimeout(timer);

      return (mouted.current = false);
    };
  }, []);

  return (
    <div>
      <h3>Generation {generation.generationId}. Expires on:</h3>
      <h4>{new Date(generation.expiration).toString()}</h4>
    </div>
  );
};

export default Generation;
