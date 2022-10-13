const Todo = require("../models/Todo")

const getTodos = async (req, res) => {
    try {
        const response = await Todo.find();

        if (!response) {
            res.status(400).json({ "message": "No todos found" })
        }

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({ "msg": error.message });
    }
}

const createTodo = async (req, res) => {

    const { title, description } = req.body;

    const data = {title, description}

    try {
        const response = await Todo.create(data);

        if (!response) {

            res.status(400).json({ "message": "Unable to create todo" });
        }

        const result = await Todo.find();

        return res.status(201).json(result);
    } catch (error) {
        return res.status(400).json({ "msg": error.message });
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    
    try {
        const response = await Todo.findByIdAndRemove({ _id: id });

        if (!response) {
            return res.status(400).send(`no todo with id ${id}`)
        }

        const result = await Todo.find();

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({ "msg": error.message });
    }
}

const updateTodo = async (req, res) => {

    const { id } = req.params;

    try {

        const response = await Todo.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        if (!response) {
            return res.status(400).send(`no todo with id ${id}`)
        }

        const result = await Todo.find();

        return res.status(200).json(result);

    } catch (error) {
        return res.status(400).json({"msg": error.message})
    }
}

module.exports = {
    getTodos,
    createTodo,
    deleteTodo,
    updateTodo
}