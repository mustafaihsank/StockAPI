"use strict";
/* -------------------------------------------------------
    TOKEN MODEL
------------------------------------------------------- */
const mongoose = require("mongoose"); // Erase if already required
/* ------------------------------------------------------- */
const TokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    token: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
  },
  { collection: "tokens", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Token", TokenSchema);
