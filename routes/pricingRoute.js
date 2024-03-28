const express = require("express");
const router = express.Router();

const {
  getPricings,
  postPricing,
  deletePricing,
  getPricingByOrgIdAndItemId,
} = require("../controllers/price");

router.get("/", getPricings);
router.post("/", postPricing);
router.delete("/:id", deletePricing);
router.get("/:orgId/:itemId", getPricingByOrgIdAndItemId);

module.exports = router;
