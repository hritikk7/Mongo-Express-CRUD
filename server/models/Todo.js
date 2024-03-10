const { Schema, model } = require("mongoose");

const todoSchema = new Schema({
  task: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Todo = model("Todo", todoSchema);
module.exports = Todo;
