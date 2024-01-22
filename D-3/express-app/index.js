import express from 'express';

import cors from 'cors';


const app = express();

app.use(cors());

let todos = [
    "Buy Milk",
    "Drink Water"
]


app.get('/todos', (req, res) => {
    res.send(todos)
});


app.post('/todos', (req, res) => {
    if (req.query.title) {
        todos.push(req.query.title)
        res.send(req.query.title)
    }
    else {
        res.send("title is'nt provided")
    }
});


app.put('/todos', (req, res) => {
    if (req.query.index && req.query.title) {
        todos[req.query.index] = req.query.title
        res.send(req.query.title)
    }
    else {
        res.send("title or index is'nt provided")
    }
});


app.delete("/todos", (req, res) => {
    if (req.query.title) {
        const index = todos.indexOf(req.query.title);

        if (index != -1) {
            todos.splice(index, 1);
            res.send("Done")
        }
        else {
            res.send("Not found")
        }
    }
    else {
        res.send("title is'nt provided")
    }
})


app.listen(3000, () => {
    console.log('App listening on port 3000');
});