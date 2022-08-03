const router = require("express").Router();
const {
  models: { Order, Product, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ["id", "isOpen", "orderStatus"],
      include: [
        { model: Product, as: "products" },
        { model: User, as: "user" },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});
