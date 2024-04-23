"use strict";
/* -------------------------------------------------------
    PURCHASE MODEL
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const purchaseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    firmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
      required: true,
    },
    brandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    priceTotal: {
      type: Number,
      set: function () {
        // On create, if you don't send value it doesn't work
        return this.price * this.quantity;
      },
      default: function () {
        // On create, if you send value it doesn't work
        return this.price * this.quantity;
      },
      transform: function () {
        // On update
        return this.price * this.quantity;
      },
    },
  },
  { collection: "purchases", timestamps: true }
);

/* ------------------------------------------------------- */
module.exports = mongoose.model("Purchase", purchaseSchema);
