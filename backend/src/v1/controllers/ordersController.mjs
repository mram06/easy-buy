import MailSender from "../../../utils/MailSender.mjs";
import OrdersDBService from "../models/order/OrdersDBService.mjs";
import UsersDBService from "../models/user/UsersDBService.mjs";

import path from "path";
const __dirname = path.resolve();

class OrdersController {
  static async makeOrder(req, res) {
    try {
      const result = await OrdersDBService.makeOrder(
        req.user.id,
        req.body.deliveryType,
        req.body.paymentType
      );

      const user = await UsersDBService.getById(req.user.id);

      const orderInfo = await OrdersDBService.orderInfo(result);

      MailSender.sendMail(
        path.join(__dirname, "views", "orderInfo.ejs"),
        { orderInfo, hideTools: true },
        {
          recipientEmail: user.email,
          subject: `Замовлення ${result}. Дякуємо за покупку!`,
          text: "Накладна до замовлення прикріплена до листа.",
        }
      );

      res.status(200).json({ result });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Error fetching data" });
    }
  }
}

export default OrdersController;
