import express from "express";
import { checkSchema } from "express-validator";

const router = express.Router();
import SubcategoryController from "../controllers/subcategoryController.mjs";
import CategoryValidator from "../../../validators/categoryValidator.mjs";
import { ensureAdmin } from "../../../middleware/auth.mjs";

router.get("/", SubcategoryController.getList);
router.post(
  "/add",
  ensureAdmin,
  checkSchema(CategoryValidator.categorySchema),
  SubcategoryController.addSubcategory
);
router.post("/set-category", ensureAdmin, SubcategoryController.setCategory);
router.delete(
  "/delete/:id",
  ensureAdmin,
  SubcategoryController.deleteSubcategory
);

export default router;
