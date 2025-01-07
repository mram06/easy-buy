import { validationResult } from "express-validator";

class FeatureValidator {
  static featureSchema = {
    value_ua: {
      notEmpty: {
        errorMessage: "value_ua is required",
      },
      isLength: {
        options: { min: 2 },
        errorMessage: "value_ua must be at least 2 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
    },
    value_en: {
      notEmpty: {
        errorMessage: "value_en is required",
      },
      isLength: {
        options: { min: 2 },
        errorMessage: "value_en must be at least 2 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
    },
  };
}

export default FeatureValidator;
