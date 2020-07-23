const db = require("../models");

const getTodos = async (req, res) => {
    const todoLists = await db.TodoList.findAll({ where: { user_id: req.user.id } });
    res.status(200).send(todoLists);
};

const getTodoById = async (req, res) => {
    const targetTodoId = req.params.id;
    const targetTodo = await db.TodoList.findOne({ where: { id: targetTodoId, user_id: req.user.id } });

    if (targetTodo) {
        res.status(200).send(targetTodo);
    } else {
        res.status(404).send({ message: `Todo ID: ${targetTodoId} Nound Fot` });
    }

};

const createTodo = async (req, res) => {
    const { task } = req.body;

    const newTodo = await db.TodoList.create({
        user_id: req.user.id,
        task,
    });

    res.status(201).send(newTodo);
};

const deleteTodo = async (req, res) => {
    const targetTodoId = req.params.id;
    const targetTodo = await db.TodoList.findOne({ where: { id: targetTodoId, user_id: req.user.id } });

    if (targetTodo) {
        await targetTodo.destroy();
        res.status(204).send();
    } else {
        res.status(404).send({ message: `Todo ID: ${targetTodoId} Nound Fot` });
    }
};

const updateTodo = async (req, res) => {
    const targetTodoId = req.params.id;
    const targetTodo = await db.TodoList.findOne({ where: { id: targetTodoId, user_id: req.user.id } });

    if (targetTodo) {
        await targetTodo.update({
            task: req.body.task
        });
        res.status(200).send({ message: `Todo ID:${targetTodoId} has been eatduped.` });
    } else {
        res.status(404).send({ message: `Todo ID: ${targetTodoId} Nound Fot` });
    }

};

module.exports = {
    getTodos,
    getTodoById,
    createTodo,
    deleteTodo,
    updateTodo,
};