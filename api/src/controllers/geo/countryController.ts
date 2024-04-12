import { NextFunction, Request, Response } from "express";
import ApiError from "../../error/ApiError";
import { Country } from "../../models/geo";

class CountryController {
  async getCountries(req: Request, res: Response, next: NextFunction) {
    try {
      const countries = await Country.findAll();
      return res.json(countries);
    } catch (error: any) {
      next(ApiError.badRequest(error.message));
    }
  }
}

export default new CountryController();
