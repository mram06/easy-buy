import pool from "../../../../db/connectDB.mjs";

const deliveryCost = 50;

class OrdersDBService {
  static async makeOrder(userId, deliveryType, paymentType) {
    try {
      const sql = `
        INSERT INTO orders (user_id, total_sum, delivery_type, payment_type)
        VALUES (
            ?, 
            (
                SELECT 
                    SUM(ci.quantity * p.price) + 
                    CASE 
                        WHEN ? = 'courier' THEN ?
                        ELSE 0 
                    END AS totalSum
                FROM carts AS c
                INNER JOIN cart_items AS ci ON ci.cart_id = c.id
                INNER JOIN products AS p ON p.id = ci.product_id
                WHERE c.user_id = ?
            ), 
            ?, 
            ?
        );`;

      const [result] = await pool.query(sql, [
        userId,
        deliveryType,
        deliveryCost,
        userId,
        deliveryType,
        paymentType,
      ]);

      const sqlAddOrderItems = `
        INSERT INTO order_items (order_id, product_id, quantity)
        SELECT 
            LAST_INSERT_ID() AS order_id, 
            ci.product_id, 
            ci.quantity
        FROM cart_items AS ci
        INNER JOIN carts AS c ON ci.cart_id = c.id
        WHERE c.user_id = ?`;

      const [addedItems] = await pool.query(sqlAddOrderItems, [userId]);

      const sqlDeleteCart = `DELETE FROM carts WHERE user_id = ?`;
      const [deletedCart] = await pool.query(sqlDeleteCart, [userId]);

      return result?.insertId;
    } catch (error) {
      console.error("Error adding data:", error);
      return [];
    }
  }
  static async orderInfo(orderId) {
    try {
      const sql = `SELECT o.delivery_type,
                  o.payment_type,
                      o.total_sum, 
                      oi.order_id,
                      oi.product_id,
                      oi.quantity,
                      p.title_ua,
                      p.price FROM orders AS o 
                  INNER JOIN order_items AS oi ON oi.order_id = o.id
                  INNER JOIN products AS p ON p.id = oi.product_id
                  WHERE o.id = ?`;
      const [result] = await pool.query(sql, orderId);
      return result;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
}

export default OrdersDBService;
