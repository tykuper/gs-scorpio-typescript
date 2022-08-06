const router = require("express").Router();
const {
  models: { Order, Product, User, OrderProduct },
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
    next(err);
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
    next(err);
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
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  const userId = req.body.userId;

  try {
    const [order, created] = await Order.findOrCreate({
      where: { userId, orderStatus: "In-Cart" },
      // defaults: req.body,
    });

    res.json(order);
  } catch (err) {
    next(err);
  }
});

router.put("/update", async (req, res, next) => {
  const orderId = req.body[0].orderId;

  try {
    await OrderProduct.destroy({
      where: {
        orderId,
      },
    });

    await Promise.all(
      req.body.map((item) => {
        OrderProduct.create(item);
      })
    );

    res.json(req.body);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:orderId", async (req, res, next) => {
  const orderId = req.params.orderId;

  console.log(orderId);

  try {
    await OrderProduct.destroy({
      where: {
        orderId,
      },
    });

    await Order.destroy({
      where: {
        id: orderId,
      },
    });
  } catch (error) {
    next(error);
  }
});
