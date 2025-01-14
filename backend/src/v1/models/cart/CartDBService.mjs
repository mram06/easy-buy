import pool from "../../../../db/connectDB.mjs";
class CartDBService {
  static async getCartItemsWithLocaleByUserId(userId, locale) {
    try {
      const sql = `SELECT p.id, p.title_${locale} AS title, ci.quantity, p.price, p.imgSrc FROM carts AS c
                    INNER JOIN cart_items AS ci ON ci.cart_id = c.id
                    INNER JOIN products AS p ON p.id = ci.product_id
                    WHERE c.user_id = ?`;
      const [rows] = await pool.query(sql, userId);

      const sqlSumCount = `SELECT SUM(ci.quantity * p.price) AS totalCartSum,
                                  SUM(ci.quantity) AS totalCount
                    FROM carts AS c
                    INNER JOIN cart_items AS ci ON ci.cart_id = c.id
                    INNER JOIN products AS p ON p.id = ci.product_id
                    WHERE c.user_id = ?`;
      const [sum] = await pool.query(sqlSumCount, userId);

      return {
        items: rows,
        totalCartSum: sum[0].totalCartSum,
        totalCount: sum[0].totalCount,
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async addToCart(itemId, userId) {
    try {
      const sqlCart = "SELECT * FROM carts WHERE user_id = ?";
      const [cart] = await pool.query(sqlCart, userId);

      let cartId = cart[0]?.id;
      console.log(cartId);

      // if cart with userId not exist
      if (!cart[0]) {
        const sqlCreateCart = "INSERT INTO carts (user_id) VALUES (?)";
        [cartId] = await pool.query(sqlCreateCart, userId);
        cartId = cartId?.insertId;
      }

      // is item exists in cart_items
      const sqlCartItem =
        "SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?";
      const [cartItem] = await pool.query(sqlCartItem, [cartId, itemId]);

      // if item not exists in cart_items
      if (!cartItem[0]) {
        const sqlAddItem =
          "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)";
        await pool.query(sqlAddItem, [cartId, itemId, 1]);
      } else {
        // if item exist
        console.log(cartItem[0]);
        const sqlUpdateItem =
          "UPDATE cart_items SET quantity = ? WHERE cart_id = ? AND product_id = ?";
        await pool.query(sqlUpdateItem, [
          ++cartItem[0].quantity,
          cartId,
          itemId,
        ]);
      }
      return;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
  static async decreaseCount(itemId, userId) {
    try {
      const sqlCheckQuantity = `
        SELECT quantity 
        FROM cart_items 
        WHERE cart_id = (SELECT id FROM carts WHERE user_id = ?) 
        AND product_id = ?
      `;
      const [result] = await pool.query(sqlCheckQuantity, [userId, itemId]);

      if (result[0].quantity > 1) {
        const sqlUpdateItem = `
          UPDATE cart_items 
          SET quantity = quantity - 1 
          WHERE cart_id = (SELECT id FROM carts WHERE user_id = ?) 
          AND product_id = ?
        `;
        await pool.query(sqlUpdateItem, [userId, itemId]);
      } else {
        const sqlDeleteItem = `
          DELETE FROM cart_items 
          WHERE cart_id = (SELECT id FROM carts WHERE user_id = ?) 
          AND product_id = ?
        `;
        await pool.query(sqlDeleteItem, [userId, itemId]);
      }

      return;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
}
export default CartDBService;
