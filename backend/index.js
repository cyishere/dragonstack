const Generation = require("./generation");

const generation = new Generation();

console.log("generation", generation);

const sandy = generation.newDragon({ nickname: "sandy" });
console.log("sandy", sandy);

setTimeout(() => {
  const cate = generation.newDragon();
  console.log("cate", cate);
}, 15000);
