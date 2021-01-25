import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGeneration } from "../slices/generationSlice";

const MINIMUM_DELAY = 3000;

const Generation = () => {
  // const [generation, setGeneration] = useState(DEFAULT_GENERATION);
  const generation = useSelector((state) => state.generation);
  console.log({ generation });

  const dispatch = useDispatch();

  const mouted = useRef(false);

  useEffect(() => {
    mouted.current = true;

    let timer = null;

    const fetchNextGeneration = () => {
      dispatch(fetchGeneration());

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
