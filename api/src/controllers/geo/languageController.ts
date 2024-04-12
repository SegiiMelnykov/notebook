import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/ApiError";
import { Language } from "../../models/geo";

class LanguageController {
  async getLanguages(req: Request, res: Response, next: NextFunction) {
    try {
      const languages = await Language.findAll();
      return res.json(languages);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new LanguageController();
