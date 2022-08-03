const router = require("express").Router();
const {
  models: { Order, Product, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "isOpen", "orderStatus"],
      include: [
        {
          model: Product,
          as: "products",
          attributes: [
            "id",
            "name",
            "imageURL",
            "shortDescription",
            "longDescription",
            "price",
            "category",
            "noiseCancelling",
          ],
        },
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// router.get("/:userId", async (req, res, next) => {
//   try {
//     const orders = await Order.findAll({
//       attributes: ["id", "isOpen", "orderStatus"],
//       include: [
//         { model: Product, as: "products" },
//         { model: User, as: "user" },
//       ],
//       where: {
//         user.userId: req.params.userId,
//       },
//     });
//   } catch (err) {
//     next(error);
//   }
// });
