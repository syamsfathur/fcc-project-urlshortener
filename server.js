require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const url_model = require("./model/url.model");
const url_test_m = require("./model/url.model").URL_Model;
const { json } = require("body-parser");

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/check", async (req, res) => {
  console.log("state_status " + url_model.state_status());
  let res_test2 = await url_test_m.findOne(
    { short_url: "test123" },
    (err, result) => {
      if (err) return console.log(err);
      return result;
    }
  );

  let res_test3 = (param, done) => {
    url_test_m.findOne({ short_url: param }, (err, result) => {
      if (err) return done(err, null);
      return done(null, result);
    });
  };

  let test = url_model.findTest("test123", (err, result) => {
    if (err) return console.log(err);
    return result;
  });
  console.log(test);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
