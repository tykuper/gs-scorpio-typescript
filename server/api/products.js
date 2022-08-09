const router = require("express").Router();
const {
  models: { Product, User },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      attributes: [
        "id",
        "name",
        "imageURL",
        "longDescription",
        "price",
        "category",
        "noiseCancelling",
      ],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/:productId", async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId, {
      attributes: [
        "id",
        "name",
        "imageURL",
        "longDescription",
        "price",
        "category",
        "noiseCancelling",
        "numReviews",
        "ratings",
      ],
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.body.token);
    if (user && user.isAdmin) {
      res.status(201).send(await Product.create(req.body));
    } else {
      const error = Error("Not authorized to add product");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", async (req, res, next) => {
  try {
    console.log("delete req.headers", req.headers);
    const user = await User.findByToken(req.headers.authorization);
    const product = await Product.findByPk(req.params.productId);
    if (user && user.isAdmin) {
      if (product) {
        await product.destroy();
        res.status(204).send(product);
      } else {
        res.status(404).send("Not Found");
      }
    } else {
      const error = Error("Not authorized to delete product");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    console.log("put req.body", req.body);
    const user = await User.findByToken(req.body.token);
    const product = await Product.findByPk(req.params.productId);
    if (user && user.isAdmin) {
      if (product) {
        res.send(await product.update(req.body));
      } else {
        res.status(404).send("Not Found");
      }
    } else {
      const error = Error("Not authorized to edit product");
      error.status = 401;
      throw error;
    }
  } catch (err) {
    next(err);
  }
});
