"use strict";
/* -------------------------------------------------------
    CATEGORY MODEL
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      set: (name) => name.toUpperCase(),
    },
  },
  { collection: "categories", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Category", categorySchema);
