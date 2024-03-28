const express = require("express");
const router = express.Router();

const { getPricings, postPricing } = require("../controllers/price");

router.get("/", getPricings);
router.post("/", postPricing);

module.exports = router;
