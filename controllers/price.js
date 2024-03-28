const pool = require("../db.js");
async function getPricings(req, res) {
  try {
    // Query the database to fetch data from the Organization table
    const { rows } = await pool.query("SELECT * FROM Pricing");

    // Send the fetched data as a JSON response
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

    // Insert the new pricing into the database
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

    res.status(201).json(newPricing.rows[0]); // Respond with the newly inserted pricing
  } catch (error) {
    console.error("Error inserting pricing:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getPricings,
  postPricing,
};
