import { NextFunction, Response, Request } from "express";
import ApiError from "../../error/ApiError";

import { authMiddleware } from "../../types/user";
import { Note } from "../../models/note";
import { TNoteCreate, TReorderItem } from "types/note";
import { Op } from "sequelize";
import { getBreadcrumbs } from "../../utils/getbreadcrumbs";

class NotesController {
  async create(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const {
        parentId = "",
        title,
        content,
        completed,
      }: TNoteCreate = req.body;
      const userId = req.user.id;
      const conter = await Note.count({
        where: { parentId, userId, deletedAt: null },
      });
      const note = await Note.create({
        parentId,
        title,
        content,
        userId,
        completed,
        deletedAt: null,
        sortOrder: conter + 1,
      });

      return res.json(note.id);
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }

  async getAllByParentId(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user.id;
      const {
        page = 1,
        limit = 10,
        filter = "active",
        parentId = "",
      } = req.query;
      let where = {};

      switch (filter) {
        case "completed":
          where = { completed: true, deletedAt: null };
          break;
        case "active":
          where = { completed: false, deletedAt: null };
          break;
        case "deleted":
          where = { deletedAt: { [Op.ne]: null } };
          break;
      }

      const offset = (+page - 1) * +limit;
      const { count, rows: notes } = await Note.findAndCountAll({
        where: { userId, parentId: parentId as string, ...where },
        limit: +limit,
        offset,
        order: [["sortOrder", "ASC"]],
      });
      return res.json({ count, notes });
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }

  async getTopMenu(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user.id;

      const { count, rows: notes } = await Note.findAndCountAll({
        where: { userId, completed: false, deletedAt: null },
        order: [["id", "DESC"]],
      });
      return res.json({ count, notes });
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }
  async getOne(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const note = await Note.findByPk(id);
      return res.json(note);
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }
  async delete(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      await Note.update(
        { deletedAt: new Date().toISOString() },
        { where: { id } },
      );

      return res.json("deleted");
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }

  async update(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id, title, content } = req.body;

      const note = await Note.findByPk(id);
      if (!note) {
        return next(ApiError.badRequest("Note not found"));
      }
      note.title = title;
      note.content = content;
      await note.save();

      return res.json("ok");
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }

  async getNoteBreadcrumbs(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) {
      return next(ApiError.badRequest("Note not found"));
    }

    const breadcrumbs = (await getBreadcrumbs(id)).reverse();

    return res.json(breadcrumbs);
  }

  async complite(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) {
      return next(ApiError.badRequest("Note not found"));
    }
    note.completed = !note.completed;
    await note.save();
    return res.json("ok");
  }

  async hide(req: Request & authMiddleware, res: Response, next: NextFunction) {
    const { id } = req.params;
    const note = await Note.findByPk(id);
    if (!note) {
      return next(ApiError.badRequest("Note not found"));
    }
    note.homeHidden = !note.homeHidden;
    await note.save();
    return res.json("ok");
  }

  async reorderNotes(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const notes: TReorderItem[] = req.body;

      for (const note of notes) {
        const noteDB = await Note.findByPk(note.id);
        if (!note) {
          return next(ApiError.badRequest("Note not found"));
        }
        noteDB.sortOrder = note.sortOrder;
        await noteDB.save();
      }
      return res.json("ok");
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }
  async moveNote(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    const { noteId, newParentId } = req.body;
    console.log("req.body", req.body);
    const note = await Note.findByPk(noteId);
    if (!note) {
      return next(ApiError.badRequest("Note not found"));
    }
    note.parentId = newParentId;
    await note.save();
    return res.json("ok");
  }
}

export default new NotesController();
