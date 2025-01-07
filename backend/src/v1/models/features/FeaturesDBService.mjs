import pool from "../../../../db/connectDB.mjs";

class FeaturesDBService {
  static async getFeaturesByProductId(id) {
    try {
      const sql = `SELECT DISTINCT
                        sf.id AS subcategory_features_id,
                        sf.feature_ua,
                        COALESCE(pf.id, NULL) AS product_features_id,
                        ? AS product_id,
                        sf.id AS feature_id,
                        COALESCE(pf.value_ua, NULL) AS value_ua,
                        COALESCE(pf.value_en, NULL) AS value_en
                    FROM
                        subcategory_features AS sf
                    INNER JOIN
                        products AS p ON sf.subcategory_id = p.subcategory_id
                    LEFT JOIN
                        product_features AS pf ON pf.feature_id = sf.id AND pf.product_id = ?
                    WHERE
                        p.id = ?;`;

      const [rows] = await pool.query(sql, [id, id, id]);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getFeaturesBySubcategoryId(id) {
    try {
      const sql = `SELECT * FROM subcategory_features
                  WHERE subcategory_features.subcategory_id = ?`;

      const [rows] = await pool.query(sql, id);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getFeaturesWithLocaleByCategoryId(locale, id) {
    try {
      const sql = `
        SELECT id, feature_${locale} AS title
        FROM subcategory_features WHERE subcategory_id = ?`;
      const [rows] = await pool.query(sql, id);
      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getFeaturesWithLocaleBySubcategoryId(locale, id) {
    try {
      const sql = `
        SELECT id, feature_${locale} AS title
        FROM subcategory_features WHERE subcategory_id = ?;`;
      const [rows] = await pool.query(sql, id);
      for (const row of rows) {
        const sqlValues = `
        SELECT pf.id, pf.value_${locale} AS title 
        FROM product_features AS pf
        INNER JOIN subcategory_features AS sf ON pf.feature_id = sf.id
        WHERE pf.feature_id = ?
        GROUP BY pf.value_${locale}
        ORDER BY title ASC;`;
        const [values] = await pool.query(sqlValues, row.id);
        row.values = values;
      }

      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async getFeaturesWithLocaleByProductId(locale, id) {
    try {
      const sql = `SELECT sf.feature_${locale} AS title, pf.value_${locale} AS value FROM subcategory_features AS sf
                  INNER JOIN product_features AS pf ON sf.id = pf.feature_id
                  WHERE pf.product_id = ?;`;
      const [rows] = await pool.query(sql, id);

      return rows;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async addFeature(data) {
    try {
      const sql = "INSERT INTO subcategory_features SET ?";
      const [result] = await pool.query(sql, data);
      return result;
    } catch (error) {
      console.error("Error:", error);
    }
  }
  static async deleteFeature(id) {
    try {
      const sql = "DELETE FROM subcategory_features WHERE id = ?";
      const [result] = await pool.query(sql, id);
      return result[0];
    } catch (error) {
      console.error("Error:", error);
    }
  }
  static async updateFeatures(data) {
    try {
      const sql = `REPLACE INTO product_features (id, product_id, feature_id, value_ua, value_en)
                    VALUES (?, ?, ?, ?, ?);`;
      data.forEach(async (row) => {
        await pool.query(sql, [
          row.product_features_id,
          row.product_id,
          row.feature_id,
          row.value_ua,
          row.value_en,
        ]);
      });
      return;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
}

export default FeaturesDBService;
