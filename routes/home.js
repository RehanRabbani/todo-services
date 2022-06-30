const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hello world 1");
});

module.exports = router;
