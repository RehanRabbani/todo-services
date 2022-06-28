const express = require("express");
const Joi = require("joi");
const app = express();

const port = process.env.PORT || 3000;

const todos = [
  {
    id: 1,
    name: "todo 1",
  },
  {
    id: 2,
    name: "todo 2",
  },
  {
    id: 3,
    name: "todo 3",
  },
];

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world 1");
});

app.get("/api/todos", (req, res) => {
  res.send(todos);
});

app.get("/api/todos/:id", (req, res) => {
  const todo = todos.find((td) => td.id === parseInt(req.params.id));
  if (!todo) res.status(404).send("Not found");
  res.send(todo);
});

app.post("/api/todos", (req, res) => {
  const result = valdation(req.body);

  if (result.error) return res.status(400).send(result.error);

  const todo = {
    id: todos.length + 1,
    name: req.body.name,
  };
  todos.push(todo);
  res.send(todo);
});

app.put("/api/todos/:id", (req, res) => {
  const todo = todos.find((td) => td.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Not found");
  const result = valdation(req.body);
  if (result.error) return res.status(400).send(result.error);
  todo.name = req.body.name;
  res.send(todo);
});

app.delete("/api/todos/:id", (req, res) => {
  const todo = todos.find((td) => td.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Not found");
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.send(todo);
});

app.listen(port, () => {
  console.log("server running on " + port);
});

const valdation = (params) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(params);
};
