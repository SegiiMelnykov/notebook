const Router = require("express");
const router = new Router();
import LanguageController from "../../controllers/geo/languageController";

router.get("/languges/", LanguageController.getLanguages);

export default router;
