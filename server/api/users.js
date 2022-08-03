const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "firstName", "lastName", "email"],
      include: [{ model: Order, as: "orders" }],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
