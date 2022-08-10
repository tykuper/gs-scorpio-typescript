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

router.put("/:userId/edit", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.token);
    if (user.id === Number(req.params.userId)) {
      res.send(await user.update(req.body));
    } else {
      const error = Error("Can only edit your own account information");
      error.status = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
});

router.put("/update", async (req, res, next) => {
  const userId = req.body.userId;

  try {
    // await User.destroy({
    //   where: {
    //     userId,
    //   },
    // });

    console.log(req.body);

    const updatedUser = await User.update(req.body, { where: { id: userId } });

    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});
