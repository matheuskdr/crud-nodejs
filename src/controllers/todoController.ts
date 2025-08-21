import { Request, Response } from "express";
import { Todo } from "../models/Todo";

export const all = async (req: Request, res: Response) => {
  const list = await Todo.findAll();
  res.json({ list });
};

export const add = async (req: Request, res: Response) => {
  if (req.body.title) {
    let newTodo = await Todo.create({
      title: req.body.title,
      done: req.body.done ? true : false,
    });

    return res.status(201).json({ item: newTodo });
  }
  return res.json({ error: "Dados  não enviados." });
};
export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  let todo = await Todo.findByPk(id);
  if (todo) {
    if (req.body.title) {
      todo.title = req.body.title;
    }
    if (req.body.done) {
      switch (req.body.done.toLowerCase()) {
        case "true":
        case "1":
          todo.done = true;
          break;
        case "false":
        case "0":
          todo.done = false;
          break;
      }
    }
    await todo.save();
    return res.json({ item: todo });
  } else {
    return res.json({ error: "Item não encontrado." });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  let todo = await Todo.findByPk(id);
  if (todo) {
    await todo.destroy();
  }

  res.json({});
};
