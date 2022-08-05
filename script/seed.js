"use strict";

const {
  db,
  models: { User, Product, OrderProduct, Order },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({
      email: "admin@gmail.com",
      password: "123",
      firstName: "admin",
      lastName: "account",
      isAdmin: true,
    }),
    User.create({
      email: "cody.smith@gmail.com",
      password: "123",
      firstName: "cody",
      lastName: "smith",
    }),
    User.create({
      email: "john.doe@gmail.com",
      password: "123",
      firstName: "john",
      lastName: "doe",
    }),
    User.create({
      email: "alex.domingo@gmail.com",
      password: "123",
      firstName: "alex",
      lastName: "domingo",
    }),
    User.create({
      email: "anna.riley@gmail.com",
      password: "123",
      firstName: "anna",
      lastName: "riley",
    }),
    User.create({
      email: "jack.morgan@gmail.com",
      password: "123",
      firstName: "jack",
      lastName: "morgan",
    }),
  ]);

  // Creating Products

  const products = await Promise.all([
    Product.create({
      name: "QuietComfort Earbuds",
      imageURL:
        "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc_earbuds/silo_images/v2/QCEB_PDP_Ecom-Gallery-B03.png/jcr:content/renditions/cq5dam.web.320.320.png",
      shortDescription: "quiet and comfortable earbuds",
      longDescription:
        "Better sound begins with better silence. That’s why we engineered QuietComfort® Earbuds with the world’s most effective noise cancelling and high-fidelity audio, plus StayHear™ Max tips for extra comfort.",
      price: 199.0,
      category: "in-ear",
      noiseCancelling: true,
    }),
    Product.create({
      name: "SoundSport wireless headphones",
      imageURL:
        "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/ssw/product_silo_images/ssw_black_EC_01.psd/jcr:content/renditions/cq5dam.web.600.600.png",
      shortDescription: "the best headphone for sports",
      longDescription:
        "Exercise is a demanding activity. And you demand wireless earbuds that are up to the challenge. SoundSport wireless headphones – Refurbished keep you moving with powerful audio and earbuds that stay secure and comfortable.",
      price: 149.0,
      category: "in-ear",
      noiseCancelling: false,
    }),
    Product.create({
      name: "QuietComfort 45 headphones",
      imageURL:
        "https://assets.bose.com/content/dam/cloudassets/Bose_DAM/Web/consumer_electronics/global/products/headphones/qc45/product_silo_images/QC45_PDP_Ecom-Gallery-W02.png/jcr:content/renditions/cq5dam.web.600.600.png",
      shortDescription: "proprietary acoustic technology for deep, clear audio",
      longDescription:
        "You feel it the minute you put them on. The soft, plush cushions seal you in. Then you flip the switch and whoosh — the world fades. The music starts, and it’s love at first listen.",
      price: 279.0,
      category: "over-ear",
      noiseCancelling: true,
    }),
    Product.create({
      name: "Sport Earbuds",
      imageURL:
        "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/global/products/headphones/earbuds_500/product_silo_images/seb_product_slideshow_black_ec_03_web.jpg/jcr:content/renditions/cq5dam.web.600.600.jpeg",
      shortDescription:
        "Earbuds’ sleek design allows them to sit close to your ears",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 124.0,
      category: "in-ear",
      noiseCancelling: false,
    }),
  ]);

  const order = await Promise.all([
    Order.create({
      isOpen: true,
      orderStatus: "Processing",
      userId: 1,
    }),
    Order.create({ isOpen: false, orderStatus: "Delivered", userId: 2 }),
    Order.create({ isOpen: true, orderStatus: "Shipping", userId: 3 }),
    Order.create({ isOpen: true, orderStatus: "Canceled", userId: 4 }),
    Order.create({ isOpen: true, orderStatus: "Processing", userId: 2 }),
  ]);

  const orderProduct = await Promise.all([
    OrderProduct.create({
      price: 199,
      quantity: 1,
      productId: 1,
      orderId: 1,
    }),
    OrderProduct.create({
      price: 199,
      quantity: 3,
      productId: 1,
      orderId: 2,
    }),
    OrderProduct.create({
      price: 149,
      quantity: 2,
      productId: 2,
      orderId: 1,
    }),
    OrderProduct.create({
      price: 279,
      quantity: 1,
      productId: 3,
      orderId: 3,
    }),
    OrderProduct.create({
      price: 124,
      quantity: 4,
      productId: 4,
      orderId: 4,
    }),
    OrderProduct.create({
      price: 124,
      quantity: 1,
      productId: 4,
      orderId: 2,
    }),
    OrderProduct.create({
      price: 124,
      quantity: 2,
      productId: 4,
      orderId: 5,
    }),
  ]);

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  // };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
