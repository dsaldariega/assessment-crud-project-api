require("dotenv").config(); // Load environment variables for local

const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./routes/postRoute.js");
const userRoute = require("./routes/userRoute.js");

//
const app = express();
const PORT = process.env.PORT || 5000; // Define PORT variable
const dbURL = process.env.DB_URL;

// Middleware for parsing request body
app.use(express.json());

app.use("/posts", postRoute);
app.use("/user/auth", userRoute);

// Connect to MongoDB
mongoose
  .connect(dbURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Export the Express app
module.exports = app;
