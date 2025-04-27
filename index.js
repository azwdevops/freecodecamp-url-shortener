require("dotenv").config();
const express = require("express");
const dns = require("dns");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const { shortenUrl, getOriginalUrl } = require("./controllers/urlController");

// Basic Configuration
const port = process.env.PORT || 3000;

// MongoDB Configuration
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("MongoDB connection error: ", err));

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// The POST endpoint to create a short URL
app.post("/api/shorturl", shortenUrl);

// GET endpoint to redirect to the original URL
app.get("/api/shorturl/:short_url", getOriginalUrl);

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
