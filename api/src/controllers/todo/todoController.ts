import { NextFunction, Response, Request } from "express";
import ApiError from "../../error/ApiError";

import { authMiddleware } from "../../types/user";
import { Note, ToDo } from "../../models/note";
import { startOfDay } from "date-fns";
import { Op } from "sequelize";
import sequelize from "sequelize";
import { TNote, TTodo } from "types/note";

class TodoController {
  async create(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user.id;
      const { id, date } = req.body;
      console.log("date", date);

      const note = await Note.findByPk(id);
      if (!note) {
        return next(ApiError.badRequest("Note not found"));
      }

      const todo = await ToDo.findOne({
        where: { noteId: id, userId: userId },
      });

      if (todo) {
        todo.completionDate = date;
        await todo.save();
      } else {
        await ToDo.create({
          noteId: id,
          completionDate: date,
          userId: userId,
        });
      }

      return res.json("ok");
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }

  async getTodos(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    const { date } = req.query;
    const userId = req.user.id;
    const newDate = new Date(date as string);
    const today = startOfDay(newDate);

    console.log("today", today);
    try {
      const todos = await ToDo.findAll({
        attributes: [
          [
            sequelize.fn("date", sequelize.col("completionDate")),
            "completionDate",
          ],
        ],
        include: [
          {
            model: Note,
            as: "note",
          },
        ],
        where: {
          userId,
          completionDate: {
            [Op.gte]: today, // Filter for dates greater than or equal to today
          },
        },
      });

      // Create an object to group todos by completionDate
      // Create an object to group todos by completionDate
      const groupedTodos = {};
      todos.forEach((todo) => {
        const completionDate = todo.getDataValue("completionDate"); // Extract the completionDate
        if (!groupedTodos[completionDate]) {
          groupedTodos[completionDate] = {
            date: completionDate,
            todos: [],
          };
        }
        groupedTodos[completionDate].todos.push((todo as any).note);
      });

      // Extract an array of unique completion dates
      const uniqueDates = Object.values(groupedTodos);

      return res.json(uniqueDates.reverse());
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }
}

export default new TodoController();
