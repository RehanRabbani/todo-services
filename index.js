const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world 1");
});

app.listen(port, () => {
  console.log("server running on " + port);
});
