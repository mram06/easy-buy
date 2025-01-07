import CategoryDBService from "../models/category/CategoryDBService.mjs";
import { validationResult } from "express-validator";

class CategoryController {
  static async getList(req, res) {
    const categoriesList = await CategoryDBService.getList();
    res.status(200).json({ categoriesList });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getListWithSubcategories(req, res) {
    const categoriesList = await CategoryDBService.getListWithSubcategories(
      req.params.locale
    );
    res.status(200).json({ categoriesList });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getListShortly(req, res) {
    const result = await CategoryDBService.getListShortly();
    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async addCategory(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = req.body;
      return res
        .status(400)
        .json({ errors: errors.array(), error: "error", data: data });
    }
    try {
      const result = await CategoryDBService.addCategory({
        ...req.body,
        imgSrc: req.file.filename,
      });
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
  static async deleteCategory(req, res) {
    try {
      const result = await CategoryDBService.deleteCategory(req.params.id);
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
}
export default CategoryController;
