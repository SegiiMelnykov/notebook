import { NextFunction, Response, Request } from 'express';
import ApiError from '../error/ApiError';

import { authMiddleware } from '../types/user';
import { Note, NoteModel, ToDo } from '../models/note';

class HomeController {
  async getAllByLevelNested(
    req: Request & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user.id;
      console.log('userId', userId);

      // Retrieve all notes for the user with the specified userId
      const allNotes = await Note.findAll({
        where: {
          userId,
          completed: false,
          deletedAt: null,
        },
        order: [['sortOrder', 'ASC']],
      });

      // Create a function to get nested notes by parent ID
      const getNestedNotes = (notes: NoteModel[], parentId = '') => {
        return notes
          .filter((note) => note.parentId === parentId)
          .map((note) => ({
            ...note.get({ plain: true }),
            children: getNestedNotes(notes, note.id),
          }));
      };

      // Call the recursive function to structure the notes hierarchically
      const topLevelNotes = getNestedNotes(allNotes);

      return res.json(topLevelNotes);
    } catch (err) {
      console.log(err);
      next(ApiError.badRequest(err));
    }
  }
}

export default new HomeController();
