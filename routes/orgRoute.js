const express = require("express");
const router = express.Router();
const {
  getOrganizations,
  postAnOrganization,
  deleteOrganization,
  getOrganizationById,
} = require("../controllers/org");

router.get("/", getOrganizations);
router.post("/", postAnOrganization);
router.delete("/:id", deleteOrganization);
router.get("/:id", getOrganizationById);
module.exports = router;
