const { createIndexes } = require('../models/todolist');
const TodoL = require('../models/todolist');

const findAllTodoList = (req, res) => {
    TodoL.find((err, mtodolist) => {
        err && res.send(500).send(err.message);

        res.status(200).json(mtodolist);
    })
};

const addTask = (req, res) => {
    let task = new TASK({
        name: req.body.name,
        descripcion: req.body.descripcion,
        status: false
    });
    task.save((err, newtask) => {
        err && res.status(500).send(err.message);
        res.status(200).json(newtask);
    });
};

module.exports = {addTask, findAllTodoList}