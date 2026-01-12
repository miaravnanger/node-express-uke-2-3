const { Router } = require("express");
const { getUsers, createUser } = require("../controllers/users.controller");

const userRouter = new Router();

userRouter.get("/", (req, res) => {
  const users = getUsers();

  res.json(users);
});

userRouter.post("/", (req, res) => {
  const { body } = req;

  const result = createUser(body);

  res.json(result);
});

module.exports = { userRouter };
