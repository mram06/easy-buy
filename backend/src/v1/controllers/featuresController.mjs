import FeaturesDBService from "../models/features/FeaturesDBService.mjs";
import { validationResult } from "express-validator";

class FeaturesController {
  static async getFeaturesByProductId(req, res) {
    const result = await FeaturesDBService.getFeaturesByProductId(
      req.params.id
    );
    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getFeaturesBySubcategoryId(req, res) {
    const result = await FeaturesDBService.getFeaturesBySubcategoryId(
      req.params.id
    );
    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getFeaturesWithLocaleByCategoryId(req, res) {
    const result = await FeaturesDBService.getFeaturesWithLocaleByCategoryId(
      req.params.locale,
      req.params.id
    );
    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getFeaturesWithLocaleBySubcategoryId(req, res) {
    const result = await FeaturesDBService.getFeaturesWithLocaleBySubcategoryId(
      req.params.locale,
      req.params.id
    );

    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getFeaturesWithLocaleByProductId(req, res) {
    const result = await FeaturesDBService.getFeaturesWithLocaleByProductId(
      req.params.locale,
      req.params.id
    );

    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async addFeature(req, res) {
    try {
      const result = await FeaturesDBService.addFeature(req.body);
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
  static async deleteFeature(req, res) {
    try {
      const result = await FeaturesDBService.deleteFeature(req.params.id);
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error to delete data" });
    }
  }
  static async updateFeatures(req, res) {
    // const errors = validationResult(req);
    // console.log(req.body);
    // if (!errors.isEmpty()) {
    //   const data = req.body;
    //   return res
    //     .status(400)
    //     .json({ errors: errors.array(), error: "error", data: data });
    // }

    try {
      const result = await FeaturesDBService.updateFeatures(req.body);
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error updating data" });
    }
  }
}
export default FeaturesController;
