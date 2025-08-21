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
export const update = async () => {};
export const remove = async () => {};
