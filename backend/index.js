const Dragon = require("./dragon");

const sandy = new Dragon({ birthdate: new Date(), nickname: "sandy" });
const cate = new Dragon({ birthdate: new Date(), nickname: "cate" });

const sarah = new Dragon();

setTimeout(() => {
  const tammy = new Dragon();
  console.log("tammy", tammy);
}, 3000);

console.log("sandy", sandy);
console.log("cate", cate);
console.log("sarah", sarah);
