import express from 'express';

import cors from 'cors';

import mongoose from 'mongoose';

import d4_TodoTask from './todo.js';

const app = express();

app.use(cors());




app.get('/todos', async (req, res) => {
    if (req.query.delay) {
        setTimeout(async () => {
            const data = await d4_TodoTask.find({})
            res.send(data)
        }, 2000)
    }
    else {
        const data = await d4_TodoTask.find({})
        res.send(data)
    }
});


app.post('/todos', async (req, res) => {
    if (req.query.title) {
        const data = await d4_TodoTask.create({
            title: req.query.title
        })
        res.send(data)
    }
    else {
        res.send("title is'nt provided")
    }
});


app.put('/todos', async (req, res) => {
    if (req.query.id && req.query.title) {
        const todo = await d4_TodoTask.findById(req.query.id)
        todo.title = req.query.title
        todo.save()
        res.send(todo)
    }
    else {
        res.send("id or title is'nt provided")
    }
});


app.delete("/todos", async (req, res) => {
    if (req.query.id) {
        if (await d4_TodoTask.findByIdAndDelete(req.query.id)) {
            res.send("Done")
        }
        else {
            res.send("Not found")
        }
    }
    else {
        res.send("id is'nt provided")
    }
})


mongoose.connect("mongodb://localhost:27017/30-days-mern", { useNewUrlParser: true }).then(() => {
    console.log("Connected to DB")
    app.listen(3000, () => console.log("Server is running at 3000"));
});
