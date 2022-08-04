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

// get ALL orders for user with userId
router.get("/user/:userId", async (req, res, next) => {
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
          where: {
            id: req.params.userId,
          },
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(error);
  }
});

// get OPEN orders for user with userId
router.get("/user/:userId/open", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "isOpen", "orderStatus"],
      where: { isOpen: true },
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
          where: {
            id: req.params.userId,
          },
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(error);
  }
});

// get CLOSED orders for user with userId
router.get("/user/:userId/closed", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      attributes: ["id", "isOpen", "orderStatus"],
      where: { isOpen: false },
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
          where: {
            id: req.params.userId,
          },
        },
      ],
    });
    res.json(orders);
  } catch (err) {
    next(error);
  }
});
