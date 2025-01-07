import { validationResult } from "express-validator";
import fs from "fs";

class CategoryValidator {
  static categorySchema = {
    title_ua: {
      notEmpty: {
        errorMessage: "title_ua is required",
      },
      isLength: {
        options: { min: 2 },
        errorMessage: "title_ua must be at least 2 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
    },
    title_en: {
      notEmpty: {
        errorMessage: "title_en is required",
      },
      isLength: {
        options: { min: 2 },
        errorMessage: "title_en must be at least 2 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
    },
  };
  static checkFile(req, res, next) {
    const errors = validationResult(req);
    console.log(errors);
    console.log(req.file.path);

    if (!errors.isEmpty()) {
      if (req.file) {
        // Видаляємо завантажений файл, якщо поля не валідні
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
}

export default CategoryValidator;
