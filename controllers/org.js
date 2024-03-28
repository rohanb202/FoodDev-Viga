const pool = require("../db.js");

async function getOrganizations(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM Organization");

    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function postAnOrganization(req, res) {
  try {
    const { name } = req.body;

    const newOrganization = await pool.query(
      "INSERT INTO Organization (name) VALUES ($1) RETURNING *",
      [name]
    );

    res.status(201).json(newOrganization.rows[0]);
  } catch (error) {
    console.error("Error inserting organization:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteOrganization(req, res) {
  try {
    const organizationId = req.params.id;

    await pool.query("DELETE FROM Organization WHERE id = $1", [
      organizationId,
    ]);

    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    console.error("Error deleting organization:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getOrganizationById(req, res) {
  try {
    const orgId = req.params.id;
    const query = "SELECT * FROM Organization WHERE id = $1";
    const { rows } = await pool.query(query, [orgId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Organization not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error getting organization by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  getOrganizations,
  postAnOrganization,
  deleteOrganization,
  getOrganizationById,
};
