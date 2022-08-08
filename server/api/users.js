const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    console.log("get req.headers", req.headers);
    const user = await User.findByToken(req.headers.authorization);
    if (user.isAdmin) {
      const users = await User.findAll({
        include: [{ model: Order, as: "orders" }],
      });
      res.json(users);
    } else {
      const error = Error("Not authorized to view users");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.json(newUser);
  } catch (err) {
    next(err);
  }
});
