//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const OrderProduct = require("./models/OrderProduct");
const Order = require("./models/Order");
const Shipping = require("./models/Shipping");

//associations could go here!
Order.belongsToMany(Product, { through: OrderProduct });
Product.belongsToMany(Order, { through: OrderProduct });

// Product.hasMany(OrderProduct);
// OrderProduct.belongsTo(Product);

// Order.hasMany(OrderProduct);
// OrderProduct.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

User.hasOne(Shipping);
Shipping.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Product,
    OrderProduct,
    Order,
    Shipping,
  },
};
