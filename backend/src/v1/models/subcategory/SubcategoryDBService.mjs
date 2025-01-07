import pool from "../../../../db/connectDB.mjs";

class SubcategoryDBService {
  static async getList() {
    try {
      const sql = `SELECT *  FROM subcategories`;
      const [rows] = await pool.query(sql);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  // static async getListWithLocale(locale) {
  //   try {
  //     const sql = `SELECT id, title_${locale} AS title, price, imgSrc FROM products`;
  //     const [rows] = await pool.query(sql);
  //     return rows;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     return [];
  //   }
  // }
  static async addSubcategory(data) {
    try {
      const sql = "INSERT INTO subcategories SET ?";
      const [result] = await pool.query(sql, data);
      return result[0];
    } catch (error) {
      console.error("Error:", error);
    }
  }
  static async setCategory(data) {
    console.log(data);

    try {
      const sql = "UPDATE subcategories SET category_id = ? WHERE id = ?";
      const [result] = await pool.query(sql, [data.category_id, data.subcategory_id]);
      return result[0];
    } catch (error) {
      console.error("Error:", error);
    }
  }
  static async deleteSubcategory(id) {
    try {
      const sql = "DELETE FROM subcategories WHERE id = ?";
      const [result] = await pool.query(sql, id);
      return result[0];
    } catch (error) {
      console.error("Error:", error);
    }
  }
}

export default SubcategoryDBService;
