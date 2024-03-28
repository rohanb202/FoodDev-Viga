const pool = require("../db.js");

async function getAllItems(req, res) {
  try {
    const { rows } = await pool.query("SELECT * FROM Item");

    res.json(rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function postAnItem(req, res) {
  try {
    const { type, description } = req.body;

    const newItem = await pool.query(
      "INSERT INTO Item (type, description) VALUES ($1, $2) RETURNING *",
      [type, description]
    );

    res.status(201).json(newItem.rows[0]);
  } catch (error) {
    console.error("Error inserting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function deleteItem(req, res) {
  try {
    const itemId = req.params.id;
    console.log(req.params);
    console.log(itemId);
    await pool.query("DELETE FROM item WHERE id = $1", [itemId]);

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
async function getItemById(req, res) {
  try {
    const itemId = req.params.id;
    const query = "SELECT * FROM item WHERE id = $1";
    const { rows } = await pool.query(query, [itemId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Item not found" });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error("Error getting item by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
module.exports = {
  getAllItems,
  postAnItem,
  deleteItem,
  getItemById,
};
