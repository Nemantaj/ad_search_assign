const path = require("path");
const parser = require("body-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const adsRoute = require("./route/ad");
const Company = require("./model/Company");
const Ad = require("./model/Ad");

const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const MONGODB_URI = "mongodb://localhost:27017/fortests";

const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(cors(corsOptions));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use(adsRoute);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode;
  res.status(status).json({
    title: error.title,
    msg: error.message,
  });
});

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then((result) => {
    app.listen(PORT);
    console.log("Listening on port " + PORT);
  })
  .catch((err) => {
    console.log(err);
  });
