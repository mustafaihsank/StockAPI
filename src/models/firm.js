"use strict";
/* -------------------------------------------------------
    FIRM MODEL
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */

const firmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    phone: String,
    address: String,
    image: String,
  },
  { collection: "firms", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Firm", firmSchema);
