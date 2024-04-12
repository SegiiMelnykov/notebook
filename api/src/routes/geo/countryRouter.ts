const Router = require("express");
const router = new Router();
import CountryController from "../../controllers/geo/countryController";

router.get("/countries/", CountryController.getCountries);

export default router;
