const pool = require("../db.js");

async function getOrganizations(req, res) {
  try {
    // Query the database to fetch data from the Organization table
    const { rows } = await pool.query("SELECT * FROM Organization");

    // Send the fetched data as a JSON response
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function postAnOrganization(req, res) {
  try {
    const { name } = req.body;

    // Insert the new organization into the database
    const newOrganization = await pool.query(
      "INSERT INTO Organization (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(newOrganization.rows[0]); // Respond with the newly inserted organization
  } catch (error) {
    console.error("Error inserting organization:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  getOrganizations,
  postAnOrganization,
};
