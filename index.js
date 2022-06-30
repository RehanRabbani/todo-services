// morgan : middle ware for logging
const morgan = require("morgan");
const config = require("config");
const debug = require("debug")("app:startUp");
const express = require("express");
const todos = require("./routes/todos");
const home = require("./routes/home");
const app = express();
const port = process.env.PORT || 3000;

console.log("name" + config.get("name"));
console.log("mail", config.get("mail.host"));
console.log("password", config.get("mail.password"));

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

app.use(express.json());
app.use("/api/todos", todos);
app.use("/", home);

app.listen(port, () => {
  debug("server running on " + port);
});
