const router = require("express").Router();
const {
  models: { User, Order },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    // const user = await User.findByToken(req.body.token);
    // if (user && user.isAdmin) {
    const users = await User.findAll({
      include: [{ model: Order, as: "orders" }],
    });
    res.json(users);
    // } else {
    //   const users = await User.findAll({
    //     attributes: ["id", "firstName", "lastName", "email"],
    //   });
    //   res.json(users);
    // }
  } catch (error) {
    next(error);
  }
});
