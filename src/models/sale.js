"use strict";
/* -------------------------------------------------------
    SALE MODEL
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const saleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
  { collection: "sales", timestamps: true }
);

/* ------------------------------------------------------- */
// pre('init') -> Not middleware - Manipulate the res data
saleSchema.pre("init", function (document) {
  document.apiOwner = "Mustafa Ihsan Kabakcili";
  document.__v = undefined;
});
/* ------------------------------------------------------- */
module.exports = mongoose.model("Sale", saleSchema);
