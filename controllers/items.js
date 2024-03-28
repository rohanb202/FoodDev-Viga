const pool = require("../db.js");

async function getAllItems(req, res) {
  try {
    // Query the database to fetch data from the Organization table
    const { rows } = await pool.query("SELECT * FROM Item");

    // Send the fetched data as a JSON response
    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function postAnItem(req, res) {
  try {
    const { type, description } = req.body;

    // Insert the new item into the database
    const newItem = await pool.query(
      "INSERT INTO Item (type, description) VALUES ($1, $2) RETURNING *",
      [type, description]
    );

    res.status(201).json(newItem.rows[0]); // Respond with the newly inserted item
  } catch (error) {
    console.error("Error inserting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getAllItems,
  postAnItem,
};
