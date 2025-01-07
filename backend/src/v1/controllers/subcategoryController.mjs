import SubcategoryDBService from "../models/subcategory/SubcategoryDBService.mjs";
import { validationResult } from "express-validator";

class SubcategoryController {
  static async getList(req, res) {
    const result = await SubcategoryDBService.getList();
    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async addSubcategory(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = req.body;
      return res
        .status(400)
        .json({ errors: errors.array(), error: "error", data: data });
    }
    try {
      const result = await SubcategoryDBService.addSubcategory(req.body);
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
  static async setCategory(req, res) {
    try {
      const result = await SubcategoryDBService.setCategory(req.body);
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
  static async deleteSubcategory(req, res) {
    try {
      const result = await SubcategoryDBService.deleteSubcategory(
        req.params.id
      );
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
}
export default SubcategoryController;
