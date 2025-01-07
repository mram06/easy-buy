import pool from "../../../../db/connectDB.mjs";
import fs from "fs";

class ProductsDBService {
  static async getList() {
    try {
      const sql = "SELECT * FROM products";
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getListWithLocale(
    locale,
    minPrice,
    maxPrice,
    sort,
    brandsList,
    search,
    perPage,
    skipNum
  ) {
    try {
      //----------------------- main request ----------------------------------------
      const params = [minPrice];

      let sql = `SELECT id, title_${locale} AS title, price, imgSrc FROM products
                  WHERE price >= ?`;

      let sqlBrands = `SELECT DISTINCT brand FROM products
                       WHERE price >= ?`;

      let sqlMaxPrice = `SELECT MAX(price) AS maxProductsPrice FROM products
                          WHERE price >= ?`;

      let sqlMaxCount = `SELECT COUNT(id) AS totalCount FROM products
                         WHERE price >= ?`;

      if (maxPrice) {
        sql += " AND price <= ?";
        sqlBrands += " AND price <= ?";
        sqlMaxCount += " AND price <= ?";
        sqlMaxPrice += " AND price <= ?";
        params.push(maxPrice);
      }
      if (brandsList[0]) {
        sql += " AND brand IN (?)";
        sqlBrands += " AND brand IN (?)";
        sqlMaxCount += " AND brand IN (?)";
        sqlMaxPrice += " AND brand IN (?)";
        params.push(brandsList);
      }
      if (search) {
        sql += ` AND MATCH (title_ua, title_en, description_ua, description_en, brand)
                 AGAINST(? IN NATURAL LANGUAGE MODE)`;
        sqlBrands += ` AND MATCH (title_ua, title_en, description_ua, description_en, brand)
                        AGAINST(? IN NATURAL LANGUAGE MODE)
                      ORDER BY brand ASC`;
        sqlMaxCount += ` AND MATCH (title_ua, title_en, description_ua, description_en, brand)
                         AGAINST(? IN NATURAL LANGUAGE MODE)`;
        sqlMaxPrice += ` AND MATCH (title_ua, title_en, description_ua, description_en, brand)
                         AGAINST(? IN NATURAL LANGUAGE MODE)`;
        params.push(search);
      }

      if (sort) {
        if (sort === "ascending") sql += " ORDER BY price ASC";
        else sql += " ORDER BY price DESC";
      }
      sql += " LIMIT ? OFFSET ?";
      params.push(perPage, skipNum);

      const [rows] = await pool.query(sql, params);

      //----------------------- brands request ----------------------------------------

      const [brands] = await pool.query(sqlBrands, params);

      //----------------------- maxPrice request ---------------------------------------
      const [maxProductsPrice] = await pool.query(sqlMaxPrice, params);

      //----------------------- maxCount request ----------------------------------------
      const [maxCount] = await pool.query(sqlMaxCount, params);

      return {
        rows,
        brands,
        maxProductsPrice: maxProductsPrice[0].maxProductsPrice,
        totalCount: maxCount[0].totalCount,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getListWithLocaleByCategoryId(
    locale,
    categoryId,
    minPrice,
    maxPrice,
    sort,
    brandsList,
    perPage,
    skipNum
  ) {
    try {
      //----------------------- main request -----------------------------------------------
      const params = [categoryId, minPrice];

      let sql = `SELECT p.id, p.title_${locale} AS title, p.price, p.imgSrc FROM products AS p
                  INNER JOIN subcategories AS s ON p.subcategory_id = s.id
                  INNER JOIN categories AS c ON s.category_id = c.id
                  WHERE c.id = ? AND p.price >= ?`;

      let sqlBrands = `SELECT DISTINCT p.brand FROM products AS p
                        INNER JOIN subcategories AS s ON p.subcategory_id = s.id
                        INNER JOIN categories AS c ON s.category_id = c.id
                        WHERE c.id = ? AND p.price >= ?`;

      let sqlMaxPrice = `SELECT MAX(p.price) AS maxProductsPrice FROM products AS p
                        INNER JOIN subcategories AS s ON p.subcategory_id = s.id
                        INNER JOIN categories AS c ON s.category_id = c.id
                        WHERE c.id = ? AND p.price >= ?`;

      let sqlMaxCount = `SELECT COUNT(p.id) AS totalCount FROM products AS p
                        INNER JOIN subcategories AS s ON p.subcategory_id = s.id
                        INNER JOIN categories AS c ON s.category_id = c.id
                        WHERE c.id = ? AND p.price >= ?`;
      if (maxPrice) {
        sql += " AND p.price <= ?";
        sqlBrands += " AND p.price <= ? ORDER BY p.brand ASC";
        sqlMaxPrice += " AND p.price <= ?";
        sqlMaxCount += " AND p.price <= ?";
        params.push(maxPrice);
      }
      if (brandsList[0]) {
        sql += " AND p.brand IN (?)";
        sqlMaxPrice += " AND p.brand IN (?)";
        sqlMaxCount += " AND p.brand IN (?)";
        params.push(brandsList);
      }

      if (sort) {
        if (sort === "ascending") sql += " ORDER BY p.price ASC";
        else sql += " ORDER BY p.price DESC";
      }
      sql += " LIMIT ? OFFSET ?";
      params.push(perPage, skipNum);

      const [rows] = await pool.query(sql, params);

      //----------------------- brands request -----------------------------------------------
      const [brands] = await pool.query(sqlBrands, params);

      //----------------------- maxPrice request ----------------------------------------
      const [maxProductsPrice] = await pool.query(sqlMaxPrice, params);

      //----------------------- maxCount request ----------------------------------------
      const [maxCount] = await pool.query(sqlMaxCount, params);

      //----------------------- current category request ----------------------------------------
      const sqlCategory = `SELECT id, title_${locale} AS title FROM categories WHERE id = ?`;
      const [category] = await pool.query(sqlCategory, categoryId);

      return {
        rows,
        brands,
        maxProductsPrice: maxProductsPrice[0].maxProductsPrice,
        totalCount: maxCount[0].totalCount,
        currentCategory: category[0],
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getListWithLocaleBySubcategoryId(
    locale,
    subcategoryId,
    minPrice,
    maxPrice,
    sort,
    brandsList,
    features,
    perPage,
    skipNum
  ) {
    try {
      //----------------------- main request -----------------------------------------------
      let sql = `SELECT p.id, p.title_${locale} AS title, p.price, p.imgSrc FROM products AS p
                  INNER JOIN subcategories AS s ON p.subcategory_id = s.id
                  INNER JOIN product_features AS pf ON p.id = pf.product_id
                  WHERE s.id = ? AND p.price >= ?`;

      let sqlMaxCount = `SELECT COUNT(DISTINCT p.id) AS totalCount FROM products AS p
                        INNER JOIN subcategories AS s ON p.subcategory_id = s.id
                        INNER JOIN product_features AS pf ON p.id = pf.product_id
                        WHERE s.id = ? AND p.price >= ?`;

      let sqlMaxPrice = `SELECT MAX(p.price) AS maxProductsPrice FROM products AS p
                          INNER JOIN subcategories AS s ON p.subcategory_id = s.id
                          INNER JOIN product_features AS pf ON p.id = pf.product_id
                          WHERE s.id = ? AND p.price >= ?`;

      const params = [subcategoryId, minPrice];
      if (maxPrice) {
        sql += " AND p.price <= ?";
        sqlMaxCount += " AND p.price <= ?";
        sqlMaxPrice += " AND p.price <= ?";
        params.push(maxPrice);
      }
      if (brandsList[0]) {
        sql += " AND p.brand IN (?)";
        sqlMaxCount += " AND p.brand IN (?)";
        sqlMaxPrice += " AND p.brand IN (?)";
        params.push(brandsList);
      }
      if (features[0]) {
        sql += ` AND pf.value_${locale} IN (?)`;
        sqlMaxCount += ` AND pf.value_${locale} IN (?)`;
        sqlMaxPrice += ` AND pf.value_${locale} IN (?)`;
        params.push(features);
      }
      sql += " GROUP BY p.id";

      if (sort) {
        if (sort === "ascending") {
          sql += " ORDER BY p.price ASC";
        } else sql += " ORDER BY p.price DESC";
      }
      sql += " LIMIT ? OFFSET ?";
      params.push(perPage, skipNum);

      const [rows] = await pool.query(sql, params);
      const [maxCount] = await pool.query(sqlMaxCount, params);

      //----------------------- brands request -----------------------------------------------
      const sqlBrands = `SELECT DISTINCT p.brand FROM products AS p
                        INNER JOIN subcategories AS s ON p.subcategory_id = s.id
                        WHERE s.id = ? ORDER BY p.brand ASC`;
      const [brands] = await pool.query(sqlBrands, [subcategoryId]);

      //----------------------- maxPrice request ----------------------------------------
      const [maxProductsPrice] = await pool.query(sqlMaxPrice, params);
      //----------------------- current category request ----------------------------------------
      const sqlSubcategory = `SELECT id, title_${locale} AS title FROM subcategories WHERE id = ?`;
      const [subcategory] = await pool.query(sqlSubcategory, subcategoryId);

      return {
        rows,
        brands,
        maxProductsPrice: maxProductsPrice[0].maxProductsPrice,
        totalCount: maxCount[0].totalCount,
        currentSubcategory: subcategory[0],
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getNoveltyListWithLocale(locale) {
    try {
      const sql = `SELECT id, title_${locale} AS title, price, imgSrc FROM products
                   ORDER BY id DESC LIMIT 10`;
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getProductWithLocaleById(locale, id) {
    try {
      const sql = `SELECT id, title_${locale} AS title, description_${locale} AS description, brand, price, imgSrc FROM products
                   WHERE id = ?`;
      const [rows] = await pool.query(sql, id);
      return rows[0];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getById(id) {
    try {
      const sql = `SELECT * FROM products WHERE id = ?`;
      const [rows] = await pool.query(sql, id);
      return rows[0];
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async addProduct(data) {
    try {
      const sql = "INSERT INTO products SET ?";
      const [result] = await pool.query(sql, data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  static async deleteProduct(id) {
    try {
      const sqlImg = "SELECT imgSrc FROM products WHERE id = ?";
      const result = await pool.query(sqlImg, id);
      const sql = "DELETE FROM products WHERE id = ?";
      await pool.query(sql, id);
      return result[0];
    } catch (error) {
      console.error("Error:", error);
    }
  }
  static async setSubcategory(data) {
    try {
      const sql = "UPDATE products SET subcategory_id = ? WHERE id = ?";
      const [result] = await pool.query(sql, [data.subcategory_id, data.id]);
      return result[0];
    } catch (error) {
      console.error("Error:", error);
    }
  }
  static async updateProduct(data) {
    try {
      const sqlImg = "SELECT imgSrc FROM products WHERE id = ?";
      const [imgSrc] = await pool.query(sqlImg, data.id);

      const sql = "UPDATE products SET ? WHERE id = ?";
      await pool.query(sql, [{ id: undefined, ...data }, data.id]);
      return imgSrc[0];
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default ProductsDBService;
