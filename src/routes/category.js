"use strict";
/* -------------------------------------------------------
    CATEGORY ROUTER
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/category:
const category = require("../controllers/category");
const permissions = require("../middlewares/permissions");
// URL: /category

router
  .route("/")
  .get(permissions.isStaff, category.list)
  .post(permissions.isAdmin, category.create);

router
  .route("/:id")
  .get(permissions.isStaff, category.read)
  .put(permissions.isAdmin, category.update)
  .patch(permissions.isAdmin, category.update)
  .delete(permissions.isAdmin, category.update);
/* ------------------------------------------------------- */
module.exports = router;
