import UsersDBService from "../models/user/UsersDBService.mjs";
import CartDBService from "../models/cart/CartDBService.mjs";

class CartController {
  static async getCartItemsWithLocaleByUserId(req, res) {
    const result = await CartDBService.getCartItemsWithLocaleByUserId(
      req.params.id,
      req.params.locale
    );
    res.status(200).json({
      items: result.items,
      totalCartSum: result.totalCartSum,
      totalCount: result.totalCount,
    });
    try {
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  static async addToCart(req, res) {
    try {
      const cartItems = await CartDBService.addToCart(
        req.params.id,
        req.user.id
      );

      res.status(200).json({
        result: "Success",
      });
    } catch (error) {
      res.status(401).json({ error: "Login error" });
    }
  }
  static async decreaseCount(req, res) {
    try {
      const cartItems = await CartDBService.decreaseCount(
        req.params.id,
        req.user.id
      );

      res.status(200).json({
        result: "Success",
      });
    } catch (error) {
      res.status(401).json({ error: "Login error" });
    }
  }
}

export default CartController;
