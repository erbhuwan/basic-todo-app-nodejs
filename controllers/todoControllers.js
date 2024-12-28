import Todo from "../models/todoModel.js";
export const createTodo = async (req, res, next) => {
  try {
    const user = req.user;
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      userId: user._id,
    });
    return res.status(201).json({
      message: "Todo created",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getUsersAllTodos = async (req, res, next) => {
  const todos = await Todo.find({
    userId: req.user._id,
  });
  return res.status(200).json({
    message: "All todos",
    todos,
  });
};
