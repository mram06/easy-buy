import { validationResult } from "express-validator";
import fs from "fs";

class ProductValidator {
  static productSchema = {
    brand: {
      notEmpty: {
        errorMessage: "brand is required",
      },
      isLength: {
        options: { min: 2 },
        errorMessage: "brand must be at least 2 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
    },
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
    description_ua: {
      notEmpty: {
        errorMessage: "description_ua is required",
      },
      isLength: {
        options: { min: 50 },
        errorMessage: "description_ua must be at least 50 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
    },
    description_en: {
      notEmpty: {
        errorMessage: "description_en is required",
      },
      isLength: {
        options: { min: 50 },
        errorMessage: "description_en must be at least 50 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
    },
    price: {
      notEmpty: {
        errorMessage: "price is required",
      },
      isNumeric: {
        errorMessage: "price must be a number",
      },
      isLength: {
        options: { min: 0 },
        errorMessage: "price must be at least 0 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
    subcategory_id: {
      notEmpty: {
        errorMessage: "subcategory_id is required",
      },
      isNumeric: {
        errorMessage: "subcategory_id must be a number",
      },
      isLength: {
        options: { min: 1 },
        errorMessage: "subcategory_id must be at least 0 characters long",
      },
      trim: true, // Видаляє пробіли на початку і в кінці
      escape: true, // Екранує HTML символи
    },
  };
  static checkFile(req, res, next) {
    const errors = validationResult(req);
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

export default ProductValidator;
