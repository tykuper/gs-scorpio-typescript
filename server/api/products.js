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
