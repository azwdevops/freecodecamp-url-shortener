const mongoose = require("mongoose");

// MongoDB Schema and Model
const urlSchema = new mongoose.Schema({
  original_url: { type: String, required: true },
  short_url: { type: Number, required: true },
});

const UrlModel = mongoose.model("UrlModel", urlSchema);

// export to enable usage in other files
module.exports = UrlModel;
