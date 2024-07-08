import { NextFunction, Response, Request } from 'express';
import ApiError from '../error/ApiError';

import { authMiddleware } from '../types/user';
import { ProfileForm } from 'types/profile';
import { User } from '../models/user';
import { notesPerPageOptions } from '../utils/const';

class ProfileController {
  async get(req: Request & authMiddleware, res: Response, next: NextFunction) {
    const user = req.user;
    const userDB = await User.findOne({
      where: { id: user.id },
    });

    const { password, createdAt, updatedAt, ...rest } = userDB.dataValues;

    return res.json(rest);
  }
  async update(
    req: Request<{ id: string }, any, ProfileForm> & authMiddleware,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { email, notesPerPage } = req.body;
      const { id } = req.params;
      const user = req.user;
      if (+id !== user.id) {
        next(ApiError.badRequest('Note not found'));
      }
      const userDB = await User.findOne({ where: { id: user.id } });
      if (!userDB) {
        return next(ApiError.badRequest('user not found'));
      }
      if (email !== userDB.email) {
        userDB.email = email;
      }
      if (notesPerPageOptions.includes(+notesPerPage)) {
        userDB.notesPerPage = +notesPerPage;
      }
      userDB.save();
      return res.json({ success: true });
    } catch (e) {
      next(ApiError.badRequest(e));
    }
  }
}

export default new ProfileController();
