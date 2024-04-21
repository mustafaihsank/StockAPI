"use strict";
/* -------------------------------------------------------
    USER MODEL
------------------------------------------------------- */
const mongoose = require("mongoose"); // Erase if already required
const passwordEncrypt = require("../helpers/passwordEncrypt");
/* ------------------------------------------------------- */
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
    isStaff: {
      type: Boolean,
      default: false,
    },
  },
  { collection: "users", timestamps: true }
);

/* ------------------------------------------------------- */

// "save" olayı "updateOne" için çalışmaz.
userSchema.pre(["save", "updateOne"], function (next) {
  // console.log('pre(save) run.')
  // console.log(this)

  // get data from "this" or "this._update"
  const data = this?._update || this;

  // email@domain.com
  const isEmailValidated = data.email
    ? /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    : true;

  if (isEmailValidated) {
    console.log("Email OK");

    if (data?.password) {
      const isPasswordValidated =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
          data.password
        );

      if (isPasswordValidated) {
        console.log("Password OK");

        // save:
        this.password = data.password = passwordEncrypt(data.password);
        // update:
        this._update = data;
      } else {
        next(new Error("Password is not validated."));
      }
    }
    next();
  } else {
    next(new Error("Email is not validated."));
  }
});

/* ------------------------------------------------------- */
module.exports = mongoose.model("User", userSchema);
