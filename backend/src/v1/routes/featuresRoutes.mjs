import express from "express";
import { checkSchema } from "express-validator";
import upload from "../../../utils/UploadManagerForFile.mjs";
import { ensureAdmin } from "../../../middleware/auth.mjs";
import FeaturesController from "../controllers/featuresController.mjs";
import FeatureValidator from "../../../validators/featureValidator.mjs";

const router = express.Router();

router.get(
  "/:locale/category/:id",
  FeaturesController.getFeaturesWithLocaleByCategoryId
);
router.get(
  "/:locale/subcategory/:id",
  FeaturesController.getFeaturesWithLocaleBySubcategoryId
);
router.get(
  "/:locale/id/:id",
  FeaturesController.getFeaturesWithLocaleByProductId
);

router.get("/id/:id", ensureAdmin, FeaturesController.getFeaturesByProductId);
router.get(
  "/subcategory/:id",
  ensureAdmin,
  FeaturesController.getFeaturesBySubcategoryId
);
router.delete("/delete/:id", ensureAdmin, FeaturesController.deleteFeature);
router.post("/add", ensureAdmin, FeaturesController.addFeature);

router.put(
  "/",
  ensureAdmin,
  // checkSchema(FeatureValidator.featureSchema),
  FeaturesController.updateFeatures
);

export default router;
