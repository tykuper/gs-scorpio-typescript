const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
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
        "shortDescription",
        "longDescription",
        "price",
        "category",
        "noiseCancelling",
      ],
    });
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (product) {
      await product.destroy();
      res.send(product);
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    next(err);
  }
});

router.put("/:productId", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId);
    if (product) {
      res.send(await product.update(req.body));
    } else {
      res.status(404).send("Not Found");
    }
  } catch (err) {
    next(err);
  }
});
