import pool from "../../../../db/connectDB.mjs";

class CategoryDBService {
  static async getList() {
    try {
      const sql = "SELECT * FROM categories";
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getListWithSubcategories(locale) {
    try {
      const sql = `SELECT id, title_${locale} AS title, title_en, imgSrc FROM categories`;
      const [rows] = await pool.query(sql);
      const categoriesWithSubcategories = await Promise.all(
        rows.map(async (row) => {
          const sql = `SELECT s.id, s.title_${locale} AS title, s.title_en FROM subcategories AS s
                        INNER JOIN categories AS c ON s.category_id = c.id
                        WHERE c.id = ?`;
          const [subcategoriesList] = await pool.query(sql, row.id);

          row.subcategories = subcategoriesList;
          return row;
        })
      );

      return categoriesWithSubcategories;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getListShortly() {
    try {
      const sql = "SELECT id, title_ua FROM categories";
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getListWithLocale(locale) {
    try {
      const sql = `SELECT id, title_${locale} AS title, price, imgSrc FROM products`;
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async addCategory(data) {
    try {
      const sql = "INSERT INTO categories SET ?";
      const [result] = await pool.query(sql, data);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  static async deleteCategory(id) {
    try {
      const sql = "DELETE FROM categories WHERE id = ?";
      const [result] = await pool.query(sql, id);
      return result[0];
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default CategoryDBService;
