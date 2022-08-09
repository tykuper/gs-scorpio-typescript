"use strict";

const {
  db,
  models: { User, Product, OrderProduct, Order, Shipping },
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
      shippingId: 1,
    }),
    User.create({
      email: "cody.smith@gmail.com",
      password: "123",
      firstName: "cody",
      lastName: "smith",
      shippingId: 2,
    }),
    User.create({
      email: "john.doe@gmail.com",
      password: "123",
      firstName: "john",
      lastName: "doe",
      shippingId: 3,
    }),
    User.create({
      email: "alex.domingo@gmail.com",
      password: "123",
      firstName: "alex",
      lastName: "domingo",
      shippingId: 4,
    }),
    User.create({
      email: "anna.riley@gmail.com",
      password: "123",
      firstName: "anna",
      lastName: "riley",
      shippingId: 5,
    }),
    User.create({
      email: "jack.morgan@gmail.com",
      password: "123",
      firstName: "jack",
      lastName: "morgan",
      shippingId: 6,
    }),
    User.create({
      id: 999,
      email: "guest@gmail.com",
      password: "123",
      firstName: "guest",
      lastName: "guest",
      shippingId: 7,
    }),
  ]);

  // Creating Products

  const products = await Promise.all([
    Product.create({
      name: "QuietComfort Earbuds",
      imageURL: "/images/QuietComfort_45_headphones.png",
      longDescription:
        "Better sound begins with better silence. That’s why we engineered QuietComfort® Earbuds with the world’s most effective noise cancelling and high-fidelity audio, plus StayHear™ Max tips for extra comfort.",
      price: 199.0,
      category: "in-ear",
      noiseCancelling: true,
      numReviews: 232,
      ratings: 3.5,
    }),
    Product.create({
      name: "SoundSport wireless headphones",
      imageURL: "/images/QuietComfort_Earbuds.jpeg",
      longDescription:
        "Exercise is a demanding activity. And you demand wireless earbuds that are up to the challenge. SoundSport wireless headphones – Refurbished keep you moving with powerful audio and earbuds that stay secure and comfortable.",
      price: 149.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 123,
      ratings: 2.5,
    }),
    Product.create({
      name: "QuietComfort 45 headphones",
      imageURL: "/images/SoundSport_wireless_headphones.png",
      longDescription:
        "You feel it the minute you put them on. The soft, plush cushions seal you in. Then you flip the switch and whoosh — the world fades. The music starts, and it’s love at first listen.",
      price: 279.0,
      category: "over-ear",
      noiseCancelling: true,
      numReviews: 11,
      ratings: 5.0,
    }),
    Product.create({
      name: "Sport Earbuds",
      imageURL: "/images/Sport_Earbuds.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 124.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "Anker Soundcore Life P3",
      imageURL: "/images/Anker_Soundcore_Life_P3.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 156.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "Apple AirPods Pro",
      imageURL: "/images/Apple_AirPods_Pro.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 124.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "Crusher Evo Sensory Bass Headphones with Personal Sound",
      imageURL:
        "/images/Crusher_Evo_Sensory_Bass_Headphones_with_Personal_Sound.jpeg",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 66.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "IER M7 Hi Res Studio Monitor In ear Headphones",
      imageURL: "/images/IER_M7_Hi_Res_Studio_Monitor_In_ear_Headphones.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 34.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "IER-Z1R Signature Series Premium Hi-Res In-ear Headphones",
      imageURL:
        "/images/IER_Z1R_Signature_Series_Premium_Hi_Res_In_ear Headphones.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 56.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "LinkBuds S Truly Wireless Noise Canceling Earbuds",
      imageURL: "/images/LinkBuds_S_Truly_Wireless_Noise_Canceling_Earbuds.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 55.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "LinkBuds Truly Wireless Earbuds",
      imageURL: "/images/LinkBuds_Truly_Wireless_Earbuds.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 124.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "MDR-EX15LP Wired In-ear Headphones",
      imageURL: "/images/MDR_EX15LP_Wired_In_ear_Headphones.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 343.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "MDR-Z7M2 Premium Hi-Res Headphones",
      imageURL: "/images/MDR_Z7M2_Pr_Hi_Res_Headphones.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 100.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "momentum true wireless",
      imageURL: "/images/momentum_true_wireless.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 220.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "Push Active True Wirelss Earbuds",
      imageURL: "/images/Push_Active_True_Wirelss_Earbuds.jpeg",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 340.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "Tribit FlyBuds 3",
      imageURL: "/images/Tribit_FlyBuds_3.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 200.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
    }),
    Product.create({
      name: "WF-1000XM4 Industry Leading Noise Canceling Truly Wireless Earbuds",
      imageURL:
        "/images/WF_1000XM4_Industry_Leading_Noise_Canceling_ Truly_Wireless_Earbuds.png",
      longDescription:
        "Bose Sport Earbuds are designed from the ground up to energize your exercise with acclaimed lifelike sound and a comfortable, secure fit.",
      price: 830.0,
      category: "in-ear",
      noiseCancelling: false,
      numReviews: 233,
      ratings: 4.5,
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
    Order.create({ isOpen: true, orderStatus: "In-Cart", userId: 2 }),
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

  const shipping = await Promise.all([
    Shipping.create({
      address: "3975 Hart Ridge Road",
      city: "Saginaw",
      state: "MI",
      country: "USA",
      zipcode: "48607",
      userId: 1,
    }),
    Shipping.create({
      address: "2262 John Avenue",
      city: "East Lansing",
      state: "MI",
      country: "USA",
      zipcode: "48823",
      userId: 2,
    }),
    Shipping.create({
      address: "4249 Ashmor Drive",
      city: "Cohasset",
      state: "MN",
      country: "USA",
      zipcode: "55721",
      userId: 3,
    }),
    Shipping.create({
      address: "528 Strother Street",
      city: "Millport",
      state: "AL",
      country: "USA",
      zipcode: "35576",
      userId: 4,
    }),
    Shipping.create({
      address: "2757 Kincheloe Road",
      city: "Portland",
      state: "OR",
      country: "USA",
      zipcode: "97204",
      userId: 5,
    }),
    Shipping.create({
      address: "2130 Locust Court",
      city: "Santa Fe Springs",
      state: "CA",
      country: "USA",
      zipcode: "90670",
      userId: 6,
    }),
    Shipping.create({
      address: "2282 Holt Street",
      city: "Miramar",
      state: "FL",
      country: "USA",
      zipcode: "33025",
      userId: 999,
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
