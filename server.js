require("dotenv").config(); // Load environment variables for local

const express = require("express");
const mongoose = require("mongoose");
const postRoute = require("./routes/postRoute.js");
const userRoute = require("./routes/userRoute.js");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Define PORT variable
const dbURL = process.env.DB_URL;

// Middleware for parsing request body
app.use(express.json());
// Local
// const corsOptions = {
//   origin: process.env.URL_PROD || process.env.URL_LOCAL,
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
// app.use(cors(corsOptions));

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

module.exports = allowCors(handler);

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
