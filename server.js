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
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Delivery Pricing API</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f4f4f4;
    }
    .container {
      text-align: center;
    }
    h1 {
      margin-bottom: 20px;
    }
    p {
      font-size: 18px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to the Delivery Pricing API</h1>
    <p>This API provides endpoints to manage and calculate delivery prices for different types of food items across various zones. Please refer to the API documentation for more information.</p>
    <p>API Documentation: <a target="_blank" href="https://github.com/rohanb202/FoodDev-Viga">/api-docs</a></p>
  </div>
</body>
</html>
`;

// Sending the HTML content as response
const apiV1Router = express.Router();
app.get("/", (req, res) => {
  res.send(htmlContent);
});
app.use("/api", apiV1Router);
apiV1Router.use("/items", itemsRouter);
apiV1Router.use("/organizations", orgRouter);
apiV1Router.use("/pricing", pricingRoute);

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
