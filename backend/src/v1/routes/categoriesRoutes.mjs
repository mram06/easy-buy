import express from "express";
import { checkSchema } from "express-validator";

import upload from "../../../utils/UploadManagerForFile.mjs";

const router = express.Router();
import CategoryController from "../controllers/categoryController.mjs";
import CategoryValidator from "../../../validators/categoryValidator.mjs";
import { ensureAdmin } from "../../../middleware/auth.mjs";

router.get("/", CategoryController.getList);
router.get("/shortly", CategoryController.getListShortly);
router.get(
  "/with-subcategories/:locale",
  CategoryController.getListWithSubcategories
);

router.post(
  "/add",
  upload.single("image"),
  checkSchema(CategoryValidator.categorySchema),
  CategoryValidator.checkFile,
  CategoryController.addCategory
);
router.delete("/delete/:id", ensureAdmin, CategoryController.deleteCategory);

export default router;
