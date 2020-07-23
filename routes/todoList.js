const express = require("express");
const passport = require("passport");
const router = express.Router();
const { getTodos, getTodoById, createTodo, deleteTodo, updateTodo } = require("../controllers/todoList");

const auth = passport.authenticate("sonter-authen", { session: false });

router.get("/", auth, getTodos);
router.get("/:id", auth, getTodoById);
router.post("/", auth, createTodo);
router.delete("/:id", auth, deleteTodo);
router.patch("/:id", auth, updateTodo);

module.exports = router;