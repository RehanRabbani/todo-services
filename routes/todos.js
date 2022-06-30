const express = require("express");
const Joi = require("joi");
const router = express.Router();

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

router.get("/", (req, res) => {
  res.send(todos);
});

router.get("/:id", (req, res) => {
  const todo = todos.find((td) => td.id === parseInt(req.params.id));
  if (!todo) res.status(404).send("Not found");
  res.send(todo);
});

router.post("/", (req, res) => {
  const result = valdation(req.body);

  if (result.error) return res.status(400).send(result.error);

  const todo = {
    id: todos.length + 1,
    name: req.body.name,
  };
  todos.push(todo);
  res.send(todo);
});

router.put("/:id", (req, res) => {
  const todo = todos.find((td) => td.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Not found");
  const result = valdation(req.body);
  if (result.error) return res.status(400).send(result.error);
  todo.name = req.body.name;
  res.send(todo);
});

router.delete("/:id", (req, res) => {
  const todo = todos.find((td) => td.id === parseInt(req.params.id));
  if (!todo) return res.status(404).send("Not found");
  const index = todos.indexOf(todo);
  todos.splice(index, 1);
  res.send(todo);
});

const valdation = (params) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return schema.validate(params);
};

module.exports = router;
