const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adsSchema = new Schema({
  companyId: { type: mongoose.Types.ObjectId, required: true, ref: "Company" },
  headline: { type: String, required: true },
  desc: { type: String, required: true },
  slogan: { type: String, required: true },
  image: { type: String, reuired: true },
  CTA: { type: String, required: true },
  companyName: { type: String, required: true },
});

module.exports = mongoose.model("Ad", adsSchema);
