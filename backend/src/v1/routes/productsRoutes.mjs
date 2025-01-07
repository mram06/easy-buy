import express from "express";
import { checkSchema } from "express-validator";
import upload from "../../../utils/UploadManagerForFile.mjs";
import { ensureAdmin } from "../../../middleware/auth.mjs";

const router = express.Router();
import ProductController from "../controllers/productController.mjs";
import ProductValidator from "../../../validators/productValidator.mjs";

router.get("/", ProductController.getList);
router.put(
  "/update",
  upload.single("image"),
  ensureAdmin,
  checkSchema(ProductValidator.productSchema),
  ProductValidator.checkFile,
  ProductController.updateProduct
);

router.get("/id/:id", ProductController.getById);
router.get("/:locale", ProductController.getListWithLocale);
router.get("/:locale/novelty", ProductController.getNoveltyListWithLocale);
router.get(
  "/:locale/:categoryId",
  ProductController.getListWithLocaleByCategoryId
);
router.get(
  "/:locale/subcategory/:subcategoryId",
  ProductController.getListWithLocaleBySubcategoryId
);
router.get("/:locale/id/:id", ProductController.getProductWithLocaleById);

router.post(
  "/add",
  upload.single("image"),
  ensureAdmin,
  checkSchema(ProductValidator.productSchema),
  ProductValidator.checkFile,
  ProductController.addProduct
);
router.delete("/delete/:id", ensureAdmin, ProductController.deleteProduct);
router.put("/set-subcategory", ensureAdmin, ProductController.setSubcategory);

export default router;
