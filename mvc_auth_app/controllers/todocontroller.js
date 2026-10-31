import Todo from "../models/todomodel.js";
const createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req.body);

    res.status(201).json({
      message: "Todo created successfully",
      data: newTodo,
    });
  } catch (err) {
    res.status(500).json({
      message: "Todo creation failed",
    });
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();

    res.status(200).json({
      message: "Todos fetched successfully",
      data: todos,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch todos",
    });
  }
};

const getTodoById = async (req, res) => {
  try {
    const todoData = await Todo.findById(req.params.id);

    if (!todoData) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo fetched successfully",
      data: todoData,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch todo",
    });
  }
};

const updateTodo = async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo updated successfully",
      data: updatedTodo,
    });
  } catch (err) {
    res.status(500).json({
      message: "Todo update failed",
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Todo deletion failed",
    });
  }
};

export {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};