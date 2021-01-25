The course's code of Generation actions:

```js
const fetchGeneration = () => {
  dispatch({ type: GENERATION.FETCH });

  return fetch(apiUrl)
    .then((response) => response.json())
    .then((json) => {
      if (json.type === "error") {
        dispatch({
          type: GENERATION.FETCH_ERROR,
          message: json.message,
        });
      } else {
        dispatch({
          type: GENERATION.FETCH_SUCCESS,
          generation: json.generation,
        });
      }
    })
    .catch((error) =>
      dispatch({
        type: GENERATION.FETCH_ERROR,
        message: error.message,
      })
    );
};
```

The code backup of Dragon Avatar Image

```js
import {
  patchy,
  plain,
  skinny,
  slender,
  sporty,
  spotted,
  stocky,
  striped,
} from "../assets";

const propertyMap = {
  backgroundColor: {
    black: "#263238",
    white: "#cfd8dc",
    green: "#a5d6a7",
    blue: "#0277bd",
  },
  build: { slender, stocky, sporty, skinny },
  pattern: { plain, striped, spotted, patchy },
  size: {
    small: 100,
    medium: 140,
    large: 180,
    enormou: 220,
  },
};

get DragonImage() {
  return (
    <div className="dragon-avatar-image-wrapper">
      <div className="dragon-avatar-image-background" style={{ backgroundColor: propertyMap.backgroundColor.blue }}></div>
      <img src={propertyMap.pattern.spotted} alt="pattern" className="dragon-avatar-image-pattern"/>
      <img src={propertyMap.build.sporty} alt="build" className="dragon-avatar-image"/>
    </div>
  );
}
```
