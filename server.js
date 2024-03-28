const express = require("express");
const pool = require("./db");
const bodyParser = require("body-parser");
const port = 3001;
const itemsRouter = require("./routes/itemsRoute");
const orgRouter = require("./routes/orgRoute");
const pricingRoute = require("./routes/pricingRoute");
require("dotenv").config();
const app = express();

app.use(bodyParser.json());

app.use("/items", itemsRouter);
app.use("/organizations", orgRouter);
app.use("/pricing", pricingRoute);

app.post("/calculatePrice", async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_id } = req.body;

    const query = `
          SELECT base_price_in_cents, km_price_in_cents , base_distance_in_km
          FROM Pricing 
          WHERE organization_id = $1 AND zone = $2 AND item_id = $3;
        `;
    const { rows } = await pool.query(query, [organization_id, zone, item_id]);

    if (rows.length === 0) {
      return res.status(404).json({
        error:
          "Pricing details not found for the specified organization, item, and zone",
      });
    }

    const { base_price_in_cents, km_price_in_cents, base_distance_in_km } =
      rows[0];

    const basePrice = base_price_in_cents / 100;
    const kmPrice = km_price_in_cents / 100;
    const totalPrice =
      basePrice + Math.max(total_distance - base_distance_in_km, 0) * kmPrice;

    res.json({ total_price: totalPrice });
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log("listening on port", port);
});
