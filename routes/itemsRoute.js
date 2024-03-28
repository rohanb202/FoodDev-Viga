const express = require("express");
const router = express.Router();
// const  = require("../controllers/items.js");
const {
  postAnItem,
  getAllItems,
  deleteItem,
  getItemById,
} = require("../controllers/items.js");

router.get("/", getAllItems);
router.post("/", postAnItem);
router.delete("/:id", deleteItem);
router.get("/:id", getItemById);

module.exports = router;
