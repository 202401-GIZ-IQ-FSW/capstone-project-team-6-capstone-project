const mongoose = require("mongoose");
const User = require('../models/user');
const Allow = require('../models/allow');

const { DB_ATLAS_URL_TEST, MONGODB_USER, MONGODB_PASSWORD, DB_HOST, DB_PORT, MONGODB_DATABASE, TEST_DB_HOST, ADMIN_EMAIL, ADMIN_PASS, ADMIN_USERNAME } =
  process.env;

// const DB_URI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${
//   process.env.NODE_ENV === "test" ? TEST_DB_HOST : DB_HOST
// }:${DB_PORT}/${MONGODB_DATABASE}?authSource=admin`;

const url = DB_ATLAS_URL_TEST;

const connectToMongo = async () => {
  mongoose.connect(url, { useNewUrlParser: true });

  db = mongoose.connection;

  db.once("open", () => {
    console.log("Database connected: ", url.slice(0, 19));
  });

  db.on("error", (err) => {
    console.error("Database connection error: ", err);
    
  });

  // Create the root admin and add it to the database for initial start
  const adminExists = await User.exists({ email: ADMIN_EMAIL});
  // If admin root doesn't exist, we create it
  if (!adminExists) {
    // const hashedPassword = await bcrypt.hash(ADMIN_PASS, 10); // Hash the password
    const admin = new User({
      name: 'Super Admin',
      username: ADMIN_USERNAME,
      email: ADMIN_EMAIL,
      password: ADMIN_PASS,
      role: 'superAdmin',
      status: 'Active'
    });
    await admin.save();
    console.log('Admin root user created');
  } else {
    console.log('Admin root user already exists');
  }

  // Create the allow all and add it to the database for initial start to allow all users to access the site 
  // if it exists we don't create again
  const allowAllExists = await Allow.exists({ name: "main"});
  // If it doesn't exist, we create it
  if (!allowAllExists) {
    const allowAllModel = new Allow({
      name: "main",
      allowAll: "Yes",
    });
    await allowAllModel.save();
    console.log('Allow All Model created');
  } else {
    console.log('Allow All Model already exists');
  }

};

module.exports = connectToMongo;
