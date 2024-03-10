const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const connectDB = require("./db");
const PORT = process.env.PORT;
const todos = require("./data.js");
const Todo = require("./models/Todo.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

connectDB();

///post get put delete

///to get all the todos///////
app.get("/allTodos", (req, res) => {
  res.status(200).send(todos);
});

////to get todos with id////////////
app.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const requiredTodo = todos.find((todo) => todo.id == id);
  console.log("requiredTodo", requiredTodo);
  if (!requiredTodo) {
    res.status(403).json({
      "message ": "NOT found",
    });
  } else {
    res.json({
      requiredTodo,
    });
  }
});

//////////addTodo//////////////

app.post("/addTodo", async (req, res) => {
  const { task, completed } = req.body;
  
  console.log("inside add todo",task , completed);
  try {
    const todo = new Todo({
      task: task,
      completed: completed,
    });
    await todo.save();
    res.status(201).json({
      message: "todo added",
      todo,
    });
  } catch (err) {
    console.log("Error",err);
    res.status(500).json({
      message: "Server Error",
    });
  }
});

app.delete("/deleteTodo/:id", (req, res) => {
  const { id } = req.params;
  console.log(todos);
  //   let removeTodo = todos.filter((todo) => todo.id !== id);
  //   console.log(removeTodo, todos);

  res.json({
    message: "Todo req deleted",
  });
});

app.listen(5000, () => {
  console.log("listning on port ", PORT);
});
