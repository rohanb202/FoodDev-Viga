const pool = require("../db.js");
async function getPricings(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM Pricing");

    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function postPricing(req, res) {
  try {
    const {
      organization_id,
      item_id,
      zone,
      base_distance_in_km,
      base_price_in_cents,
      km_price_in_cents,
    } = req.body;

    const newPricing = await pool.query(
      "INSERT INTO pricing (organization_id, item_id, zone, base_distance_in_km, base_price_in_cents, km_price_in_cents) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        organization_id,
        item_id,
        zone,
        base_distance_in_km,
        base_price_in_cents,
        km_price_in_cents,
      ]
    );

    res.status(201).json(newPricing.rows[0]);
  } catch (error) {
    console.error("Error inserting pricing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deletePricing(req, res) {
  try {
    const pricingId = req.params.id;
    console.log(pricingId);
    await pool.query("DELETE FROM pricing WHERE id = $1", [pricingId]);

    res.status(200).json({ message: "Pricing deleted successfully" });
  } catch (error) {
    console.error("Error deleting pricing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getPricingByOrgIdAndItemId(req, res) {
  try {
    const { orgId, itemId } = req.params;
    const query =
      "SELECT * FROM pricing WHERE organization_id = $1 AND item_id = $2";
    const { rows } = await pool.query(query, [orgId, itemId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Pricing details not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error(
      "Error getting pricing by organization ID and item ID:",
      error
    );
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  getPricings,
  postPricing,
  deletePricing,
  getPricingByOrgIdAndItemId,
};
