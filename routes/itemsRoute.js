const express = require("express");
const router = express.Router();
// const  = require("../controllers/items.js");
const { postAnItem, getAllItems } = require("../controllers/items.js");

router.get("/", getAllItems);
router.post("/", postAnItem);

module.exports = router;
