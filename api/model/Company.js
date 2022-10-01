const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  details: { type: mongoose.Types.ObjectId, ref: "Ad" },
});

module.exports = mongoose.model("Company", companySchema);
