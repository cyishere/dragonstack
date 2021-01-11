const app = require("../app/index");
const port = 3001;

app.listen(port, () =>
  console.log(`🚀 server running on http://localhost:${port}`)
);
