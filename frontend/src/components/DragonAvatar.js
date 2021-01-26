import React from "react";

const DragonAvatar = ({ dragon }) => {
  const { generationId, dragonId, traits } = dragon;

  if (!dragonId) return <div></div>;

  return (
    <div>
      <span>G{generationId}.</span>
      <span>I{dragonId}. </span>
      {traits.map((trait) => trait.traitValue).join(", ")}
    </div>
  );
};

export default DragonAvatar;
