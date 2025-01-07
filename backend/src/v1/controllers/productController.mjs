import ProductsDBService from "../models/product/ProductsDBService.mjs";
import { validationResult } from "express-validator";
import fs from "fs";
const perPage = 30;

class ProductController {
  static async getList(req, res) {
    const result = await ProductsDBService.getList();
    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getListWithLocale(req, res) {
    const { minPrice = 0, maxPrice, sort = "", page = 1 } = req.query;
    let { brands = "" } = req.query;
    let { search = "" } = req.query;

    brands = brands.split(",");
    search = search.split("+");

    const skipNum = (page - 1) * perPage;

    try {
      const result = await ProductsDBService.getListWithLocale(
        req.params.locale,
        minPrice,
        maxPrice,
        sort,
        brands,
        search[0],
        perPage,
        skipNum
      );
      res.status(200).json({
        productsList: result.rows,
        brands: result.brands,
        maxProductsPrice: result.maxProductsPrice,
        totalCount: result.totalCount,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getListWithLocaleByCategoryId(req, res) {
    const { minPrice = 0, maxPrice, sort = "", page = 1 } = req.query;
    let { brands = "" } = req.query;

    brands = brands.split(",");

    const skipNum = (page - 1) * perPage;

    try {
      const result = await ProductsDBService.getListWithLocaleByCategoryId(
        req.params.locale,
        req.params.categoryId,
        minPrice,
        maxPrice,
        sort,
        brands,
        perPage,
        skipNum
      );

      res.status(200).json({
        productsList: result.rows,
        brands: result.brands,
        maxProductsPrice: result.maxProductsPrice,
        totalCount: result.totalCount,
        currentCategory: result.currentCategory,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getListWithLocaleBySubcategoryId(req, res) {
    const { minPrice = 0, maxPrice, sort = "", page = 1 } = req.query;
    let { brands = "" } = req.query;
    brands = brands.split(",");

    let { features = "" } = req.query;
    features = features.split("/");

    const skipNum = (page - 1) * perPage;

    try {
      const result = await ProductsDBService.getListWithLocaleBySubcategoryId(
        req.params.locale,
        req.params.subcategoryId,
        minPrice,
        maxPrice,
        sort,
        brands,
        features,
        perPage,
        skipNum
      );

      res.status(200).json({
        productsList: result.rows,
        brands: result.brands,
        maxProductsPrice: result.maxProductsPrice,
        totalCount: result.totalCount,
        currentSubcategory: result.currentSubcategory,
      });
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getNoveltyListWithLocale(req, res) {
    try {
      const result = await ProductsDBService.getNoveltyListWithLocale(
        req.params.locale
      );
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async getProductWithLocaleById(req, res) {
    try {
      const result = await ProductsDBService.getProductWithLocaleById(
        req.params.locale,
        req.params.id
      );
      res.status(200).json({ result });
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }

  static async getById(req, res) {
    const result = await ProductsDBService.getById(req.params.id);
    res.status(200).json({ result });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async addProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = req.body;
      return res
        .status(400)
        .json({ errors: errors.array(), error: "error", data: data });
    }

    try {
      const result = await ProductsDBService.addProduct({
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
  static async deleteProduct(req, res) {
    try {
      const result = await ProductsDBService.deleteProduct(req.params.id);
      const imgSrc = result[0].imgSrc;

      fs.unlinkSync(`uploads/${imgSrc}`);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
  static async setSubcategory(req, res) {
    try {
      const result = await ProductsDBService.setSubcategory(req.body);
      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
  static async updateProduct(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const data = req.body;
      return res
        .status(400)
        .json({ errors: errors.array(), error: "error", data: data });
    }
    try {
      const result = await ProductsDBService.updateProduct({
        ...req.body,
        imgSrc: req.file.filename,
      });
      fs.unlinkSync(`uploads/${result.imgSrc}`);

      res.status(200).json({
        result: result,
      });
    } catch (error) {
      res.status(500).json({ error: "Error adding data" });
    }
  }
}
export default ProductController;
