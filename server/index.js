require('dotenv').config()
const express = require('express');
const app = express();

const cors = require('cors');
const mongoose = require('mongoose');

let mongo_URL = process.env.DB_URL
mongoose.connect(mongo_URL)

const TodoModel = require("./models/Todos")

app.use(cors())
app.use(express.json())


app.post('/createTodo', async (req, res) => {
    const todo = req.body
    const newTodo = new TodoModel(todo)

    try {
        await newTodo.save();
        res.json(todo)
    } catch (err) {
        res.json(err)
    }
})

app.get('/readTodos', async (req, res) => {
    const todos = await TodoModel.find();

    res.send(todos);
})

app.post('/updateTodo', async (req, res) => {
    const todo = req.body;

    await TodoModel.findByIdAndUpdate(todo._id, { title: 'Updated Title' })

    res.send('Updated Successfully');
})

app.post('/deleteTodo', async (req, res) => {
    const todo = req.body;

    await TodoModel.findByIdAndDelete(todo._id)

    res.send('Deleted Successfully');
})

const PORT = 8000;

app.listen(PORT, () => {
    console.log("Server listening on Port:", PORT);
})