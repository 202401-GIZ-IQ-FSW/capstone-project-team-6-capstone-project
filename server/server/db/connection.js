const mongoose = require("mongoose");
const User = require('../models/user');

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
    console.log("Database connected: ", url);
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
      role: 'superAdmin'
    });
    await admin.save();
    console.log('Admin root user created');
  } else {
    console.log('Admin root user already exists');
  }

};

module.exports = connectToMongo;
