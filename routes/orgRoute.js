const express = require("express");
const router = express.Router();
const { getOrganizations, postAnOrganization } = require("../controllers/org");

router.get("/", getOrganizations);
router.post("/", postAnOrganization);

module.exports = router;
